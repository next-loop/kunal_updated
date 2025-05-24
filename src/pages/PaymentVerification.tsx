import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_ENDPOINTS } from '@/config/api';
import { useToast } from '@/hooks/use-toast';

interface VerificationResponse {
  status: string;
  message: string;
  amount: number;
  transaction_id: string;
  error_message: string | null;
  course_title: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
}

const PaymentVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(true);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get payment details from session storage
        const storedPayment = sessionStorage.getItem('pendingPayment');
        if (!storedPayment) {
          console.error('No pending payment found in session storage');
          toast({
            title: "Verification Failed",
            description: "No payment details found. Please try again.",
            variant: "destructive",
          });
          setRedirectTo('/payment');
          return;
        }

        const details = JSON.parse(storedPayment);
        
        // Check if we have an order ID
        if (!details.orderId) {
          console.error('No order ID found in payment details');
          toast({
            title: "Verification Failed",
            description: "No order ID found. Please try the payment again.",
            variant: "destructive",
          });
          setRedirectTo('/payment');
          return;
        }

        console.log('Verifying payment for order:', details.orderId);

        // Send verification request to backend using GET
        const response = await fetch(API_ENDPOINTS.verifyPayment(details.orderId), {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });

        // Parse response data
        const data: VerificationResponse = await response.json();
        console.log('Payment verification response:', data);

        if (!response.ok) {
          throw new Error(data.message || data.error_message || 'Failed to verify payment');
        }

        // Update stored payment details with backend response
        const updatedPaymentDetails = {
          ...details,
          amount: data.amount,
          paymentStatus: data.status,
          errorMessage: data.error_message,
          transactionId: data.transaction_id,
          courseTitle: data.course_title,
          customerName: data.customer_name,
          customerEmail: data.customer_email,
          customerPhone: data.customer_phone
        };
        sessionStorage.setItem('pendingPayment', JSON.stringify(updatedPaymentDetails));

        console.log('Processing payment status:', data.status);

        // Handle the backend status directly
        if (data.status === 'Completed' || data.status === 'Success') {
          console.log('Payment successful, redirecting to success page');
          toast({
            title: "Payment Successful",
            description: "Your payment has been verified successfully.",
            variant: "default",
          });
          setRedirectTo('/payment-success');
          return;
        }

        if (data.status === 'Failed' || data.status === 'Failure') {
          console.log('Payment failed, redirecting to failure page');
          toast({
            title: "Payment Failed",
            description: data.error_message || "Your payment could not be processed.",
            variant: "destructive",
          });
          setRedirectTo('/payment-failure');
          return;
        }

        // Handle pending or unknown status
        console.log('Payment status unclear:', data.status);
        toast({
          title: "Payment Status",
          description: data.message || "Payment status is being verified.",
          variant: "default",
        });
        // Use setTimeout with setRedirectTo
        setTimeout(() => setRedirectTo('/payment'), 3000);

      } catch (error) {
        console.error('Payment verification error:', error);
        toast({
          title: "Verification Failed",
          description: error instanceof Error ? error.message : "Could not verify payment status",
          variant: "destructive",
        });
        setRedirectTo('/payment');
      } finally {
        setVerifying(false);
      }
    };

    // Start verification process
    verifyPayment();
  }, [toast]);

  // Handle redirect
  if (redirectTo) {
    console.log('Redirecting to:', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center space-y-4">
          {verifying ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-nexloop-primary" />
              <p className="text-lg">Verifying your payment...</p>
              <p className="text-sm text-gray-500">Please wait while we confirm your payment status.</p>
            </>
          ) : (
            <p className="text-lg">Redirecting...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentVerification; 