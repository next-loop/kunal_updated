import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface PaymentDetails {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  transactionId?: string;
  paymentStatus?: string;
  courseTitle?: string;
}

const PaymentSuccess = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get payment details from session storage
    const storedPayment = sessionStorage.getItem('pendingPayment');
    if (!storedPayment) {
      console.error('No payment details found in session storage');
      toast({
        title: 'Error',
        description: 'Payment details not found',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }

    try {
      const details = JSON.parse(storedPayment);
      
      // Verify we have a successful payment
      if (details.paymentStatus !== 'Completed' && details.paymentStatus !== 'Success') {
        console.error('Invalid payment status:', details.paymentStatus);
        toast({
          title: 'Payment Not Completed',
          description: 'Your payment has not been completed successfully.',
          variant: 'destructive',
        });
        navigate('/payment');
        return;
      }

      console.log('Payment success details:', details);
      setPaymentDetails(details);

      // Show success toast
      toast({
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      });

      // Clear the pending payment from session storage
      sessionStorage.removeItem('pendingPayment');
    } catch (error) {
      console.error('Error processing payment details:', error);
      toast({
        title: 'Error',
        description: 'Could not process payment details',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [navigate, toast]);

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!paymentDetails) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-20 mt-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
              <p className="text-gray-600">Thank you for enrolling in {paymentDetails.courseTitle}. Your transaction has been completed.</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="border-t border-b py-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  
                  {paymentDetails.transactionId && (
                    <>
                      <div className="text-left text-gray-600">Transaction ID</div>
                      <div className="text-right font-medium">{paymentDetails.transactionId}</div>
                    </>
                  )}
                  
                  <div className="text-left text-gray-600">Amount Paid</div>
                  <div className="text-right font-medium">₹{paymentDetails.amount}</div>
                  
                  <div className="text-left text-gray-600">Name</div>
                  <div className="text-right font-medium">{paymentDetails.customerName}</div>
                  
                  <div className="text-left text-gray-600">Email</div>
                  <div className="text-right font-medium">{paymentDetails.customerEmail}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                className="w-full gradient-button" 
                size="lg"
                onClick={handleBackToHome}
              >
                Back to Home
              </Button>
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to {paymentDetails.customerEmail}
              </p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
