'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  customerName: string
  customerEmail: string
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const STORAGE_KEY = 'monarch_is_logged_in'
const NAME_KEY = 'monarch_customer_name'
const EMAIL_KEY = 'monarch_customer_email'

function nameFromEmail(email: string) {
  const local = email.split('@')[0] || 'Guest'
  return local
    .replace(/[._]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem(STORAGE_KEY) === '1')
    setCustomerName(localStorage.getItem(NAME_KEY) || '')
    setCustomerEmail(localStorage.getItem(EMAIL_KEY) || '')
  }, [])

  const login = (email: string) => {
    const cleanEmail = email.trim() || 'guest@monarchit.com'
    const name = nameFromEmail(cleanEmail)
    localStorage.setItem(STORAGE_KEY, '1')
    localStorage.setItem(NAME_KEY, name)
    localStorage.setItem(EMAIL_KEY, cleanEmail)
    setIsLoggedIn(true)
    setCustomerName(name)
    setCustomerEmail(cleanEmail)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(NAME_KEY)
    localStorage.removeItem(EMAIL_KEY)
    setIsLoggedIn(false)
    setCustomerName('')
    setCustomerEmail('')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, customerName, customerEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
