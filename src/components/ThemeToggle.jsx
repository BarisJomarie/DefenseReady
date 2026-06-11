import { Moon, Sun } from 'lucide-react';
import {useState, useEffect} from 'react';
import { cn } from '@/lib/utils';

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  //Checker if user is in Dark/Light Mode
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  //Toggle Theme
  const ToggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  }

  return (
    <button 
      onClick={ToggleTheme}
      className={cn(
        "py-2 p-2 rounded-full transition-colors duration-300",
        "focus:outline-none"
      )}>
      {
        isDarkMode ? 
          <Sun className='h-6 w-6 text-yellow-300'/> 
          : 
          <Moon className='h-6 w-6 text-blue-900'/>
      }
    </button>
  ); 
};