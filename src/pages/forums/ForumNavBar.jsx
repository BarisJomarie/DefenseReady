import {cn} from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import {useState, useEffect} from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
  { label: 'Home', href: `${import.meta.env.BASE_URL}` }
];


export const ForumNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <nav className={cn(
          'sticky top-0 w-full z-50 transition-all duration-300 py-1 mb-1 bg-background/80 border border-t-border'
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