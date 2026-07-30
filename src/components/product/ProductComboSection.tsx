'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { priceNewOf, discountAmountOf } from '@/data/comboData'
import { useComboStore, computeComboPricing, findBestComboForProductSlug, type ComboSelections } from '@/lib/comboStore'
import { useCart } from '@/context/CartContext'
import type { CartItem } from '@/data/cart'
import { formatCurrency } from '@/lib/currency'
import { useToast, Toast } from '@/components/ui/Toast'

const RED = '#bd2026'

export default function ProductComboSection({ slug }: { slug: string }) {
  const db = useComboStore()
  const { addItems } = useCart()
  const { toast, showToast } = useToast()

  const match = useMemo(() => findBestComboForProductSlug(db, slug), [db, slug])
  const [selected, setSelected] = useState<ComboSelections>({})

  useEffect(() => {
    if (match) setSelected(match.selections)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, match?.campaign.id, match?.ownGroupKey])

  if (!match) return null

  const { campaign, ownGroupKey } = match
  const color = campaign.themeColor ?? RED

  const toggleGroup = (groupKey: string) => {
    if (groupKey === ownGroupKey) return
    setSelected((prev) => {
      const next = { ...prev }
      if (next[groupKey]) delete next[groupKey]
      else next[groupKey] = match.selections[groupKey]
      return next
    })
  }

  const pricing = computeComboPricing(campaign, selected)
  const orderedGroups = [...campaign.groups.filter((g) => match.selections[g.key])].sort((a, b) =>
    a.key === ownGroupKey ? -1 : b.key === ownGroupKey ? 1 : 0
  )
  const selectedCount = orderedGroups.filter((g) => selected[g.key]).length

  const handleAddToCart = () => {
    const selectedProducts = campaign.groups.flatMap((g) => selected[g.key] ?? [])
    if (selectedProducts.length === 0) return

    const basePrices = selectedProducts.map((p) => priceNewOf(p))
    const basePriceTotal = basePrices.reduce((sum, price) => sum + price, 0)
    const bonus = pricing.comboBonus

    const finalPrices = basePrices.map((price) =>
      bonus > 0 && basePriceTotal > 0 ? Math.round(price - (bonus * price) / basePriceTotal) : price
    )
    const roundingRemainder = basePriceTotal - bonus - finalPrices.reduce((sum, price) => sum + price, 0)
    if (finalPrices.length > 0) finalPrices[finalPrices.length - 1] += roundingRemainder

    const cartItems: CartItem[] = selectedProducts.map((p, i) => ({
      id: p.id,
      name: p.name,
      slug: `combo/${campaign.id}`,
      image: p.image,
      price: Math.max(0, finalPrices[i]),
      qty: 1,
    }))

    addItems(cartItems)
    showToast(`${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} added to your cart!`)
  }

  return (
    <div className="container mx-auto px-4 min-[992px]:px-14 py-6">
      <Toast message={toast} />
      <div className="bg-white border-[1.5px] border-gray-100 rounded-[28px] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3.5 flex-wrap" style={{ backgroundColor: color }}>
          <span className="bg-white/20 text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
            Combo Up
          </span>
          <p className="text-white text-[14px] font-semibold m-0">
            Savings up to {formatCurrency(pricing.regularTotal - pricing.total)} &mdash; the more you add, the more you save!
          </p>
          <Link href={`/combo/${campaign.id}`} className="ml-auto text-white text-[12.5px] font-semibold no-underline hover:underline shrink-0">
            Build your own combo &rarr;
          </Link>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 flex-wrap mb-5">
            {orderedGroups.map((group, i) => {
              const product = match.selections[group.key][0]
              const isOwn = group.key === ownGroupKey
              const isChecked = !!selected[group.key]
              return (
                <div key={group.key} className="flex items-start gap-2">
                  {i > 0 && (
                    <div className="w-5 h-14 shrink-0 flex items-center justify-center">
                      <span className="mi text-[26px] shrink-0" style={{ color }}>
                        add
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-14 h-14 shrink-0 rounded-xl bg-[#f4f5f7] border-2 relative overflow-hidden ${!isChecked ? 'opacity-35' : ''}`}
                      style={{ borderColor: isChecked ? color : '#e5e7eb' }}
                    >
                      <Image src={product.image} alt="" fill sizes="56px" className="object-contain p-1.5" />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500">
                      {isOwn ? 'Currently Viewing' : group.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1 min-w-0 space-y-2">
              {orderedGroups.map((group) => {
                const product = match.selections[group.key][0]
                const isOwn = group.key === ownGroupKey
                const isChecked = !!selected[group.key]
                const discount = discountAmountOf(product)
                return (
                  <label
                    key={group.key}
                    className={`flex items-center gap-3 border rounded-2xl p-3 transition-colors ${
                      isOwn ? 'cursor-default' : 'cursor-pointer hover:border-gray-300'
                    } ${isChecked ? '' : 'opacity-60'}`}
                    style={isChecked ? { borderColor: color } : { borderColor: '#f3f4f6' }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isOwn}
                      onChange={() => toggleGroup(group.key)}
                      className="shrink-0 w-4 h-4 accent-current"
                      style={{ color }}
                    />
                    <div className="w-11 h-11 shrink-0 rounded-lg bg-[#f4f5f7] relative overflow-hidden">
                      <Image src={product.image} alt="" fill sizes="44px" className="object-contain p-1" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] text-gray-800 font-medium m-0 truncate" title={product.name}>
                        {product.name}
                      </p>
                      {discount > 0 && (
                        <span className="inline-block text-[10.5px] font-semibold text-[#10b981] bg-[#ecfdf5] rounded px-1.5 py-0.5 mt-0.5">
                          Combo Offer -{formatCurrency(discount)}
                        </span>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      {discount > 0 && <p className="text-[11px] text-gray-400 line-through m-0">{formatCurrency(product.priceOld)}</p>}
                      <p className="text-[14px] font-bold text-gray-900 m-0">{formatCurrency(priceNewOf(product))}</p>
                    </div>
                  </label>
                )
              })}
            </div>

            <div className="w-full lg:w-[240px] shrink-0 bg-[#f8fafc] rounded-2xl p-4 h-fit">
              <div className="space-y-1.5 mb-4">
                {pricing.productDiscount > 0 && (
                  <div className="flex items-center justify-between text-[12.5px] text-gray-500">
                    <span>Regular Price</span>
                    <span className="line-through">{formatCurrency(pricing.regularTotal)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-[12.5px] text-[#10b981] font-semibold">
                  <span>Combo Savings</span>
                  <span>{formatCurrency(pricing.comboBonus)}</span>
                </div>
                <div className="flex items-center justify-between text-[14px] font-bold text-gray-900 pt-1">
                  <span>Subtotal</span>
                  <span style={{ color }}>{formatCurrency(pricing.total)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full h-10 rounded-full text-white text-[12.5px] font-semibold cursor-pointer flex items-center justify-center gap-1.5"
                style={{ backgroundColor: color }}
              >
                Add {selectedCount} item{selectedCount !== 1 ? 's' : ''} to cart
                <span className="mi text-[15px]">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
