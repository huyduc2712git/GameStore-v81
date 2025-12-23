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

      console.log('Starting upload:', fileName);
      console.log('File URI:', file.uri);

      // Convert file URI to ArrayBuffer (works better on React Native)
      const response = await fetch(file.uri);
      const arrayBuffer = await response.arrayBuffer();

      console.log('ArrayBuffer size:', arrayBuffer.byteLength);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, arrayBuffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        return {
          success: false,
          message: error.message,
        };
      }

      console.log('Upload success:', data);

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
      console.error('Upload exception:', error);
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

  /**
   * Save photo metadata to database
   * @param photoData Photo information
   * @returns Success status
   */
  static async savePhotoMetadata(photoData: {
    file_name: string;
    file_url: string;
    file_path: string;
    file_size?: number;
    mime_type?: string;
  }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
      const user = await this.getCurrentUser();
      if (!user) {
        return {
          success: false,
          message: 'User not authenticated',
        };
      }

      const { data, error } = await supabase
        .from('photos')
        .insert({
          user_id: user.id,
          ...photoData,
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving photo metadata:', error);
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        message: 'Photo metadata saved',
        id: data.id,
      };
    } catch (error) {
      console.error('Error saving photo metadata:', error);
      return {
        success: false,
        message: `Failed to save metadata: ${error}`,
      };
    }
  }

  /**
   * Get all photos for current user
   * @returns Array of photos
   */
  static async getUserPhotos(): Promise<any[]> {
    try {
      const user = await this.getCurrentUser();
      if (!user) {
        console.log('No user authenticated');
        return [];
      }

      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Error fetching photos:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
  }

  /**
   * Delete photo from storage and database
   * @param photoId Database photo ID
   * @param filePath Storage file path
   * @param bucket Storage bucket name
   * @returns Success status
   */
  static async deletePhoto(
    photoId: string,
    filePath: string,
    bucket: string = 'images',
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (storageError) {
        console.error('Error deleting from storage:', storageError);
        return {
          success: false,
          message: `Storage deletion failed: ${storageError.message}`,
        };
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('photos')
        .delete()
        .eq('id', photoId);

      if (dbError) {
        console.error('Error deleting from database:', dbError);
        return {
          success: false,
          message: `Database deletion failed: ${dbError.message}`,
        };
      }

      return {
        success: true,
        message: 'Photo deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting photo:', error);
      return {
        success: false,
        message: `Delete failed: ${error}`,
      };
    }
  }
}
