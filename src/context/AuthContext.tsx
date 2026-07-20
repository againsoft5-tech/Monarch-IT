'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { accountPoints } from '@/data/accountData'

export const PIN_LENGTH = 4

export type Customer = {
  name: string
  email: string
  phone: string
  identifier: string
  rewardPoints: number
  hasPin: boolean
}

type AuthContextType = {
  isLoggedIn: boolean
  ready: boolean
  customer: Customer | null
  identifier: string | null
  hasPin: boolean
  /** @deprecated use customer?.name */
  customerName: string
  /** @deprecated use customer?.email */
  customerEmail: string
  login: (identifier: string) => void
  logout: () => void
  setPin: (pin: string) => void
  clearPin: () => void
  updateProfile: (patch: { name?: string; phone?: string }) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'monarch_is_logged_in'
const NAME_KEY = 'monarch_customer_name'
const EMAIL_KEY = 'monarch_customer_email'
const PIN_KEY = 'monarch_customer_pin'

function nameFromIdentifier(identifier: string) {
  const local = identifier.split('@')[0] || 'Guest'
  return local
    .replace(/[._]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [customer, setCustomer] = useState<Customer | null>(null)

  useEffect(() => {
    const loggedIn = localStorage.getItem(STORAGE_KEY) === '1'
    if (loggedIn) {
      const identifier = localStorage.getItem(EMAIL_KEY) || 'guest@monarchit.com'
      const name = localStorage.getItem(NAME_KEY) || nameFromIdentifier(identifier)
      const isEmail = identifier.includes('@')
      setCustomer({
        name,
        email: isEmail ? identifier : '',
        phone: isEmail ? '' : identifier,
        identifier,
        rewardPoints: accountPoints.balance,
        hasPin: Boolean(localStorage.getItem(PIN_KEY)),
      })
    }
    setReady(true)
  }, [])

  const login = (identifier: string) => {
    const clean = identifier.trim() || 'guest@monarchit.com'
    const name = nameFromIdentifier(clean)
    const isEmail = clean.includes('@')
    localStorage.setItem(STORAGE_KEY, '1')
    localStorage.setItem(NAME_KEY, name)
    localStorage.setItem(EMAIL_KEY, clean)
    setCustomer({
      name,
      email: isEmail ? clean : '',
      phone: isEmail ? '' : clean,
      identifier: clean,
      rewardPoints: accountPoints.balance,
      hasPin: Boolean(localStorage.getItem(PIN_KEY)),
    })
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(NAME_KEY)
    localStorage.removeItem(EMAIL_KEY)
    setCustomer(null)
  }

  const setPin = (pin: string) => {
    localStorage.setItem(PIN_KEY, pin)
    setCustomer((prev) => (prev ? { ...prev, hasPin: true } : prev))
  }

  const clearPin = () => {
    localStorage.removeItem(PIN_KEY)
    setCustomer((prev) => (prev ? { ...prev, hasPin: false } : prev))
  }

  const updateProfile = (patch: { name?: string; phone?: string }) => {
    if (patch.name) localStorage.setItem(NAME_KEY, patch.name)
    setCustomer((prev) => (prev ? { ...prev, ...patch } : prev))
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: Boolean(customer),
        ready,
        customer,
        identifier: customer?.identifier ?? null,
        hasPin: Boolean(customer?.hasPin),
        customerName: customer?.name ?? '',
        customerEmail: customer?.email ?? '',
        login,
        logout,
        setPin,
        clearPin,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
