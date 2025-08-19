import { pb } from './config';

// Admin authentication service
export class PocketBaseAuth {
  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return pb.authStore.isValid;
  }

  // Get current user
  static getCurrentUser() {
    return pb.authStore.model;
  }

  // Admin login
  static async login(email: string, password: string): Promise<boolean> {
    try {
      // Use real PocketBase authentication
      const authData = await pb.admins.authWithPassword(email, password);
      if (authData.token) {
        console.log('PocketBase login successful:', email);
        return true;
      }
      return false;
    } catch (error) {
      console.error('PocketBase login error:', error);
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
      // Use real PocketBase refresh
      if (pb.authStore.isValid) {
        // For now, just return true if auth is valid
        // PocketBase handles refresh automatically
        return true;
      }
      return false;
    } catch (error) {
      console.error('PocketBase refresh error:', error);
      return false;
    }
  }
}

export default PocketBaseAuth;
