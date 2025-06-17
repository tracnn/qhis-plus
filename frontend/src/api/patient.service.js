import apiClient from './config';

export const patientService = {
  // Lấy danh sách bệnh nhân
  async getPatients(params) {
    const response = await apiClient.get('/patients', { params });
    return response.data;
  },

  // Lấy thông tin chi tiết bệnh nhân
  async getPatientById(id) {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data;
  },

  // Tạo hồ sơ bệnh nhân mới
  async createPatient(patientData) {
    const response = await apiClient.post('/patients', patientData);
    return response.data;
  },

  // Cập nhật thông tin bệnh nhân
  async updatePatient(id, patientData) {
    const response = await apiClient.put(`/patients/${id}`, patientData);
    return response.data;
  },

  // Lấy lịch sử khám bệnh
  async getPatientHistory(id) {
    const response = await apiClient.get(`/patients/${id}/history`);
    return response.data;
  },

  // Lấy thông tin bảo hiểm y tế
  async getPatientInsurance(id) {
    const response = await apiClient.get(`/patients/${id}/insurance`);
    return response.data;
  }
}; 