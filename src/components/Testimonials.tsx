
import { Star, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    course: "Web Development Bootcamp",
    image: "https://i.pravatar.cc/150?img=1",
    quote: "NexLoop changed how I learn. The content is top-notch and the mentors are incredibly helpful!",
    rating: 5,
    institution: "University of Michigan"
  },
  {
    id: 2,
    name: "Michael Chen",
    course: "Data Science with Python",
    image: "https://i.pravatar.cc/150?img=8",
    quote: "The practical projects helped me build a solid portfolio. I landed a job at a tech company right after completing the course!",
    rating: 5,
    institution: "Boston University"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    course: "UI/UX Design Basics",
    image: "https://i.pravatar.cc/150?img=5",
    quote: "The instructors break down complex concepts into easy-to-understand modules. Highly recommended!",
    rating: 4,
    institution: "California Institute of Arts"
  },
  {
    id: 4,
    name: "David Park",
    course: "AI for Beginners",
    image: "https://i.pravatar.cc/150?img=12",
    quote: "Amazing platform for anyone looking to transition into tech. The community support is incredible.",
    rating: 5,
    institution: "Georgia Tech"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Testimonials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear what our students have to say about their learning experience with NexLoop.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="testimonial-card card-hover">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-2">
                    <div className="relative">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-nexloop-primary text-white rounded-full p-0.5">
                        <MessageSquare className="h-3 w-3" />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">{testimonial.institution}</p>
                      <p className="text-sm text-nexloop-primary font-medium mt-1">{testimonial.course}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
