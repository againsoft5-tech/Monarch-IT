'use client'

import { useEffect, useState } from 'react'
import { DEFAULT_CAMPAIGNS, priceNewOf, type ComboCampaign, type ComboGroup, type ComboProduct } from '@/data/comboData'
import { categoryProductsMap } from '@/data/categoryProducts'

type ComboDB = Record<string, ComboCampaign>

const DB_KEY = 'monarch_combo_campaigns'
const CHANNEL_NAME = 'monarch-combo-sync'
const LOCAL_EVENT = 'monarch-combo-local-change'

let channel: BroadcastChannel | null = null
function getChannel(): BroadcastChannel | null {
  if (typeof window === 'undefined') return null
  if (!channel) channel = new BroadcastChannel(CHANNEL_NAME)
  return channel
}

function makeId(prefix: string) {
  const rand = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
  return `${prefix}-${rand}`
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function nowIso() {
  return new Date().toISOString()
}

function seedDB(): ComboDB {
  const db: ComboDB = {}
  for (const c of DEFAULT_CAMPAIGNS) db[c.id] = c
  return db
}

function readDB(): ComboDB {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (!raw) {
      const seeded = seedDB()
      localStorage.setItem(DB_KEY, JSON.stringify(seeded))
      return seeded
    }
    return JSON.parse(raw) as ComboDB
  } catch {
    return {}
  }
}

function writeDB(db: ComboDB) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
  getChannel()?.postMessage({ kind: 'db' })
  window.dispatchEvent(new Event(LOCAL_EVENT))
}

export function useComboStore() {
  const [db, setDb] = useState<ComboDB>({})

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

export function getCampaign(campaignId: string): ComboCampaign | undefined {
  return readDB()[campaignId]
}

export function createCampaign(name: string): ComboCampaign {
  const db = readDB()
  const baseId = slugify(name) || 'campaign'
  let id = baseId
  let n = 2
  while (db[id]) {
    id = `${baseId}-${n}`
    n += 1
  }
  const campaign: ComboCampaign = {
    id,
    name,
    active: false,
    themeColor: '#c3272b',
    groups: [],
    bonusTiers: [],
    createdAt: nowIso(),
    updatedAt: nowIso(),
  }
  db[id] = campaign
  writeDB(db)
  return campaign
}

export function deleteCampaign(campaignId: string) {
  const db = readDB()
  delete db[campaignId]
  writeDB(db)
}

export function duplicateCampaign(campaignId: string): ComboCampaign | undefined {
  const db = readDB()
  const source = db[campaignId]
  if (!source) return undefined
  let id = `${source.id}-copy`
  let n = 2
  while (db[id]) {
    id = `${source.id}-copy-${n}`
    n += 1
  }
  const copy: ComboCampaign = {
    ...source,
    id,
    name: `${source.name} (Copy)`,
    active: false,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  }
  db[id] = copy
  writeDB(db)
  return copy
}

function updateCampaign(campaignId: string, updater: (campaign: ComboCampaign) => ComboCampaign) {
  const db = readDB()
  const campaign = db[campaignId]
  if (!campaign) return
  db[campaignId] = { ...updater(campaign), updatedAt: nowIso() }
  writeDB(db)
}

export function updateCampaignMeta(
  campaignId: string,
  meta: Partial<Pick<ComboCampaign, 'name' | 'startDate' | 'endDate' | 'themeColor' | 'bannerImage'>>
) {
  updateCampaign(campaignId, (c) => ({ ...c, ...meta }))
}

export function setCampaignStatus(campaignId: string, active: boolean) {
  updateCampaign(campaignId, (c) => ({ ...c, active }))
}

export function updateBonusTiers(campaignId: string, bonusTiers: ComboCampaign['bonusTiers']) {
  updateCampaign(campaignId, (c) => ({
    ...c,
    bonusTiers: [...bonusTiers].sort((a, b) => a.minGroups - b.minGroups),
  }))
}

export function addGroup(campaignId: string, label: string) {
  updateCampaign(campaignId, (c) => {
    const baseKey = slugify(label) || 'group'
    let key = baseKey
    let n = 2
    while (c.groups.some((g) => g.key === key)) {
      key = `${baseKey}-${n}`
      n += 1
    }
    const group: ComboGroup = { key, label, required: false, maxQuantity: 1, products: [] }
    return { ...c, groups: [...c.groups, group] }
  })
}

export function updateGroup(campaignId: string, groupKey: string, patch: Partial<Omit<ComboGroup, 'key' | 'products'>>) {
  updateCampaign(campaignId, (c) => ({
    ...c,
    groups: c.groups.map((g) => (g.key === groupKey ? { ...g, ...patch } : g)),
  }))
}

export function deleteGroup(campaignId: string, groupKey: string) {
  updateCampaign(campaignId, (c) => ({
    ...c,
    groups: c.groups.filter((g) => g.key !== groupKey),
  }))
}

export function addProduct(campaignId: string, groupKey: string, product: Omit<ComboProduct, 'id'>) {
  updateCampaign(campaignId, (c) => ({
    ...c,
    groups: c.groups.map((g) =>
      g.key === groupKey ? { ...g, products: [...g.products, { ...product, id: makeId(groupKey) }] } : g
    ),
  }))
}

export function updateProduct(campaignId: string, groupKey: string, productId: string, patch: Partial<ComboProduct>) {
  updateCampaign(campaignId, (c) => ({
    ...c,
    groups: c.groups.map((g) =>
      g.key === groupKey
        ? { ...g, products: g.products.map((p) => (p.id === productId ? { ...p, ...patch } : p)) }
        : g
    ),
  }))
}

export function removeProduct(campaignId: string, groupKey: string, productId: string) {
  updateCampaign(campaignId, (c) => ({
    ...c,
    groups: c.groups.map((g) =>
      g.key === groupKey ? { ...g, products: g.products.filter((p) => p.id !== productId) } : g
    ),
  }))
}

export function importCategoryIntoGroup(campaignId: string, groupKey: string, categorySlug: string) {
  const catalog = categoryProductsMap[categorySlug]
  if (!catalog) return
  updateCampaign(campaignId, (c) => ({
    ...c,
    groups: c.groups.map((g) => {
      if (g.key !== groupKey) return g
      const existingIds = new Set(g.products.map((p) => p.id))
      const imported: ComboProduct[] = catalog.products
        .filter((p) => !existingIds.has(`${groupKey}-${p.slug}`))
        .map((p) => ({
          id: `${groupKey}-${p.slug}`,
          name: p.name,
          image: p.image,
          brand: p.name.split(' ')[0],
          priceOld: p.priceOld,
          discountType: 'fixed' as const,
          discountValue: Math.max(0, p.priceOld - p.priceNew),
        }))
      return { ...g, products: [...g.products, ...imported] }
    }),
  }))
}

export type ComboSelections = Record<string, ComboProduct[]>

export type ComboPricing = {
  subtotal: number
  regularTotal: number
  productDiscount: number
  comboBonus: number
  total: number
  unlockedGroups: number
}

export function computeComboPricing(campaign: ComboCampaign, selections: ComboSelections): ComboPricing {
  let subtotal = 0
  let regularTotal = 0
  let unlockedGroups = 0

  for (const group of campaign.groups) {
    const items = selections[group.key] ?? []
    if (items.length === 0) continue
    unlockedGroups += 1
    for (const product of items) {
      subtotal += priceNewOf(product)
      regularTotal += product.priceOld
    }
  }

  const productDiscount = regularTotal - subtotal

  let comboBonus = 0
  for (const tier of campaign.bonusTiers) {
    if (unlockedGroups >= tier.minGroups) comboBonus = Math.max(comboBonus, tier.bonusAmount)
  }
  if (subtotal === 0) comboBonus = 0

  const total = Math.max(0, subtotal - comboBonus)

  return { subtotal, regularTotal, productDiscount, comboBonus, total, unlockedGroups }
}
