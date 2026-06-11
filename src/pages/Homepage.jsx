import {ThemeToggle} from '@/components/ThemeToggle';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';

export const Homepage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};