import { useState, useEffect } from 'react';
import { User, Mail, Phone, GraduationCap, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '@/config/api';

interface Course {
  id: number;
  title: string;
  price: string;
}

interface EnrollmentData {
  full_name: string;
  email: string;
  phone_number: string;
  referred_by: string;
  course: number;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  course: string;
}

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [referrer, setReferrer] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [fetchingCourses, setFetchingCourses] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    course: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setFetchingCourses(true);
      try {
        const response = await fetch(API_ENDPOINTS.courses);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast({
          title: "Error",
          description: "Failed to load courses. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setFetchingCourses(false);
      }
    };

    fetchCourses();
  }, [toast]);

  // Validation functions
  const validateName = (value: string): string => {
    if (!value.trim()) return 'Name is required';
    if (value.trim().length < 3) return 'Name must be at least 3 characters';
    if (!/^[a-zA-Z\s]*$/.test(value)) return 'Name should only contain letters and spaces';
    return '';
  };

  const validateEmail = (value: string): string => {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (value: string): string => {
    if (!value.trim()) return 'Phone number is required';
    if (!/^[0-9]{10}$/.test(value)) return 'Please enter a valid 10-digit phone number';
    return '';
  };

  const validateCourse = (value: string): string => {
    if (!value) return 'Please select a course';
    return '';
  };

  // Handle input changes with validation
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setErrors(prev => ({ ...prev, name: validateName(value) }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10); // Only allow numbers, max 10 digits
    setPhone(value);
    setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCourse(value);
    setErrors(prev => ({ ...prev, course: validateCourse(value) }));
  };

  // Validate all fields before submission
  const validateForm = (): boolean => {
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      course: validateCourse(selectedCourse)
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check all fields and try again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const selectedCourseId = courses.find(c => c.title === selectedCourse)?.id;

    if (!selectedCourseId) {
      toast({
        title: "Error",
        description: "Please select a valid course",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const enrollmentData: EnrollmentData = {
      full_name: name,
      email: email,
      phone_number: phone,
      referred_by: referrer,
      course: selectedCourseId
    };

    try {
      const response = await fetch(API_ENDPOINTS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle different types of errors
        if (response.status === 400) {
          if (data.error === "Invalid referral code. Please check and try again.") {
            toast({
              title: "Invalid Referral Code",
              description: data.error,
              variant: "destructive",
            });
          } else if (data.error === "Validation error" && data.details) {
            // Handle validation errors
            const errorMessage = typeof data.details === 'string' 
              ? data.details 
              : Object.values(data.details).flat().join(', ');
            toast({
              title: "Validation Error",
              description: errorMessage,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Error",
              description: data.error || "Failed to register. Please check your details.",
              variant: "destructive",
            });
          }
        } else if (response.status === 404) {
          toast({
            title: "Course Not Found",
            description: "The selected course is no longer available.",
            variant: "destructive",
          });
        } else {
          throw new Error(data.error || 'Failed to register');
        }
        return;
      }

      // Store registration data and token in sessionStorage
      sessionStorage.setItem('registration', JSON.stringify({
        ...enrollmentData,
        courseTitle: selectedCourse,
        registrationToken: data.registration_token,
        originalAmount: data.original_amount,
        discountedAmount: data.discounted_amount
      }));

      toast({
        title: "Success",
        description: "Registration successful! Proceeding to payment.",
      });
      
      // Navigate to payment page
      navigate('/payment');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Find the current selected course price
  const selectedCoursePrice = selectedCourse ? courses.find(c => c.title === selectedCourse)?.price : '';

  return (
    <section id="registration" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Register for a Course</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your preferred course and complete your registration in minutes. Join thousands of students already learning with NexLoop.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="md:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Course Registration</CardTitle>
                <CardDescription>Fill in your details to start your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <label htmlFor="name" className="text-sm font-medium mb-1 block">
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3.5 text-gray-400">
                          <User className="h-5 w-5" />
                        </span>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={handleNameChange}
                          onBlur={handleNameChange}
                          className={`form-input-nexloop pl-10 ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="relative">
                      <label htmlFor="email" className="text-sm font-medium mb-1 block">
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3.5 text-gray-400">
                          <Mail className="h-5 w-5" />
                        </span>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          onBlur={handleEmailChange}
                          className={`form-input-nexloop pl-10 ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div className="relative">
                      <label htmlFor="phone" className="text-sm font-medium mb-1 block">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3.5 text-gray-400">
                          <Phone className="h-5 w-5" />
                        </span>
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={handlePhoneChange}
                          onBlur={handlePhoneChange}
                          className={`form-input-nexloop pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div className="relative">
                      <label htmlFor="referrer" className="text-sm font-medium mb-1 block">
                        Referred By
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3.5 text-gray-400">
                          <UserPlus className="h-5 w-5" />
                        </span>
                        <input
                          id="referrer"
                          type="text"
                          value={referrer}
                          onChange={(e) => setReferrer(e.target.value.toUpperCase())}
                          className="form-input-nexloop pl-10 uppercase"
                          style={{ textTransform: 'uppercase' }}
                          placeholder="Who referred you? (optional)"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="course" className="text-sm font-medium mb-1 flex justify-between">
                        <span>Select Course</span>
                        {selectedCoursePrice && (
                          <span className="font-bold text-nexloop-primary">{selectedCoursePrice}</span>
                        )}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3.5 text-gray-400">
                          <GraduationCap className="h-5 w-5" />
                        </span>
                        <select
                          id="course"
                          value={selectedCourse}
                          onChange={handleCourseChange}
                          onBlur={handleCourseChange}
                          className={`form-input-nexloop pl-10 appearance-none ${errors.course ? 'border-red-500' : ''}`}
                          required
                          disabled={fetchingCourses}
                        >
                          <option value="" disabled>
                            {fetchingCourses ? "Loading courses..." : "Select a course"}
                          </option>
                          {courses.map((c) => (
                            <option key={c.id} value={c.title}>
                              {c.title} - {c.price}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.course && (
                        <p className="text-red-500 text-sm mt-1">{errors.course}</p>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="gradient-button w-full text-lg"
                    size="lg"
                    disabled={loading || fetchingCourses}
                  >
                    {loading ? "Processing..." : "Proceed to Payment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="hidden md:block">
            <div className="bg-nexloop-light rounded-xl p-6 h-full">
              <h3 className="text-xl font-semibold mb-6 text-nexloop-dark">Benefits of Joining</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-nexloop-primary/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-nexloop-primary text-sm">✓</span>
                  </div>
                  <span>Expert-led curriculum with hands-on projects</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-nexloop-primary/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-nexloop-primary text-sm">✓</span>
                  </div>
                  <span>Flexible learning schedule that fits your life</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-nexloop-primary/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-nexloop-primary text-sm">✓</span>
                  </div>
                  <span>One-on-one mentoring from industry professionals</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-nexloop-primary/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-nexloop-primary text-sm">✓</span>
                  </div>
                  <span>Industry-recognized certification upon completion</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-nexloop-primary/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-nexloop-primary text-sm">✓</span>
                  </div>
                  <span>Job placement assistance for top performers</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-nexloop-primary/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-nexloop-primary text-sm">✓</span>
                  </div>
                  <span>Access to exclusive learning resources</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
