'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { initialCartItems, type CartItem } from '@/data/cart'

type CartContextType = {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  removeItem: (id: string) => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialCartItems)
  const [isOpen, setIsOpen] = useState(false)

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const { itemCount, subtotal } = useMemo(
    () => ({
      itemCount: items.reduce((sum, item) => sum + item.qty, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.qty, 0),
    }),
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        removeItem,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
