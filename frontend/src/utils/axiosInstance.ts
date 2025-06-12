import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('accessToken');

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // tùy dự án
  // ...các config khác
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// Interceptor xử lý lỗi 401
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;