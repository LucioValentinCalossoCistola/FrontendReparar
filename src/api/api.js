import axios from 'axios';
import { getAuth } from 'firebase/auth';

const API_URL = 'http://10.0.2.2:8000/api'; // Cambia por tu backend

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.warn('No token available', e.message);
  }
  return config;
});

export default api;
