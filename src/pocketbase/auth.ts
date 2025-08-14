import { pb } from './config';

// Admin authentication service
export class PocketBaseAuth {
  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return pb.authStore.isValid || pb.authStore.token === 'admin-token';
  }

  // Get current user
  static getCurrentUser() {
    return pb.authStore.model;
  }

  // Admin login
  static async login(email: string, password: string): Promise<boolean> {
    try {
      // For now, use a simple hardcoded admin check until PocketBase is set up
      // This will be replaced with actual PocketBase authentication
      if (email === 'admin@bgmi.com' && password === 'admin123') {
        // Set a simple auth token
        pb.authStore.save('admin-token', { 
          id: 'admin', 
          email: 'admin@bgmi.com',
          collectionId: 'admins',
          collectionName: 'admins'
        } as any);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  // Admin logout
  static logout(): void {
    pb.authStore.clear();
  }

  // Refresh authentication
  static async refresh(): Promise<boolean> {
    try {
      // For now, just return true if we have the admin token
      return pb.authStore.token === 'admin-token';
    } catch (error) {
      console.error('Refresh error:', error);
      return false;
    }
  }
}

export default PocketBaseAuth;
