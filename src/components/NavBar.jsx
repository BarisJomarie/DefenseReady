import {cn} from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import {useState, useEffect} from 'react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' }
];


export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={cn(
          'fixed w-full z-50 transition-all duration-300', 
          isScrolled ? 'py-3 bg-background/80 backdrop-blur-md shadow-xs' : 'py-5 bg-transparent'
        )}>
        <div className='container flex items-center justify-between'>
          <a className='text-xl font-bold text-primary flex items-center'>
            <span className='relative z-10'>
              <span className='text-glow text-foreground'>Defense</span>Ready
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 flex-row items-center">
            {navItems.map((item, key) => (
              <a 
                key={key}
                href={item.href}
                className='text-foreground/80 hover:text-primary transition-colors duration-300'
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className='md:hidden p-2 text-foreground z-50'
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Drawer Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}>
        <div className="flex flex-col space-y-8 text-xl items-center">
          <ThemeToggle />
          {navItems.map((item, key) => (
            <a 
              key={key}
              href={item.href}
              className='text-foreground/80 hover:text-primary transition-colors duration-300'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}