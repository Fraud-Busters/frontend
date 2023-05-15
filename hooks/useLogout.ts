import axios from '../api/axios';
import { useAuth } from './useAuth';

export const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await axios('/auth/logout', {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setAuth({});
    }
  };

  return logout;
};
