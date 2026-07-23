'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { initialCartItems, type CartItem } from '@/data/cart'
import { COUPONS } from '@/data/coupons'

const CART_STORAGE_KEY = 'monarchit_cart'

type CouponMessage = { type: 'success' | 'error'; text: string }

type CartContextType = {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  addItems: (newItems: CartItem[]) => void
  itemCount: number
  subtotal: number
  appliedCoupon: string | null
  discount: number
  total: number
  couponMessage: CouponMessage | null
  applyCoupon: (code: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialCartItems)
  const [isOpen, setIsOpen] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponMessage, setCouponMessage] = useState<CouponMessage | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {
      // ignore malformed/unavailable storage
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore quota/unavailable storage errors
    }
  }, [items])

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty } : item)))
  }

  const addItems = (newItems: CartItem[]) => {
    setItems((prev) => {
      const next = [...prev]
      for (const newItem of newItems) {
        const idx = next.findIndex((item) => item.id === newItem.id)
        if (idx >= 0) {
          next[idx] = { ...next[idx], qty: next[idx].qty + newItem.qty }
        } else {
          next.push(newItem)
        }
      }
      return next
    })
  }

  const { itemCount, subtotal } = useMemo(
    () => ({
      itemCount: items.reduce((sum, item) => sum + item.qty, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.qty, 0),
    }),
    [items]
  )

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0
    const coupon = COUPONS.find((c) => c.code === appliedCoupon)
    if (!coupon) return 0
    const amount = coupon.type === 'percent' ? (subtotal * coupon.value) / 100 : coupon.value
    return Math.min(amount, subtotal)
  }, [appliedCoupon, subtotal])

  const total = subtotal - discount

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase()
    if (!normalized) {
      setAppliedCoupon(null)
      setCouponMessage({ type: 'error', text: 'Please enter a promo code!' })
      return
    }

    const coupon = COUPONS.find((c) => c.code === normalized)
    if (!coupon) {
      setAppliedCoupon(null)
      setCouponMessage({ type: 'error', text: 'Please enter a valid promo code!' })
      return
    }

    setAppliedCoupon(coupon.code)
    setCouponMessage({ type: 'success', text: 'Promo code applied successfully!' })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        removeItem,
        updateQty,
        addItems,
        itemCount,
        subtotal,
        appliedCoupon,
        discount,
        total,
        couponMessage,
        applyCoupon,
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
