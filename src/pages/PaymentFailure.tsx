import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { XCircle, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface PaymentDetails {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  errorMessage?: string;
  transactionId?: string;
  paymentStatus?: string;
  courseTitle?: string;
}

const PaymentFailure = () => {
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
      navigate('/payment');
      return;
    }

    try {
      const details = JSON.parse(storedPayment);
      console.log('Payment failure details:', details);

      // Verify we have a failed payment
      if (details.paymentStatus !== 'Failed' && details.paymentStatus !== 'Failure') {
        console.error('Invalid payment status for failure page:', details.paymentStatus);
        toast({
          title: 'Invalid Payment Status',
          description: 'Redirecting to payment page',
          variant: 'destructive',
        });
        navigate('/payment');
        return;
      }

      setPaymentDetails(details);

      // Show failure toast
      toast({
        title: 'Payment Failed',
        description: details.errorMessage || 'Your payment could not be processed',
        variant: 'destructive',
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
      navigate('/payment');
    }
  }, [navigate, toast]);

  const handleRetryPayment = () => {
    navigate('/payment');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleContactSupport = () => {
    // Open email client with support email
    window.location.href = `mailto:support@nexloop.com?subject=Payment%20Failed%20-%20Order%20${paymentDetails?.orderId}&body=Hello,%0D%0A%0D%0AI'm facing issues with my payment.%0D%0A%0D%0AOrder ID: ${paymentDetails?.orderId}%0D%0ATransaction ID: ${paymentDetails?.transactionId || 'N/A'}%0D%0AAmount: ₹${paymentDetails?.amount}%0D%0ACourse: ${paymentDetails?.courseTitle}%0D%0AError: ${paymentDetails?.errorMessage || 'Payment failed'}`;
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
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
              <p className="text-gray-600 mb-4">
                {paymentDetails.errorMessage || 'Your payment could not be processed. Please try again.'}
              </p>
              {paymentDetails.courseTitle && (
                <p className="text-sm text-gray-500">
                  Course: {paymentDetails.courseTitle}
                </p>
              )}
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
                  
                  <div className="text-left text-gray-600">Amount</div>
                  <div className="text-right font-medium">₹{paymentDetails.amount}</div>
                  
                  <div className="text-left text-gray-600">Name</div>
                  <div className="text-right font-medium">{paymentDetails.customerName}</div>
                  
                  <div className="text-left text-gray-600">Email</div>
                  <div className="text-right font-medium">{paymentDetails.customerEmail}</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-left text-sm text-yellow-600">
                  <p className="font-medium">Don't worry!</p>
                  <p>If any amount was deducted, it will be refunded within 5-7 business days.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleRetryPayment}
                variant="default"
              >
                Try Payment Again
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleContactSupport}
                  variant="outline"
                >
                  Contact Support
                </Button>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleBackToHome}
                  variant="outline"
                >
                  Back to Home
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Need help? Contact our support team at support@nexloop.com
              </p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentFailure; 