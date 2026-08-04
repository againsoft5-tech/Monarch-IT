import type { ProductImage } from '@/data/productDetail'

export type VariantOption = {
  id: string
  label: string
  /** Set on color-style options to render an image swatch instead of a text pill. */
  swatch?: string
  /** Gallery to show when this option is selected (typically only set on the color group). */
  images?: ProductImage[]
}

export type VariantGroup = {
  key: string
  label: string
  options: VariantOption[]
}

export type VariantCombo = {
  /** Must include one entry per variant group key. */
  selection: Record<string, string>
  inStock: boolean
  price?: number
  priceOld?: number
  discountPct?: number
  sku?: string
}

export type VariantOptionState = 'selected' | 'available' | 'disabled'

type Selection = Record<string, string>

/**
 * Whether at least one in-stock combo is consistent with `selection` merged on top of
 * `groupKey: optionId`. Only the groups already present in `selection` are constrained,
 * so this doubles as the "is this option pickable right now" check for every other group.
 */
function isReachable(combos: VariantCombo[], selection: Selection, groupKey: string, optionId: string): boolean {
  const trial: Selection = { ...selection, [groupKey]: optionId }
  return combos.some((combo) => combo.inStock && Object.entries(trial).every(([k, v]) => combo.selection[k] === v))
}

export function getOptionState(
  combos: VariantCombo[],
  selection: Selection,
  groupKey: string,
  optionId: string
): VariantOptionState {
  if (selection[groupKey] === optionId) return 'selected'
  return isReachable(combos, selection, groupKey, optionId) ? 'available' : 'disabled'
}

export function findCombo(combos: VariantCombo[], selection: Selection): VariantCombo | undefined {
  return combos.find(
    (combo) =>
      combo.inStock &&
      Object.keys(combo.selection).every((k) => combo.selection[k] === selection[k]) &&
      Object.keys(selection).every((k) => selection[k] === combo.selection[k])
  )
}

/**
 * Applies a user pick for `groupKey`, then cascades through the remaining groups so the
 * result always lands on a fully valid (in-stock) combination when one exists — any group
 * whose current pick is no longer reachable falls back to its first available option.
 */
export function applySelection(
  groups: VariantGroup[],
  combos: VariantCombo[],
  selection: Selection,
  groupKey: string,
  optionId: string
): Selection {
  const next: Selection = { ...selection, [groupKey]: optionId }

  for (const group of groups) {
    if (group.key === groupKey) continue
    const current = next[group.key]
    const currentStillValid = current != null && isReachable(combos, next, group.key, current)
    if (currentStillValid) continue

    const fallback = group.options.find((opt) => isReachable(combos, next, group.key, opt.id))
    if (fallback) next[group.key] = fallback.id
  }

  return next
}

export function defaultSelection(groups: VariantGroup[], combos: VariantCombo[]): Selection {
  const firstInStock = combos.find((c) => c.inStock)
  if (firstInStock) return { ...firstInStock.selection }
  const fallback: Selection = {}
  for (const group of groups) {
    if (group.options[0]) fallback[group.key] = group.options[0].id
  }
  return fallback
}

export function resolveGalleryImages(
  groups: VariantGroup[],
  selection: Selection,
  fallback: ProductImage[]
): ProductImage[] {
  for (const group of groups) {
    const picked = group.options.find((opt) => opt.id === selection[group.key])
    if (picked?.images && picked.images.length > 0) return picked.images
  }
  return fallback
}
