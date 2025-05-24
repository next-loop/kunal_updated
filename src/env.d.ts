/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CASHFREE_APP_ID: string;
  readonly VITE_CASHFREE_SECRET_KEY: string;
  readonly VITE_CASHFREE_MODE: 'PRODUCTION' | 'SANDBOX';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 