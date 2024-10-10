import axios, { AxiosInstance } from 'axios';

/**
 * URL de base de l'API
 */
const baseURL = 'https://api.openai.com/v1';

/**
 * Clé d'API correspondant à l'application cliente
 */
const apiKey = process.env.OPENAI_API_KEY;

/**
 * Instance d'axios avec l'URL de base de l'API OpenAI
 */
export const OpenaiAPI: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: 'Bearer ' + apiKey,
  },
});
