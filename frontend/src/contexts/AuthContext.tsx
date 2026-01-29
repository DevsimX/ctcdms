'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { login as apiLogin, type LoginPayload } from '@/lib/api/auth'

interface User {
  username: string
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const ACCESS_KEY = 'access_token'
const REFRESH_KEY = 'refresh_token'
const USER_KEY = 'user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const loadStored = useCallback(() => {
    if (typeof window === 'undefined') return
    const access = localStorage.getItem(ACCESS_KEY)
    const u = localStorage.getItem(USER_KEY)
    if (access && u) {
      try {
        setUser(JSON.parse(u))
      } catch {
        setUser({ username: 'user' })
      }
    } else {
      setUser(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadStored()
  }, [loadStored])

  const login = useCallback(
    async (payload: LoginPayload) => {
      const { access, refresh } = await apiLogin(payload)
      localStorage.setItem(ACCESS_KEY, access)
      localStorage.setItem(REFRESH_KEY, refresh)
      localStorage.setItem(USER_KEY, JSON.stringify({ username: payload.username }))
      setUser({ username: payload.username })
    },
    []
  )

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
