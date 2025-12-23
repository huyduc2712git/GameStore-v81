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

  /**
   * Upload image to Supabase Storage
   * @param file File object with uri, type, and name
   * @param bucket Storage bucket name
   * @param path File path in bucket
   * @returns Upload response with success status and URL
   */
  static async uploadImage(
    file: { uri: string; type: string; name: string },
    bucket: string = 'images',
    path?: string,
  ): Promise<{
    success: boolean;
    message: string;
    url?: string;
    path?: string;
  }> {
    try {
      // Generate unique file name if path not provided
      const fileName = path || `${Date.now()}_${file.name}`;

      // Convert file URI to blob for upload
      const response = await fetch(file.uri);
      const blob = await response.blob();

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, blob, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return {
        success: true,
        message: 'Image uploaded successfully!',
        url: urlData.publicUrl,
        path: data.path,
      };
    } catch (error) {
      return {
        success: false,
        message: `Upload failed: ${error}`,
      };
    }
  }

  /**
   * Get public URL for a file in storage
   * @param bucket Storage bucket name
   * @param path File path in bucket
   * @returns Public URL
   */
  static getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  /**
   * List files in a storage bucket
   * @param bucket Storage bucket name
   * @param path Folder path (optional)
   * @returns List of files
   */
  static async listFiles(bucket: string, path: string = '') {
    try {
      const { data, error } = await supabase.storage.from(bucket).list(path);

      if (error) {
        console.error('Error listing files:', error);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }
}
