
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-white to-nexloop-light/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nexloop-dark">
              Empower Your Future with Nexloop Learning
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              Enroll in career-building courses designed by experts. Start your learning journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="gradient-button text-lg"
                size="lg"
                onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Register for a Course
              </Button>
              <Button 
                variant="outline" 
                className="border-nexloop-primary text-nexloop-primary hover:bg-nexloop-light text-lg"
                size="lg"
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Courses
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -z-10 w-3/4 h-3/4 bg-nexloop-primary/10 rounded-full blur-3xl"></div>
            <div className="rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Students learning" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute bottom-6 -left-8 bg-white rounded-xl p-4 shadow-lg animate-slide-up">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-nexloop-secondary/20 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-nexloop-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Join 10,000+ students</p>
                  <p className="text-xs text-gray-500">Learning with Nexloop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
