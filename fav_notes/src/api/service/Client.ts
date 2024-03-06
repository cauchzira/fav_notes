import axios, { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.quotable.io/',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default apiClient
