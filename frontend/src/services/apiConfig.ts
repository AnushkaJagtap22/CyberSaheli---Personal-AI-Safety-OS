/**
 * Centralized CyberSaheli Production & Development API Configuration
 * 
 * Ensures single source of truth for FastAPI backend connection
 * and strips trailing slashes to prevent double slashes (e.g. //api/v1/ai).
 */
const getRawApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim();
  }
  return 'http://127.0.0.1:8000';
};

// Ensure API_BASE_URL NEVER ends with a trailing slash
export const API_BASE_URL = getRawApiUrl().replace(/\/+$/, '');

export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
