import { useState, useEffect } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS } from "@/config/api";

interface Testimonial {
  id: number;
  user_name: string;
  course_title: string;
  star_rating: number;
  message: string;
  image: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.testimonials || "create-payment/testimonials");
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data: Testimonial[] = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        toast({
          title: "Error",
          description: "Failed to load testimonials. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [toast]);

  if (loading) {
    return (
      <section id="testimonials" className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear what our students have to say about their learning experience with Nexloop.
            </p>
          </div>
          <div className="text-center">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear what our students have to say about their learning experience with Nexloop.
            </p>
          </div>
          <div className="text-center">No testimonials available at the moment.</div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Testimonials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear what our students have to say about their learning experience with Nexloop.
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
                        alt={testimonial.user_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-nexloop-primary text-white rounded-full p-0.5">
                        <MessageSquare className="h-3 w-3" />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.user_name}</h4>
                      <p className="text-sm text-nexloop-primary font-medium mt-1">{testimonial.course_title}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: testimonial.star_rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {Array.from({ length: 5 - testimonial.star_rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <p className="text-gray-600 italic">"{testimonial.message}"</p>
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