import { pb } from './config';

// Test PocketBase connection and authentication
export const testPocketBaseConnection = async () => {
  try {
    console.log('Testing PocketBase connection...');
    
    // Test basic connection
    const collections = await pb.collections.getFullList();
    console.log('✅ PocketBase connection successful');
    console.log('Collections found:', collections.length);
    
    // Test admin authentication
    try {
      const authData = await pb.admins.authWithPassword('bgmi2005@gmail.com', 'bgmi@181003');
      console.log('✅ Admin authentication successful');
      console.log('Auth token:', authData.token ? 'Present' : 'Missing');
      console.log('Admin ID:', 'Authenticated');
    } catch (authError) {
      console.error('❌ Admin authentication failed:', authError);
    }
    
    return true;
  } catch (error) {
    console.error('❌ PocketBase connection failed:', error);
    return false;
  }
};

export default testPocketBaseConnection;
