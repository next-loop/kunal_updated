
import { Search, GraduationCap, Award } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse Courses",
    description: "Explore our diverse range of courses designed by industry experts.",
    icon: Search,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    title: "Register & Start Learning",
    description: "Complete a simple registration process and start your learning journey.",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: 3,
    title: "Get Certified",
    description: "Complete the course and receive a recognized certification.",
    icon: Award,
    color: "bg-green-100 text-green-600"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting started with NexLoop is easy. Follow these simple steps to begin your learning journey.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div key={step.id} className="flex-1 relative">
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <span className="bg-nexloop-primary text-white text-sm font-bold h-6 w-6 rounded-full flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {step.id}
                </span>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {step.id < steps.length && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -z-10 transform -translate-x-1/2">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="h-3 w-3 rounded-full bg-nexloop-primary"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
