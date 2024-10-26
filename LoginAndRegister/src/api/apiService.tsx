import axios, { AxiosResponse } from 'axios';

const baseURL = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: baseURL,
  });
  
  // Agregar un interceptor para añadir el token de autorización
apiClient.interceptors.request.use(
(config) => {
    // Obtén el token de autorización de donde lo estés almacenando (localStorage, context, etc.)
    const token = localStorage.getItem('token'); // Cambia esto según cómo almacenes el token
    if (token) {
    // Si hay un token, agrégalo a los encabezados de la solicitud
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    },
    (error) => {
      // Manejar errores de solicitud
      return Promise.reject(error);
    }
  );


const apiService = {
  async get<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.get(`${baseURL}${endpoint}`);
    return response.data; // Devuelve solo los datos
  }
};

export default apiService;