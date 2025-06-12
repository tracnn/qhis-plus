import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AdminProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  avatar?: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: AdminProfile[];
}

export const useAdminProfile = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('access_token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get<ApiResponse>('/admin/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.data && response.data.data.length > 0) {
        setProfile(response.data.data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, refetch: fetchProfile };
}; 