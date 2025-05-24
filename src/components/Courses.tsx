import { Clock, Users, Award, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from '@/config/api';

interface Course {
  id: number;
  title: string;
  level_tag: string;
  description: string;
  duration: string;
  purchase_count: number;
  price: number;
  image: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.courses);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          Loading courses...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center text-red-500">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section id="courses" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after courses designed to help you advance your career and achieve your learning goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden border-0 shadow-lg card-hover">
              <div className="h-48 overflow-hidden">
                <img 
                  src={course.image}
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader className="p-4">
                <div className="mb-2 flex justify-between items-center">
                  <span className="inline-block bg-nexloop-primary/10 text-nexloop-primary text-xs font-medium px-2.5 py-1 rounded">
                    {course.level_tag}
                  </span>
                  <span className="font-bold text-nexloop-primary">₹{course.price}</span>
                </div>
                <h3 className="text-xl font-bold">{course.title}</h3>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-nexloop-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-nexloop-primary" />
                    <span>{course.purchase_count}+ students</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-nexloop-primary hover:bg-nexloop-primary/90"
                  onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="border-nexloop-primary text-nexloop-primary hover:bg-nexloop-light"
            size="lg"
          >
            View All Courses <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
