import {ThemeToggle} from '@/components/ThemeToggle';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/pages/homepage/HeroSection';
import { Footer } from '@/components/Footer';
import { About } from '@/pages/homepage//AboutSection';

export const Homepage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <main>
        <HeroSection />
        <About />
      </main>
      <Footer />
    </div>
  );
};