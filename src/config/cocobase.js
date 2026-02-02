import { Cocobase } from 'cocobase';

// Cocobase Configuration
// Supports environment variables with fallback to hardcoded values
const COCOBASE_CONFIG = {
  apiKey: import.meta.env.VITE_COCOBASE_API_KEY,
  projectId: import.meta.env.VITE_COCOBASE_PROJECT_ID,
  baseURL: import.meta.env.VITE_COCOBASE_BASE_URL
};

// Validate configuration
if (!COCOBASE_CONFIG.apiKey || !COCOBASE_CONFIG.projectId || !COCOBASE_CONFIG.baseURL) {
  console.error('❌ Cocobase configuration is missing. Please check your .env file.');
  throw new Error('Cocobase configuration is missing');
}

// Initialize and export Cocobase instance
export const db = new Cocobase(COCOBASE_CONFIG);

// Export config for reference if needed
export { COCOBASE_CONFIG };
