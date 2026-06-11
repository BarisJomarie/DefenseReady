import { ArrowDown, ArrowUp } from "lucide-react";
import logo from '@/assets/logo2.svg';
import heroBg from '@/assets/hero-bg.png';

export const HeroSection = () => {
  return (
    <section 
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: `url(${heroBg})`}}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-0"></div>
        <div className="container max-w-4xl mx-auto text-center z-10">
          <div className="space-y-4">
            <div className="mx-auto flex justify-center mb-4 w-1/2 h-1/2 lg:w-full lg:h-full">
              <img src={logo} alt="Defense Ready Logo" className="object-cover opacity-0 animate-fade-in"/>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="opacity-0 animate-fade-in-delay-1">Defense</span>
              <span className="text-primary opacity-0 animate-fade-in-delay-2">Ready</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              <span className="opacity-0 animate-fade-in-delay-3">A Capstone Preparation Guide</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl my-10 mx-auto opacity-0 animate-fade-in-delay-4">
              A practical guide towards your successful capstone defense.
            </p>

            <div className="pt-4 opacity-0 animate-fade-in-delay-5">
              <button className="main-button">
                Read the E-Book
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <ArrowDown className="h-5 w-5 text-primary" />
        </div>
    </section>
  )
};