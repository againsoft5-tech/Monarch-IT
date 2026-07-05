'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type WishlistContextType = {
  isWished: (id: string) => boolean
  toggleWish: (id: string) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([])

  const isWished = (id: string) => ids.includes(id)

  const toggleWish = (id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return <WishlistContext.Provider value={{ isWished, toggleWish }}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
