'use client'

import { useEffect, useState } from 'react'

export type PromoSlide = {
  id: string
  label: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  image: string
}

export type PromoBannerDB = {
  left: PromoSlide[]
  right: PromoSlide[]
}

export type PromoSide = keyof PromoBannerDB

const DB_KEY = 'monarch_promo_banner'
const VERSION_KEY = 'monarch_promo_banner_seed_version'
const CHANNEL_NAME = 'monarch-promo-banner-sync'
const LOCAL_EVENT = 'monarch-promo-banner-local-change'

// Bump this whenever seedDB() gains new default slides, so browsers that already
// seeded an older DB automatically pick up the new products (merged in by image
// path) instead of being stuck on whatever was saved on their first visit.
const SEED_VERSION = 2

let channel: BroadcastChannel | null = null
function getChannel(): BroadcastChannel | null {
  if (typeof window === 'undefined') return null
  if (!channel) channel = new BroadcastChannel(CHANNEL_NAME)
  return channel
}

function makeId() {
  return `slide-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function seedDB(): PromoBannerDB {
  return {
    left: [
      {
        id: makeId(),
        label: 'Gaming Controller',
        title: 'ONIKUMA C1',
        subtitle: 'Dual-Mode Six-Axis Gyroscope',
        buttonText: 'Buy',
        buttonLink: '/laptop',
        image: '/images/promo-banner/onikuma-c1.png',
      },
      {
        id: makeId(),
        label: 'Corsair Hydro Series',
        title: 'H105 CPU COOLER',
        subtitle: '240mm Radiator Liquid Cooling',
        buttonText: 'Buy',
        buttonLink: '/component',
        image: '/images/promo-banner/h105-cpu-cooler.png',
      },
    ],
    right: [
      {
        id: makeId(),
        label: 'Manli Gallardo GeForce',
        title: 'RTX 5090 OC',
        subtitle: '32GB GDDR7',
        buttonText: 'Buy',
        buttonLink: '/desktops',
        image: '/images/promo-banner/rtx-5090-oc.png',
      },
      {
        id: makeId(),
        label: 'Aorus Graphics Card',
        title: 'RTX 5090 XTREME',
        subtitle: '32GB GDDR7 RGB Fusion',
        buttonText: 'Buy',
        buttonLink: '/component',
        image: '/images/promo-banner/rtx-5090-graphics-card.png',
      },
    ],
  }
}

function mergeNewSeedSlides(side: PromoSide, existing: PromoSlide[]): PromoSlide[] {
  const existingImages = new Set(existing.map((s) => s.image))
  const missing = seedDB()[side].filter((s) => !existingImages.has(s.image))
  return [...existing, ...missing]
}

function readDB(): PromoBannerDB {
  if (typeof window === 'undefined') return { left: [], right: [] }
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (!raw) {
      const seeded = seedDB()
      localStorage.setItem(DB_KEY, JSON.stringify(seeded))
      localStorage.setItem(VERSION_KEY, String(SEED_VERSION))
      return seeded
    }
    const parsed = JSON.parse(raw) as PromoBannerDB
    if (!parsed.left || !parsed.right) return seedDB()

    const storedVersion = Number(localStorage.getItem(VERSION_KEY) ?? '1')
    if (storedVersion < SEED_VERSION) {
      const migrated: PromoBannerDB = {
        left: mergeNewSeedSlides('left', parsed.left),
        right: mergeNewSeedSlides('right', parsed.right),
      }
      localStorage.setItem(DB_KEY, JSON.stringify(migrated))
      localStorage.setItem(VERSION_KEY, String(SEED_VERSION))
      return migrated
    }

    return parsed
  } catch {
    return seedDB()
  }
}

function writeDB(db: PromoBannerDB) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
  getChannel()?.postMessage({ kind: 'db' })
  window.dispatchEvent(new Event(LOCAL_EVENT))
}

export function usePromoBannerStore(): PromoBannerDB {
  const [db, setDb] = useState<PromoBannerDB>({ left: [], right: [] })

  useEffect(() => {
    setDb(readDB())
    const refresh = () => setDb(readDB())
    const ch = getChannel()
    const onMessage = (e: MessageEvent<{ kind: string }>) => {
      if (e.data?.kind === 'db') refresh()
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === DB_KEY) refresh()
    }
    ch?.addEventListener('message', onMessage)
    window.addEventListener(LOCAL_EVENT, refresh)
    window.addEventListener('storage', onStorage)
    return () => {
      ch?.removeEventListener('message', onMessage)
      window.removeEventListener(LOCAL_EVENT, refresh)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return db
}

export function addSlide(side: PromoSide) {
  const db = readDB()
  const slide: PromoSlide = {
    id: makeId(),
    label: 'Category',
    title: 'Product Name',
    subtitle: 'Short description',
    buttonText: 'Buy',
    buttonLink: '/',
    image: '',
  }
  db[side] = [...db[side], slide]
  writeDB(db)
  return slide
}

export function updateSlide(side: PromoSide, slideId: string, patch: Partial<Omit<PromoSlide, 'id'>>) {
  const db = readDB()
  db[side] = db[side].map((s) => (s.id === slideId ? { ...s, ...patch } : s))
  writeDB(db)
}

export function removeSlide(side: PromoSide, slideId: string) {
  const db = readDB()
  db[side] = db[side].filter((s) => s.id !== slideId)
  writeDB(db)
}

export function reorderSlide(side: PromoSide, slideId: string, direction: -1 | 1) {
  const db = readDB()
  const list = [...db[side]]
  const index = list.findIndex((s) => s.id === slideId)
  const target = index + direction
  if (index === -1 || target < 0 || target >= list.length) return
  ;[list[index], list[target]] = [list[target], list[index]]
  db[side] = list
  writeDB(db)
}
