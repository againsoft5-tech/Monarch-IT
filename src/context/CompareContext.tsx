'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CompareProduct } from '@/data/compareProducts'

const SLOT_COUNT = 3

type CompareContextType = {
  slots: (CompareProduct | null)[]
  count: number
  setSlot: (index: number, product: CompareProduct | null) => void
  reset: () => void
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [slots, setSlots] = useState<(CompareProduct | null)[]>(Array(SLOT_COUNT).fill(null))

  const setSlot = (index: number, product: CompareProduct | null) => {
    setSlots((prev) => prev.map((s, i) => (i === index ? product : s)))
  }

  const reset = () => setSlots(Array(SLOT_COUNT).fill(null))

  const count = useMemo(() => slots.filter(Boolean).length, [slots])

  return (
    <CompareContext.Provider value={{ slots, count, setSlot, reset }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}
