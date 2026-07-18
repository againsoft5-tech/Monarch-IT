'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type AdminAuthContextType = {
  isAdminLoggedIn: boolean
  adminChecked: boolean
  loginAdmin: (email: string, password: string) => boolean
  logoutAdmin: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)
const STORAGE_KEY = 'monarch_admin_logged_in'

export const ADMIN_EMAIL = 'admin@monarchit.com'
export const ADMIN_PASSWORD = 'admin123'

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminChecked, setAdminChecked] = useState(false)

  useEffect(() => {
    setIsAdminLoggedIn(localStorage.getItem(STORAGE_KEY) === '1')
    setAdminChecked(true)
  }, [])

  const loginAdmin = (email: string, password: string) => {
    const ok = email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD
    if (ok) {
      localStorage.setItem(STORAGE_KEY, '1')
      setIsAdminLoggedIn(true)
    }
    return ok
  }

  const logoutAdmin = () => {
    localStorage.removeItem(STORAGE_KEY)
    setIsAdminLoggedIn(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, adminChecked, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
