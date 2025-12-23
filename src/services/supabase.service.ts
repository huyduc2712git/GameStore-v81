import { supabase } from '@config/supabase';
import type { User, AuthError } from '@supabase/supabase-js';

/**
 * Supabase Service
 * Helper functions for interacting with Supabase
 */

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User | null;
  error?: AuthError | null;
}

export class SupabaseService {
  /**
   * Test Supabase connection
   * @returns Promise with success status and message
   */
  static async testConnection(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // Try to get the current session
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return {
          success: false,
          message: `Connection error: ${error.message}`,
        };
      }

      return {
        success: true,
        message: 'Successfully connected to Supabase!',
      };
    } catch (error) {
      return {
        success: false,
        message: `Connection failed: ${error}`,
      };
    }
  }

  /**
   * Sign in with email and password
   * @param email User email
   * @param password User password
   * @returns AuthResponse with user data or error
   */
  static async signInWithEmail(
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          message: error.message,
          error,
        };
      }

      return {
        success: true,
        message: 'Successfully signed in!',
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: `Sign in failed: ${error}`,
        error: error as AuthError,
      };
    }
  }

  /**
   * Sign up with email and password
   * @param email User email
   * @param password User password
   * @returns AuthResponse with user data or error
   */
  static async signUpWithEmail(
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          message: error.message,
          error,
        };
      }

      return {
        success: true,
        message:
          'Successfully signed up! Please check your email to verify your account.',
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: `Sign up failed: ${error}`,
        error: error as AuthError,
      };
    }
  }

  /**
   * Sign out current user
   * @returns AuthResponse with success status
   */
  static async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          success: false,
          message: error.message,
          error,
        };
      }

      return {
        success: true,
        message: 'Successfully signed out!',
      };
    } catch (error) {
      return {
        success: false,
        message: `Sign out failed: ${error}`,
        error: error as AuthError,
      };
    }
  }

  /**
   * Get current authenticated user
   * @returns Current user or null
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await supabase.auth.getUser();
      return data.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Get current session
   * @returns Current session or null
   */
  static async getSession() {
    try {
      const { data } = await supabase.auth.getSession();
      return data.session;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }
}
