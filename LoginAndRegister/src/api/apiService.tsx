import axios, { AxiosResponse } from "axios";

const baseURL = "http://localhost:8080";

const apiClient = axios.create({
  baseURL: baseURL,
});

// Agregar un interceptor para añadir el token de autorización
apiClient.interceptors.request.use(
  (config) => {
    // Obtén el token de autorización de donde lo estés almacenando (localStorage, context, etc.)
    const token = sessionStorage.getItem("Token"); // Cambia esto según cómo almacenes el token
    // console.log("Interceptor " + token);
    if (token) {
    console.log("Interceptor " + token);
    if (token && (!config.url.includes('/usuario/registrarse') || !config.url.includes('/usuario/generateToken'))) {
      // Si hay un token, agrégalo a los encabezados de la solicitud
      config.headers.Authorization = `Bearer ${token}`;
     
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    // Manejar errores de solicitud
    return Promise.reject(error);
  }
);


export default apiClient;
