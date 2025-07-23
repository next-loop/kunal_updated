import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';

const courseSyllabus = {
  "Web Development Bootcamp": [
    { week: "Week 1-2", title: "HTML & CSS Fundamentals", topics: ["HTML5 structure", "CSS layouts", "Responsive design", "CSS frameworks"] },
    { week: "Week 3-4", title: "JavaScript Essentials", topics: ["JavaScript syntax", "DOM manipulation", "Events handling", "Async programming"] },
    { week: "Week 5-6", title: "Frontend Frameworks", topics: ["React fundamentals", "State management", "Component lifecycle", "Hooks"] },
    { week: "Week 7-8", title: "Backend Development", topics: ["Node.js", "Express", "RESTful APIs", "Database integration"] },
    { week: "Week 9-10", title: "Full Stack Integration", topics: ["Authentication", "Deployment", "Performance", "Final project"] }
  ],
  "Data Science with Python": [
    { week: "Week 1-2", title: "Python Foundations", topics: ["Python syntax", "Data structures", "Functions", "Libraries"] },
    { week: "Week 3-4", title: "Data Analysis", topics: ["NumPy", "Pandas", "Data visualization", "Statistical analysis"] },
    { week: "Week 5-6", title: "Machine Learning Basics", topics: ["Scikit-learn", "Regression", "Classification", "Model evaluation"] },
    { week: "Week 7-8", title: "Advanced ML & Deep Learning", topics: ["Neural networks", "TensorFlow", "Keras", "Computer vision basics"] },
    { week: "Week 9-10", title: "Capstone Project", topics: ["Real-world problem solving", "End-to-end ML pipeline", "Deployment"] }
  ],
  "AI for Beginners": [
    { week: "Week 1-2", title: "Introduction to AI", topics: ["AI concepts", "Machine learning basics", "Python for AI", "Problem solving"] },
    { week: "Week 3-4", title: "Machine Learning", topics: ["Supervised learning", "Unsupervised learning", "Feature engineering", "Model selection"] },
    { week: "Week 5-6", title: "Neural Networks", topics: ["Neural network architecture", "Backpropagation", "Activation functions", "Optimization"] },
    { week: "Week 7-8", title: "Deep Learning", topics: ["Deep learning frameworks", "Computer vision", "Natural language processing"] }
  ],
  "UI/UX Design Basics": [
    { week: "Week 1-2", title: "Design Fundamentals", topics: ["Color theory", "Typography", "Layout principles", "Design systems"] },
    { week: "Week 3-4", title: "User Experience Design", topics: ["User research", "Personas", "User journeys", "Wireframing"] },
    { week: "Week 5-6", title: "Prototyping & Testing", topics: ["Interactive prototypes", "User testing", "Iterative design", "Design tools"] }
  ],
  "Digital Marketing Fundamentals": [
    { week: "Week 1-2", title: "Marketing Basics", topics: ["Marketing principles", "Digital channels", "Audience targeting", "Strategy development"] },
    { week: "Week 3-4", title: "Content & SEO", topics: ["Content strategy", "SEO fundamentals", "Keyword research", "Analytics basics"] },
    { week: "Week 5-6", title: "Social Media & Ads", topics: ["Social media platforms", "Ad campaigns", "Performance metrics", "Optimization"] }
  ],
  "Mobile App Development": [
    { week: "Week 1-2", title: "Mobile Development Basics", topics: ["Platform fundamentals", "UI components", "App lifecycle", "Navigation"] },
    { week: "Week 3-4", title: "Data & API Integration", topics: ["Local storage", "REST APIs", "Authentication", "State management"] },
    { week: "Week 5-6", title: "Advanced Features", topics: ["Notifications", "Location services", "Camera & media", "App store submission"] },
    { week: "Week 7-8", title: "Cross-Platform Development", topics: ["React Native", "Flutter basics", "Code sharing", "Native modules"] }
  ]
};

const courseOfferings = [
  "Live online classes with industry experts",
  "24/7 doubt resolution support",
  "Hands-on projects with real-world applications",
  "Personalized feedback on assignments",
  "Industry-recognized certification",
  "Exclusive access to learning resources",
  "Networking opportunities with peers",
  "Job placement assistance for top performers",
  "One-on-one mentoring sessions"
];

interface RegistrationDetails {
  register_id: number;
  course_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  referred_by: string | null;
  discounted_amount: number;
  registration_token: string;
  title: string;
  price: number;
}

interface CouponResponse {
  message: string;
  original_price: number;
  discount_percent: number;
  discounted_price: number;
  registration_id: number;
}

interface RazorpayResponse {
  message: string;
  transaction_id: string;
  amount: number;
  status: string;
  razorpay_order_id: string;
}

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState<RegistrationDetails | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponResponse | null>(null);
  const [orderDetails, setOrderDetails] = useState<RazorpayResponse | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Add Razorpay script loading
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    const initializeRazorpay = async () => {
      const res = await loadRazorpayScript();
      if (!res) {
        toast({
          title: "Razorpay SDK Failed to load",
          description: "Please check your internet connection or try again later.",
          variant: "destructive",
        });
      }
    };

    initializeRazorpay();
  }, [toast]);

  // Fetch registration details on mount
  useEffect(() => {
    const fetchRegistrationDetails = async () => {
      const storedData = sessionStorage.getItem('registration');
      if (!storedData) {
        toast({
          title: "Error",
          description: "No registration data found. Please register first.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      try {
        const { registrationToken } = JSON.parse(storedData);
        if (!registrationToken) {
          throw new Error('Invalid registration token');
        }

        const response = await fetch(API_ENDPOINTS.getRegistration(registrationToken));
        if (!response.ok) {
          throw new Error('Failed to fetch registration details');
        }
        const data = await response.json();
        setRegistrationDetails(data);
      } catch (error) {
        console.error('Error fetching registration details:', error);
        toast({
          title: "Error",
          description: "Failed to load registration details. Please try again.",
          variant: "destructive",
        });
        navigate('/');
      }
    };

    fetchRegistrationDetails();
  }, [navigate, toast]);

  const initializeRazorpayOrder = async (details: RegistrationDetails) => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.createPayment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify({
          course: details.course_id,
          courseregistration: details.register_id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initialize payment');
      }

      const data = await response.json();
      setOrderDetails(data);
      return data;
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to initialize payment',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || !registrationDetails) {
      toast({
        title: "Error",
        description: "Please enter a valid coupon code",
        variant: "destructive",
      });
      return;
    }

    setApplyingCoupon(true);
    try {
      const response = await fetch(API_ENDPOINTS.applyCoupon, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationid: registrationDetails.register_id,
          courseid: registrationDetails.course_id,
          code: couponCode
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "Invalid referral code.") {
          toast({
            title: "Invalid Code",
            description: "The referral code you entered is invalid. Please check and try again.",
            variant: "destructive",
          });
        } else {
          throw new Error(data.message || data.error || 'Failed to apply coupon');
        }
        return;
      }

      setAppliedCoupon(data);
      setRegistrationDetails(prev => prev ? {
        ...prev,
        discounted_amount: data.discounted_price
      } : null);

      toast({
        title: "Success",
        description: data.message || "Coupon applied successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to apply coupon",
        variant: "destructive",
      });
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    if (registrationDetails) {
      setRegistrationDetails({
        ...registrationDetails,
        discounted_amount: registrationDetails.price
      });
      setAppliedCoupon(null);
      setCouponCode('');
    }
  };

  // const handlePayment = async () => {
  //   if (!registrationDetails) return;

  //   // Check if Razorpay is loaded
  //   if (!(window as any).Razorpay) {
  //     toast({
  //       title: "Payment System Unavailable",
  //       description: "Please check your internet connection or try again later.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   // Initialize payment order
  //   const orderData = await initializeRazorpayOrder(registrationDetails);
  //   if (!orderData) return;

  //   const options = {
  //     key: "rzp_live_rly0BJKgu8Z5zG",
  //     amount: orderData.amount * 100,
  //     currency: "INR",
  //     name: "Nexloop Courses",
  //     description: `Course: ${registrationDetails.title}`,
  //     image: "/logo.png",
  //     order_id: orderData.razorpay_order_id,
  //     handler: function (response: any) {
  //       console.log("Payment Success", response);
        
  //       // Get the order_id from the response
  //       const orderId = response.razorpay_order_id;
        
  //       // Construct the verification URL with query parameters
  //       const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
  //       const verificationUrl = `${baseUrl}/create-payment/verify/${orderId}`;
        
  //       console.log('Sending verification request to:', verificationUrl);
        
  //       fetch(verificationUrl, {
  //         method: 'GET',
  //         headers: {
  //           'Accept': 'application/json',
  //         }
  //       })
  //         .then(async res => {
  //           const data = await res.text();
  //           console.log('Verification response:', {
  //             status: res.status,
  //             data: data
  //           });
            
  //           if (!res.ok) {
  //             try {
  //               const errorData = JSON.parse(data);
  //               throw new Error(errorData.message || `Verification failed with status: ${res.status}`);
  //             } catch (e) {
  //               throw new Error(`Verification failed with status: ${res.status}. URL: ${verificationUrl}`);
  //             }
  //           }

  //           try {
  //             return JSON.parse(data);
  //           } catch (e) {
  //             console.warn('Response is not JSON:', data);
  //             return {
  //               status: 'success',
  //               message: 'Payment verified successfully'
  //             };
  //           }
  //         })
  //         .then(data => {
  //           console.log("Payment verified:", data);
            
  //           // Store payment details in session storage for the success page
  //           sessionStorage.setItem('payment_success', JSON.stringify({
  //             course_title: registrationDetails.title,
  //             amount: orderData.amount,
  //             transaction_id: response.razorpay_payment_id,
  //             customer_name: registrationDetails.full_name,
  //             customer_email: registrationDetails.email
  //           }));

  //           // Redirect to success page after showing the toast
  //           setTimeout(() => {
  //             navigate('/payment-success');
  //           }, 2000);
  //         })
  //         .catch(error => {
  //           console.error("Payment verification failed:", error);
            
  //           // Store error details in session storage for the failure page
  //           sessionStorage.setItem('payment_failure', JSON.stringify({
  //             course_title: registrationDetails.title,
  //             amount: orderData.amount,
  //             order_id: orderData.razorpay_order_id,
  //             error_message: error.message,
  //             customer_name: registrationDetails.full_name,
  //             customer_email: registrationDetails.email
  //           }));

  //           // Redirect to failure page
  //           navigate('/payment-failure');
  //         });
  //     },
  //     modal: {
  //       ondismiss: function() {
  //         // Show friendly message when user cancels payment
  //         toast({
  //           title: "Payment Cancelled",
  //           description: (
  //             <div className="space-y-2">
  //               <p>You've cancelled the payment process.</p>
  //               <p className="text-sm">
  //                 Your course {registrationDetails.title} is still reserved for you. 
  //                 You can complete the payment whenever you're ready.
  //               </p>
  //             </div>
  //           ),
  //           duration: 5000,
  //         });
  //       },
  //       escape: true,
  //     },
  //     prefill: {
  //       name: registrationDetails.full_name,
  //       email: registrationDetails.email,
  //       contact: registrationDetails.phone_number,
  //     },
  //     notes: {
  //       registration_id: orderData.transaction_id,
  //       course_title: registrationDetails.title
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   try {
  //     const rzp = new (window as any).Razorpay(options);
  //     rzp.open();
  //   } catch (error) {
  //     console.error('Error opening Razorpay:', error);
  //     toast({
  //       title: "Payment Error",
  //       description: "Failed to open payment window. Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };


  const handlePayment = async () => {
    if (!registrationDetails) return;

   
    if (!(window as any).Razorpay) {
      toast({
        title: "Payment System Unavailable",
        description: "Please check your internet connection or try again later.",
        variant: "destructive",
      });
      return;
    }

    
    const orderData = await initializeRazorpayOrder(registrationDetails);
    if (!orderData) return;

    const options = {
      key: "rzp_live_rly0BJKgu8Z5zG",
      amount: orderData.amount * 100,
      currency: "INR",
      name: "Nexloop Courses",
      description: `Course: ${registrationDetails.title}`,
      image: "/logo.png",
      order_id: orderData.razorpay_order_id,
      handler: function (response: any) {
        console.log("Payment Success", response);
        
      
        const orderId = response.razorpay_order_id;
        
        
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
        const verificationUrl = `${baseUrl}/create-payment/verify/${orderId}`;
        
        console.log('Sending verification request to:', verificationUrl);
        
        fetch(verificationUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        })
          .then(async res => {
            const data = await res.text();
            console.log('Verification response:', {
              status: res.status,
              data: data
            });
            
            if (!res.ok) {
              try {
                const errorData = JSON.parse(data);
                throw new Error(errorData.message || `Verification failed with status: ${res.status}`);
              } catch (e) {
                throw new Error(`Verification failed with status: ${res.status}. URL: ${verificationUrl}`);
              }
            }

            try {
              return JSON.parse(data);
            } catch (e) {
              console.warn('Response is not JSON:', data);
              return {
                status: 'success',
                message: 'Payment verified successfully'
              };
            }
          })
          .then(data => {
            console.log("Payment verified:", data);
            
          
            sessionStorage.setItem('payment_success', JSON.stringify({
              course_title: registrationDetails.title,
              amount: orderData.amount,
              transaction_id: response.razorpay_payment_id,
              customer_name: registrationDetails.full_name,
              customer_email: registrationDetails.email
            }));

            
            setTimeout(() => {
              navigate('/payment-success');
            }, 2000);
          })
          .catch(error => {
            console.error("Payment verification failed:", error);
            
            
            sessionStorage.setItem('payment_failure', JSON.stringify({
              course_title: registrationDetails.title,
              amount: orderData.amount,
              order_id: orderData.razorpay_order_id,
              error_message: error.message,
              customer_name: registrationDetails.full_name,
              customer_email: registrationDetails.email
            }));

            
            navigate('/payment-failure');
          });
      },
      modal: {
        ondismiss: function() {
          
          toast({
            title: "Payment Cancelled",
            description: (
              <div className="space-y-2">
                <p>You've cancelled the payment process.</p>
                <p className="text-sm">
                  Your course {registrationDetails.title} is still reserved for you. 
                  You can complete the payment whenever you're ready.
                </p>
              </div>
            ),
            duration: 5000,
          });
        },
        escape: true,
      },
      prefill: {
        name: registrationDetails.full_name,
        email: registrationDetails.email,
        contact: registrationDetails.phone_number,
      },
      notes: {
        registration_id: orderData.transaction_id,
        course_title: registrationDetails.title
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        card: true,
        netbanking: true,
        wallet: true,
        upi: {
          vpa: true, 
          qr: false  
        }
      }
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error opening Razorpay:', error);
      toast({
        title: "Payment Error",
        description: "Failed to open payment window. Please try again.",
        variant: "destructive",
      });
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading registration details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!registrationDetails) return null;

  const currentCourseSyllabus = courseSyllabus[registrationDetails.title as keyof typeof courseSyllabus] || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-20 mt-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-center mb-8">Complete Your Payment</h1>
          
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Complete your payment to finalize your registration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-4 bg-gray-50">
                    <h3 className="font-medium text-lg">{registrationDetails.title}</h3>
                    <p className="text-gray-500">Comprehensive course with certification</p>
                    
                    <div className="mt-4">
                      <div className="flex justify-between py-2">
                        <span>Course Fee</span>
                        <span>₹{registrationDetails.price}</span>
                      </div>
                      {registrationDetails.price !== registrationDetails.discounted_amount && (
                        <div className="flex justify-between py-2 border-t">
                          <span>
                            Discount Applied
                            {registrationDetails.referred_by && ` (Referred by ${registrationDetails.referred_by})`}
                            {appliedCoupon && ` (Coupon: ${couponCode})`}
                          </span>
                          <span className="text-green-600">
                            -₹{(registrationDetails.price - registrationDetails.discounted_amount).toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between py-2 border-t">
                        <span className="font-semibold">Total Amount</span>
                        <span className="font-semibold">₹{registrationDetails.discounted_amount}</span>
                      </div>
                    </div>

                    {/* Coupon Section */}
                    <div className="mt-4 p-4 border rounded-md bg-white">
                      <h4 className="font-medium mb-2">Have a coupon code?</h4>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          disabled={!!appliedCoupon || applyingCoupon}
                          className="flex-1 uppercase"
                          style={{ textTransform: 'uppercase' }}
                        />
                        {!appliedCoupon ? (
                          <Button 
                            onClick={handleApplyCoupon}
                            disabled={applyingCoupon || !couponCode.trim()}
                          >
                            {applyingCoupon ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Applying
                              </>
                            ) : (
                              'Apply'
                            )}
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            onClick={handleRemoveCoupon}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      {appliedCoupon && (
                        <p className="text-green-600 text-sm mt-2">
                          {appliedCoupon.discount_percent}% discount applied!
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <Button 
                      className="w-full gradient-button" 
                      size="lg"
                      onClick={handlePayment}
                    >
                      Pay ₹{registrationDetails?.discounted_amount}
                    </Button>
                    
                    <div className="space-y-4 mt-6">
                      <p className="text-center text-sm text-gray-500">
                        Your payment information is securely processed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Your Information</h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li><span className="text-gray-500">Name:</span> {registrationDetails.full_name}</li>
                        <li><span className="text-gray-500">Email:</span> {registrationDetails.email}</li>
                        <li><span className="text-gray-500">Phone:</span> {registrationDetails.phone_number}</li>
                        <li>
                          <span className="text-gray-500">Referred by:</span>{' '}
                          {registrationDetails.referred_by ? (
                            <span className="text-green-600 font-medium">{registrationDetails.referred_by}</span>
                          ) : (
                            'Not referred'
                          )}
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium">What You'll Get</h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        {courseOfferings.map((offering, index) => (
                          <li key={index}>• {offering}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Syllabus</CardTitle>
                    <CardDescription>Explore what you'll learn in this course</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {currentCourseSyllabus.map((module, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div>
                              <span className="font-medium">{module.week}</span>: {module.title}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              {module.topics.map((topic, topicIndex) => (
                                <li key={topicIndex}>{topic}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
