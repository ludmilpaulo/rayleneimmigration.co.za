'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '@/lib/api'

interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  is_staff: boolean
  user_roles: Array<{ role: { code: string; name: string } }>
  client_profile?: any
  staff_profile?: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  isAdmin: () => boolean
  isClient: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const response = await authApi.me()
      setUser(response.data)
    } catch (error) {
      setUser(null)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Check if we have a token
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password })
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access)
    }
    await fetchUser()
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      // Ignore logout errors
    }
    localStorage.removeItem('access_token')
    setUser(null)
  }

  const isAdmin = () => {
    if (!user) return false
    return user.is_staff || user.user_roles.some(r => 
      ['ADMIN', 'CONSULTANT', 'FINANCE', 'SUPPORT'].includes(r.role.code)
    )
  }

  const isClient = () => {
    if (!user) return false
    return !isAdmin()
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      refreshUser: fetchUser,
      isAdmin,
      isClient,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

