import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';

interface PaymentSuccessDetails {
  course_title: string;
  amount: number;
  transaction_id: string;
  customer_name: string;
  customer_email: string;
}

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState<PaymentSuccessDetails | null>(null);

  useEffect(() => {
    const storedDetails = sessionStorage.getItem('payment_success');
    if (!storedDetails) {
      navigate('/');
      return;
    }

    setPaymentDetails(JSON.parse(storedDetails));
    // Clear the payment details from session storage
    sessionStorage.removeItem('payment_success');
  }, [navigate]);

  if (!paymentDetails) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-20 mt-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-600">
                Payment Successful!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Welcome to {paymentDetails.course_title}!
                </h3>
                <div className="space-y-2 text-left">
                  <p><span className="font-medium">Amount Paid:</span> ₹{paymentDetails.amount}</p>
                  <p><span className="font-medium">Transaction ID:</span> {paymentDetails.transaction_id}</p>
                  <p><span className="font-medium">Name:</span> {paymentDetails.customer_name}</p>
                  <p><span className="font-medium">Email:</span> {paymentDetails.customer_email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-lg text-left">
                  <h4 className="font-semibold mb-3">Next Steps:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Check your email for course access details</li>
                    <li>Join the student community</li>
                    <li>Start your learning journey</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <Button 
                    onClick={() => navigate('/')}
                    className="w-full"
                  >
                    Go to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess; 