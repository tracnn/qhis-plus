import { defineStore } from 'pinia';
import { authService } from '@/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  getters: {
    getUser: (state) => state.user,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },

  actions: {
    async checkAuth() {
      const token = localStorage.getItem('access_token');
      if (!token) {
        this.isAuthenticated = false;
        this.user = null;
        return false;
      }

      try {
        const user = await authService.getCurrentUser();
        this.user = user;
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        this.isAuthenticated = false;
        this.user = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return false;
      }
    },

    async login(credentials) {
      const response = await authService.login(credentials);
      this.isAuthenticated = true;
      this.user = response.data;
      return response;
    },

    logout() {
      // Xóa token
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('remembered_username');
      localStorage.removeItem('remembered_password');
      
      // Reset state
      this.isAuthenticated = false;
      this.user = null;

      // Reload trang để xóa hoàn toàn state
      window.location.href = '/#/auth/signin';
    }
  }
}); 