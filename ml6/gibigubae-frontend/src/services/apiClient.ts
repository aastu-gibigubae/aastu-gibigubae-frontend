import axios from 'axios';
import { useAuthStore } from '@store/authStore';
import { refresh as refreshSession } from './authApi';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Queues concurrent 401s behind a single in-flight refresh instead of firing
// one refresh request per failed call.
let refreshInFlight: Promise<string | null> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (response?.status !== 401 || config._retried) {
      return Promise.reject(error);
    }
    config._retried = true;

    refreshInFlight ??= refreshSession()
      .then((session) => {
        useAuthStore.getState().setSession(session);
        return session.accessToken;
      })
      .catch(() => {
        useAuthStore.getState().clearSession();
        return null;
      })
      .finally(() => {
        refreshInFlight = null;
      });

    const newAccessToken = await refreshInFlight;
    if (!newAccessToken) {
      return Promise.reject(error);
    }

    config.headers.Authorization = `Bearer ${newAccessToken}`;
    return apiClient(config);
  },
);
