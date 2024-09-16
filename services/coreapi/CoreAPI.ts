//import 'server-only';
import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from '../auth/tokens';
import refreshTokens from '../auth/refreshTokens';

/**
 * URL de base de l'API
 */
const baseURL = process.env.LEARNYLIB_API_URL;

/**
 * Clé d'API correspondant à l'application cliente
 */
const apiKey = process.env.LEARNYLIB_API_KEY;

/**
 * Instance d'axios avec l'URL de base de l'API LearnyLib Core
 * et la clé d'API correspondant à l'application cliente
 */
const CoreAPI: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'x-api-key': apiKey,
  },
});

/**
 * Intercepteur de requête pour ajouter l'access token à chaque requête afin d'authentifier l'utilisateur
 */
CoreAPI.interceptors.request.use(
  async (config) => {
    console.log(
      'Core API request:',
      config?.method?.toUpperCase(),
      config?.url,
    );

    const accessToken = await getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

/**
 * Intercepteur de réponse pour gérer les erreurs 401 et rafraîchir le token
 */
CoreAPI.interceptors.response.use(
  (response) => {
    // Si la réponse est réussie, retournez-la simplement sans modifications
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      // Marquer la requête originale comme réessayée
      originalRequest._retry = true;

      try {
        // Appel de la fonction refreshToken asynchrone pour obtenir un nouveau token
        const tokens = await refreshTokens();

        // Mettre à jour le header Authorization avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

        // Renvoyer la requête avec le nouveau token
        return CoreAPI(originalRequest);
      } catch (refreshError) {
        // Gérer l'erreur de rafraîchissement de token, par exemple en déconnectant l'utilisateur
        return Promise.reject(refreshError);
      }
    }

    // Pour les autres types d'erreurs, les transmettre
    return Promise.reject(error);
  },
);

export default CoreAPI;
