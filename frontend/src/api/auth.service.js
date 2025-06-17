import apiClient from './config';

export const authService = {
  // Đăng nhập
  async login(credentials) {
    return await apiClient.post('/auth/login', credentials);
  },

  // Đăng xuất
  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  // Lấy thông tin user hiện tại
  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Refresh token
  async refreshToken(refreshToken) {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }
    return response.data;
  },
}; 