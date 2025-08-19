import PocketBase from 'pocketbase';

// PocketBase configuration
const POCKETBASE_URL = 'http://127.0.0.1:8090';

// Initialize PocketBase client with error handling
let pb: PocketBase;
try {
  pb = new PocketBase(POCKETBASE_URL);
} catch (error) {
  console.warn('PocketBase initialization failed, using fallback:', error);
  // Create a minimal fallback PocketBase instance
  pb = new PocketBase('http://localhost:8090');
}

// Export the PocketBase client
export { pb };

// Collection names
export const COLLECTIONS = {
  BGMI_IDS: 'bgmi_ids',
  ADMINS: 'admins'
} as const;

// Export the client for use in other files
export default pb;
