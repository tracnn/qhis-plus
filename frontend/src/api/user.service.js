import apiClient from './config';

export const userService = {
  // Lấy danh sách users
  async getUsers(params) {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },

  // Lấy thông tin chi tiết user
  async getUserById(id) {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  // Tạo user mới
  async createUser(userData) {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  // Cập nhật thông tin user
  async updateUser(id, userData) {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },

  // Xóa user
  async deleteUser(id) {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  }
}; 