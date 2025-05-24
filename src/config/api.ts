export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

export const API_ENDPOINTS = {
  courses: `${API_BASE_URL}/courses/`,
  register: `${API_BASE_URL}/enroll/register`,
  applyCoupon: `${API_BASE_URL}/enroll/apply-coupon`,
  getRegistration: (token: string) => `${API_BASE_URL}/enroll/${token}`,
  createPayment: `${API_BASE_URL}/create-payment/create-payment`,
  verifyPayment: (orderId: string) => `${API_BASE_URL}/create-payment/verify/${orderId}`,
}; 