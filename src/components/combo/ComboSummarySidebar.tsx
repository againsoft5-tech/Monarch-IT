'use client'

import Image from 'next/image'
import type { ComboCampaign } from '@/data/comboData'
import { priceNewOf } from '@/data/comboData'
import { formatCurrency } from '@/lib/currency'
import type { ComboSelections, ComboPricing } from '@/lib/comboStore'

type Props = {
  campaign: ComboCampaign
  selections: ComboSelections
  pricing: ComboPricing
  onRemove: (groupKey: string, productId: string) => void
  onRemoveAll: () => void
  onAddAllToCart: () => void
}

export default function ComboSummarySidebar({ campaign, selections, pricing, onRemove, onRemoveAll, onAddAllToCart }: Props) {
  const color = campaign.themeColor ?? '#c3272b'
  const hasAnySelection = pricing.subtotal > 0
  const canAddToCart = pricing.unlockedGroups >= 2

  return (
    <aside className="w-full lg:w-[300px] shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-fit lg:sticky lg:top-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[15px] font-bold text-gray-900 m-0">Combo Summary</h2>
      </div>
      <p className="text-[11.5px] text-gray-400 mb-4">*Choose two or more categories to unlock combo savings</p>

      <div className="space-y-3 mb-4">
        {campaign.groups.map((group) => {
          const items = selections[group.key] ?? []
          const maxDiscount = Math.max(0, ...group.products.map((p) => p.priceOld - priceNewOf(p)), 0)

          return (
            <div key={group.key} className="border-b border-gray-50 pb-3 last:border-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className={`text-[12.5px] font-semibold ${group.required ? 'text-[#bd2026]' : 'text-gray-700'}`}>
                  {group.label}
                </span>
                {group.required && <span className="text-[10px] text-[#bd2026]">*Required</span>}
              </div>

              {items.length === 0 ? (
                <p className="text-[11.5px] text-[#0f766e] m-0">
                  {maxDiscount > 0 ? `Up to ${formatCurrency(maxDiscount)} off your selected ${group.label}` : `Select a ${group.label}`}
                </p>
              ) : (
                <div className="space-y-2">
                  {items.map((p) => (
                    <div key={p.id} className="flex items-center gap-2">
                      <div className="w-8 h-8 shrink-0 rounded-lg bg-[#f4f5f7] relative overflow-hidden">
                        <Image src={p.image} alt="" fill sizes="32px" className="object-contain p-1" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11.5px] text-gray-700 m-0 truncate" title={p.name}>
                          {p.name}
                        </p>
                        <p className="text-[11.5px] font-semibold text-gray-900 m-0">{formatCurrency(priceNewOf(p))}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(group.key, p.id)}
                        title="Remove"
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-[#bd2026] hover:bg-red-50 cursor-pointer"
                      >
                        <span className="mi text-[15px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="space-y-1.5 border-t border-gray-100 pt-3 mb-4">
        {pricing.productDiscount > 0 && (
          <div className="flex items-center justify-between text-[12.5px] text-gray-500">
            <span>Regular Price</span>
            <span className="line-through">{formatCurrency(pricing.regularTotal)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-[12.5px] text-[#10b981] font-semibold">
          <span>Combo Up Savings</span>
          <span>{formatCurrency(pricing.comboBonus)}</span>
        </div>
        <div className="flex items-center justify-between text-[14px] font-bold text-gray-900 pt-1">
          <span>Subtotal</span>
          <span style={{ color }}>{formatCurrency(pricing.total)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRemoveAll}
          disabled={!hasAnySelection}
          className="flex-1 h-10 rounded-full border border-gray-200 text-[12.5px] font-semibold text-gray-600 disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
        >
          Remove all
        </button>
        <button
          type="button"
          onClick={onAddAllToCart}
          disabled={!canAddToCart}
          title={canAddToCart ? undefined : 'Select at least 2 categories to unlock combo savings'}
          className="flex-1 h-10 rounded-full text-white text-[12.5px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1"
          style={{ backgroundColor: color }}
        >
          Add all to cart
          <span className="mi text-[15px]">shopping_cart</span>
        </button>
      </div>
    </aside>
  )
}
