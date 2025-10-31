/**
 * API client for backend communication
 */
import axios, { AxiosInstance } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class APIClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: `${API_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // For JWT cookies
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('access_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        
        // Handle 401 errors and refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          
          try {
            const response = await axios.post(
              `${API_URL}/api/auth/refresh/`,
              {},
              { withCredentials: true }
            )
            const { access } = response.data
            localStorage.setItem('access_token', access)
            
            originalRequest.headers.Authorization = `Bearer ${access}`
            return this.client(originalRequest)
          } catch (refreshError) {
            // Refresh failed, redirect to login
            localStorage.removeItem('access_token')
            window.location.href = '/login'
            return Promise.reject(refreshError)
          }
        }
        
        return Promise.reject(error)
      }
    )
  }

  get instance() {
    return this.client
  }
}

export const apiClient = new APIClient().instance

// Auth endpoints
export const authApi = {
  register: (data: any) => apiClient.post('/auth/register/', data),
  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login/', data),
  logout: () => apiClient.post('/auth/logout/'),
  me: () => apiClient.get('/me/'),
  changePassword: (data: any) => apiClient.post('/me/change-password/', data),
}

// Application endpoints
export const applicationsApi = {
  list: (params?: any) => apiClient.get('/applications/', { params }),
  get: (id: string) => apiClient.get(`/applications/${id}/`),
  create: (data: any) => apiClient.post('/applications/', data),
  update: (id: string, data: any) => apiClient.patch(`/applications/${id}/`, data),
  updateStatus: (id: string, data: any) =>
    apiClient.patch(`/applications/${id}/update_status/`, data),
  types: () => apiClient.get('/applications/types/'),
}

// Document endpoints
export const documentsApi = {
  list: (params?: any) => apiClient.get('/documents/', { params }),
  get: (id: string) => apiClient.get(`/documents/${id}/`),
  create: (data: any) => apiClient.post('/documents/', data),
  presign: (data: any) => apiClient.post('/documents/uploads/presign/', data),
  review: (id: string, data: any) =>
    apiClient.patch(`/documents/${id}/review/`, data),
  types: () => apiClient.get('/documents/types/'),
}

// Booking endpoints
export const bookingsApi = {
  list: (params?: any) => apiClient.get('/bookings/', { params }),
  get: (id: string) => apiClient.get(`/bookings/${id}/`),
  create: (data: any) => apiClient.post('/bookings/', data),
  availability: (params?: any) => apiClient.get('/bookings/availability/', { params }),
}

// Billing endpoints
export const billingApi = {
  invoices: (params?: any) => apiClient.get('/billing/invoices/', { params }),
  payments: (params?: any) => apiClient.get('/billing/payments/', { params }),
}

// Communications endpoints
export const communicationsApi = {
  messages: (params?: any) => apiClient.get('/communications/messages/', { params }),
  notifications: (params?: any) => apiClient.get('/communications/notifications/', { params }),
}

// Content endpoints
export const contentApi = {
  blog: (params?: any) => apiClient.get('/content/blog/', { params }),
  blogPost: (slug: string) => apiClient.get(`/content/blog/${slug}/`),
}

