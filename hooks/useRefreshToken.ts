import axios from '../api/axios';
import { useAuth } from './useAuth';
import { AxiosError } from 'axios';

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get('/auth/refresh', {
        withCredentials: true,
      });
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: response.data.data.accessToken,
          user: response.data.data.user,
        };
      });

      return response.data.data.accessToken;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('ERROR REFRESH: ', error.response?.data);
      }
    }
  };
  return refresh;
};
