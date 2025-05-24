import { load } from '@cashfreepayments/cashfree-js';

export interface PaymentSessionResponse {
  payment_session_id: string;
  order_id: string;
  amount: number;
  status: string;
  message?: string;
}

export interface PaymentConfig {
  orderToken: string;
  orderAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

class PaymentService {
  private cashfree: any;

  async initialize() {
    if (!this.cashfree) {
      this.cashfree = await load({
        mode: 'production'
      });
    }
    return this.cashfree;
  }

  async renderPaymentUI(containerId: string, config: PaymentConfig) {
    try {
      // Initialize Cashfree
      const cashfree = await this.initialize();

      // Basic validation
      if (!config.orderToken) {
        throw new Error('Payment session ID is required');
      }

      // Simple event emitter
      const eventEmitter = {
        _events: new Map(),
        on(event: string, callback: Function) {
          this._events.set(event, callback);
        },
        emit(event: string, data: any) {
          const callback = this._events.get(event);
          if (callback) callback(data);
        }
      };

      // Store initial payment details
      const initialPaymentDetails = {
        orderId: config.orderToken,
        amount: config.orderAmount,
        customerName: config.customerName,
        customerEmail: config.customerEmail,
        customerPhone: config.customerPhone,
        paymentStatus: 'Initiated'
      };
      sessionStorage.setItem('pendingPayment', JSON.stringify(initialPaymentDetails));

      // Configure checkout
      const checkoutConfig = {
        paymentSessionId: config.orderToken,
        returnUrl: `${window.location.origin}/payment-verification`,
        onSuccess: (data: any) => {
          console.log('Payment Success:', data);
          // Update payment details with success data
          const paymentDetails = JSON.parse(sessionStorage.getItem('pendingPayment') || '{}');
          sessionStorage.setItem('pendingPayment', JSON.stringify({
            ...paymentDetails,
            orderId: data.order_id || config.orderToken,
            transactionId: data.transaction_id,
            paymentStatus: 'Success',
            message: data.message
          }));
          eventEmitter.emit('payment_success', data);
        },
        onFailure: (data: any) => {
          console.log('Payment Failure:', data);
          // Update payment details with failure data
          const paymentDetails = JSON.parse(sessionStorage.getItem('pendingPayment') || '{}');
          sessionStorage.setItem('pendingPayment', JSON.stringify({
            ...paymentDetails,
            orderId: data.order_id || config.orderToken,
            transactionId: data.transaction_id,
            paymentStatus: 'Failed',
            errorMessage: data.message || 'Payment failed'
          }));  
          eventEmitter.emit('payment_failure', data);
        },
        onClose: () => {
          console.log('Payment Window Closed');
          eventEmitter.emit('payment_closed', {
            status: 'closed'
          });
        }
      };

      // Initialize checkout
      console.log('Initializing checkout with config:', {
        ...checkoutConfig,
        customerName: config.customerName,
        customerEmail: config.customerEmail,
        customerPhone: config.customerPhone
      });
      
      cashfree.checkout(checkoutConfig);

      return eventEmitter;
    } catch (error) {
      console.error('Payment initialization error:', error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService(); 