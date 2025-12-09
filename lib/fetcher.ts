import axios, { AxiosRequestConfig, Method } from "axios"
import { API_URL } from "./enviroments"

axios.defaults.baseURL = API_URL

/**
 * Fetcher para cualquier método HTTP usando Axios.
 * * @param method - El método HTTP a utilizar ('get', 'post', 'put', 'delete', etc.).
 * @param url - La URL del endpoint.
 * @param options - Configuración adicional para la solicitud de Axios,
 * @returns Los datos de la respuesta de axios.
 */
export const fetcher = async <T>(
  method: Method,
  url: string,
  options?: AxiosRequestConfig
) => {
  const httpMethod = method.toLowerCase() as Method

  const res = await axios({
    method: httpMethod,
    url: url,
    ...options,
  })

  return res.data as T
}
