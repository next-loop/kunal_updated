import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { XCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentFailureDetails {
  course_title: string;
  amount: number;
  order_id: string;
  error_message: string;
  customer_name: string;
  customer_email: string;
}

const PaymentFailure = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentDetails, setPaymentDetails] = useState<PaymentFailureDetails | null>(null);

  useEffect(() => {
    const storedDetails = sessionStorage.getItem('payment_failure');
    if (!storedDetails) {
      navigate('/');
      return;
    }

    setPaymentDetails(JSON.parse(storedDetails));
    // Clear the payment details from session storage
    sessionStorage.removeItem('payment_failure');
  }, [navigate]);

  if (!paymentDetails) return null;

  const handleCopyDetails = () => {
    const supportInfo = `
Course: ${paymentDetails.course_title}
Order ID: ${paymentDetails.order_id}
Amount: ₹${paymentDetails.amount}
Name: ${paymentDetails.customer_name}
Email: ${paymentDetails.customer_email}
Error: ${paymentDetails.error_message}
    `.trim();

    navigator.clipboard.writeText(supportInfo);
    toast({
      title: "📋 Copied!",
      description: "Payment details copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-20 mt-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <XCircle className="h-16 w-16 text-red-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-600">
                Payment Failed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-red-700">
                  We couldn't process your payment
                </h3>
                <div className="space-y-2 text-left">
                  <p><span className="font-medium">Course:</span> {paymentDetails.course_title}</p>
                  <p><span className="font-medium">Amount:</span> ₹{paymentDetails.amount}</p>
                  <p><span className="font-medium">Order ID:</span> {paymentDetails.order_id}</p>
                  <p><span className="font-medium">Error:</span> {paymentDetails.error_message}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg text-left">
                  <h4 className="font-semibold mb-3">What to do next:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Don't worry if the amount was deducted - it will be refunded within 5-7 working days</li>
                    <li>Check your internet connection and try again</li>
                    <li>Ensure you have sufficient funds in your account</li>
                    <li>Contact our support team if the issue persists</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg text-left">
                  <h4 className="font-semibold mb-3">Need Help?</h4>
                  <div className="space-y-2">
                    <p>Contact our support team:</p>
                    <p>Email: support@nexloop.com</p>
                    <p>Support Hours: 9 AM - 6 PM IST</p>
                    <Button
                      variant="outline"
                      className="w-full mt-3"
                      onClick={handleCopyDetails}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Payment Details
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <Button 
                    onClick={() => navigate('/payment')}
                    className="w-full"
                  >
                    Try Again
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Back to Home
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

export default PaymentFailure; 