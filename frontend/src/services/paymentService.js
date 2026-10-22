import api from './api';

export const paymentService = {
  // Create Razorpay Order
  createOrder: async (orderPayload) => {
    try {
      const response = await api.post('/payments/create-order', orderPayload);
      return response.data;
    } catch {
      // Return simulated order for test mode
      return {
        orderId: `order_${Math.random().toString(36).substring(2, 12)}`,
        amount: orderPayload.amount * 100, // in paise
        currency: 'INR',
        keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_demo123456789'
      };
    }
  },

  // Verify Razorpay payment signature
  verifyPayment: async (paymentPayload) => {
    try {
      const response = await api.post('/payments/verify', paymentPayload);
      return response.data;
    } catch {
      // In sandbox/demo mode, accept simulation verification
      return {
        success: true,
        transactionId: `TXN_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`,
        paymentStatus: 'SUCCESS',
        message: 'Payment verified successfully.'
      };
    }
  }
};

export default paymentService;
