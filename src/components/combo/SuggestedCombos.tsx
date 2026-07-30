'use client'

import Image from 'next/image'
import { priceNewOf, type ComboCampaign } from '@/data/comboData'
import { computeComboPricing, type ComboSelections } from '@/lib/comboStore'
import { formatCurrency } from '@/lib/currency'

const TIERS = [
  { key: 'budget', label: 'Budget Combo', accent: '#0f766e', tint: '#ecfdf5' },
  { key: 'premium', label: 'Premium Combo', accent: '#bd2026', tint: '#fdecec' },
] as const

function buildPresetSelections(campaign: ComboCampaign, pick: 'cheapest' | 'priciest'): ComboSelections {
  const sel: ComboSelections = {}
  for (const group of campaign.groups) {
    if (group.products.length === 0) continue
    const sorted = [...group.products].sort((a, b) => priceNewOf(a) - priceNewOf(b))
    sel[group.key] = [pick === 'cheapest' ? sorted[0] : sorted[sorted.length - 1]]
  }
  return sel
}

export default function SuggestedCombos({
  campaign,
  onEdit,
  onAddToCart,
}: {
  campaign: ComboCampaign
  onEdit: (selections: ComboSelections) => void
  onAddToCart: (selections: ComboSelections) => void
}) {
  const nonEmptyGroups = campaign.groups.filter((g) => g.products.length > 0)
  const missingRequired = campaign.groups.some((g) => g.required && g.products.length === 0)
  if (nonEmptyGroups.length < 2 || missingRequired) return null

  const rawPresets = [
    { ...TIERS[0], selections: buildPresetSelections(campaign, 'cheapest') },
    { ...TIERS[1], selections: buildPresetSelections(campaign, 'priciest') },
  ]

  const seenSignatures = new Set<string>()
  const presets = rawPresets.filter((preset) => {
    const products = campaign.groups.flatMap((g) => preset.selections[g.key] ?? [])
    const signature = products.map((p) => p.id).sort().join('|')
    if (seenSignatures.has(signature)) return false
    seenSignatures.add(signature)
    return true
  })

  if (presets.length === 0) return null

  return (
    <div className="mb-5">
      <h2 className="text-[13px] font-bold text-gray-500 uppercase tracking-wide mb-3">Suggested Combos</h2>
      <div className="flex flex-wrap gap-3">
        {presets.map((preset) => {
          const pricing = computeComboPricing(campaign, preset.selections)
          const products = campaign.groups.flatMap((g) => preset.selections[g.key] ?? [])

          return (
            <div
              key={preset.key}
              className="flex-1 min-w-[260px] rounded-2xl border border-gray-100 p-4"
              style={{ backgroundColor: preset.tint }}
            >
              <span
                className="inline-block text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full text-white mb-3"
                style={{ backgroundColor: preset.accent }}
              >
                {preset.label}
              </span>

              <div className="flex items-center gap-2 flex-wrap mb-4">
                {products.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-2">
                    {i > 0 && (
                      <span className="mi text-[26px] shrink-0" style={{ color: preset.accent }}>
                        add
                      </span>
                    )}
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-white border border-gray-200 overflow-hidden relative">
                      {p.image && <Image src={p.image} alt="" fill className="object-contain p-1" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-black/5">
                <div className="leading-tight min-w-0">
                  <p className="text-[11px] text-gray-400 line-through m-0">{formatCurrency(pricing.regularTotal)}</p>
                  <p className="text-[16px] font-bold m-0 truncate" style={{ color: preset.accent }}>
                    {formatCurrency(pricing.total)}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    title="Customize this combo"
                    onClick={() => onEdit(preset.selections)}
                    className="w-9 h-9 shrink-0 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
                  >
                    <span className="mi text-[17px]">edit</span>
                  </button>
                  <button
                    type="button"
                    title="Add this combo to cart"
                    onClick={() => onAddToCart(preset.selections)}
                    className="w-9 h-9 shrink-0 rounded-full text-white flex items-center justify-center transition-colors cursor-pointer"
                    style={{ backgroundColor: preset.accent }}
                  >
                    <span className="mi text-[17px]">shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
