/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_VERSION: string;

  // Razorpay Configuration
  readonly VITE_RAZORPAY_KEY_ID: string;
  readonly VITE_RAZORPAY_KEY_SECRET: string;
  readonly VITE_RAZORPAY_MODE: 'test' | 'live';

  // Application Configuration
  readonly VITE_APP_NAME: string;
  readonly VITE_SUPPORT_EMAIL: string;
  readonly VITE_SUPPORT_HOURS: string;
  readonly VITE_THEME_COLOR: string;

  // Server Configuration
  readonly VITE_SERVER_PORT: string;
  readonly VITE_SERVER_HOST: string;

  // Cashfree Configuration
  readonly VITE_CASHFREE_APP_ID: string;
  readonly VITE_CASHFREE_SECRET_KEY: string;
  readonly VITE_CASHFREE_MODE: 'PRODUCTION' | 'SANDBOX';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 