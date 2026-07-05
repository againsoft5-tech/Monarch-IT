'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const STORAGE_KEY = 'monarch_is_logged_in'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem(STORAGE_KEY) === '1')
  }, [])

  const login = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setIsLoggedIn(false)
  }

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
