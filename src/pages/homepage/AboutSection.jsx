import {cn} from '@/lib/utils';
import { Book, Briefcase, CircleQuestionMarkIcon, Code, User, Video } from 'lucide-react';

export const About = () => {
  return (
    <section 
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About Defense<span className="text-primary">Ready</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Help You Defend</h3>
            <p className="text-muted-foreground">
              DefenseReady is designed to bridge the gap between complex theoretical concepts and real-world 
              execution. We provide a streamlined, interactive learning hub that empowers you to 
              proactively build your skill set, anticipate modern technical challenges, and stay firmly ahead of 
              an ever-evolving landscape.
            </p>
            <p className="text-muted-foreground">
              Through curated technical guides, hands-on progress tracking, and actionable insights, our 
              mission is to turn static knowledge into operational muscle memory. Whether you are validating 
              your current foundations or mastering advanced architectural frameworks, we give you the tools 
              to stay sharp, stay resilient, and ensure you are always prepared.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Book className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Guides</h4>
                  <p className="text-muted-foreground">
                    This E-Book provides guides for your needs
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Video className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Videos</h4>
                  <p className="text-muted-foreground">
                    This E-Book recommends videos you can watch to learn more on defending.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <CircleQuestionMarkIcon className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Questions</h4>
                  <p className="text-muted-foreground">
                    Provides question examples to give you idea on your possible asked question.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}