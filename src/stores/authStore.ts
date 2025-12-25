import AsyncStorage from '@react-native-async-storage/async-storage';
import { types, flow, Instance } from 'mobx-state-tree';
import { persist } from 'mst-persist';
import { SupabaseService } from '@services/supabase.service';
import type { User } from '@supabase/supabase-js';

// User model
const UserModel = types.model('User', {
  id: types.string,
  email: types.maybeNull(types.string),
  created_at: types.maybeNull(types.string),
});

// Auth Store
export const AuthStore = types
  .model('AuthStore', {
    user: types.maybeNull(UserModel),
    isAuthenticated: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, true),
    isHydrated: types.optional(types.boolean, false),
  })
  .actions(self => ({
    setUser(user: User | null) {
      if (user) {
        self.user = {
          id: user.id,
          email: user.email || null,
          created_at: user.created_at || null,
        };
        self.isAuthenticated = true;
      } else {
        self.user = null;
        self.isAuthenticated = false;
      }
    },
    setLoading(loading: boolean) {
      self.isLoading = loading;
    },
    setHydrated(hydrated: boolean) {
      self.isHydrated = hydrated;
    },
  }))
  .actions(self => ({
    signIn: flow(function* (email: string, password: string) {
      self.setLoading(true);
      try {
        const result = yield SupabaseService.signInWithEmail(email, password);
        if (result.success && result.user) {
          self.setUser(result.user);
          return { success: true, message: result.message };
        }
        return { success: false, message: result.message };
      } catch (error) {
        return { success: false, message: `Sign in failed: ${error}` };
      } finally {
        self.setLoading(false);
      }
    }),
    signUp: flow(function* (email: string, password: string) {
      self.setLoading(true);
      try {
        const result = yield SupabaseService.signUpWithEmail(email, password);
        if (result.success && result.user) {
          self.setUser(result.user);
          return { success: true, message: result.message };
        }
        return { success: false, message: result.message };
      } catch (error) {
        return { success: false, message: `Sign up failed: ${error}` };
      } finally {
        self.setLoading(false);
      }
    }),
    signOut: flow(function* () {
      try {
        const result = yield SupabaseService.signOut();
        if (result.success) {
          self.setUser(null);
          return { success: true, message: result.message };
        }
        return { success: false, message: result.message };
      } catch (error) {
        return { success: false, message: `Sign out failed: ${error}` };
      }
    }),
    checkSession: flow(function* () {
      self.setLoading(true);
      try {
        const session = yield SupabaseService.getSession();
        if (session?.user) {
          self.setUser(session.user);
        } else {
          self.setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        self.setUser(null);
      } finally {
        self.setLoading(false);
      }
    }),
  }));

export interface IAuthStore extends Instance<typeof AuthStore> {}

// Create store instance
export const authStore = AuthStore.create({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isHydrated: false,
});

// Persist configuration
persist('authStore', authStore, {
  storage: AsyncStorage,
  jsonify: true,
  whitelist: ['user', 'isAuthenticated'],
}).then(() => {
  authStore.setHydrated(true);
  // Check session after hydration
  authStore.checkSession();
});
