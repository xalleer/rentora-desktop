import axios from 'axios'

export default defineNuxtPlugin(() => {
  const token = useCookie('token')

  const api = axios.create({
    baseURL: '/api/server',
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  api.interceptors.request.use((config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  })

  api.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn('Unauthorized')
      }
      return Promise.reject(error.response?.data || error)
    }
  )

  return {
    provide: { api }
  }
})
