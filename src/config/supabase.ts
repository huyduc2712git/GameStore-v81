import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Environment variables - Replace these with your actual Supabase credentials
// In production, use a proper environment variable solution like react-native-config
const SUPABASE_URL = 'https://rdsclqvhzszujsenewos.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_dg-FCblf42ftIe9jfdOTlA_9ars2hL3';

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Type-safe database schema (add your types here)
export type Database = {
  public: {
    Tables: {
      photos: {
        Row: {
          id: string;
          user_id: string;
          file_name: string;
          file_url: string;
          file_path: string;
          file_size: number | null;
          mime_type: string | null;
          uploaded_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          file_name: string;
          file_url: string;
          file_path: string;
          file_size?: number | null;
          mime_type?: string | null;
          uploaded_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          file_name?: string;
          file_url?: string;
          file_path?: string;
          file_size?: number | null;
          mime_type?: string | null;
          uploaded_at?: string;
          created_at?: string;
        };
      };
    };
  };
};

// Export typed client
export type SupabaseClient = typeof supabase;
