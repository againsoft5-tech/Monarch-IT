'use client'

import { useEffect, useMemo, useState } from 'react'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import WarningModal from '@/components/pcbuilder/WarningModal'
import SuccessModal from '@/components/pcbuilder/SuccessModal'
import CategoryTabs from './CategoryTabs'
import ProductGrid from './ProductGrid'
import ComboSummarySidebar from './ComboSummarySidebar'
import SuggestedCombos from './SuggestedCombos'
import { useComboStore, computeComboPricing, type ComboSelections } from '@/lib/comboStore'
import { priceNewOf, type ComboProduct } from '@/data/comboData'
import { useCart } from '@/context/CartContext'
import type { CartItem } from '@/data/cart'
import { formatCurrency } from '@/lib/currency'

export default function ComboBuilderPage({ campaignId }: { campaignId: string }) {
  const db = useComboStore()
  const campaign = db[campaignId]
  const { addItems } = useCart()

  const [activeGroupKey, setActiveGroupKey] = useState<string | null>(null)
  const [selections, setSelections] = useState<ComboSelections>({})
  const [warningMessage, setWarningMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (campaign && !activeGroupKey && campaign.groups.length > 0) setActiveGroupKey(campaign.groups[0].key)
  }, [campaign, activeGroupKey])

  const breadcrumbItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'Combo', href: '/combo' },
      { label: campaign?.name ?? '', href: `/combo/${campaignId}` },
    ],
    [campaign?.name, campaignId]
  )

  if (Object.keys(db).length > 0 && (!campaign || !campaign.active)) {
    notFound()
  }

  if (!campaign) return null

  const activeGroup = campaign.groups.find((g) => g.key === activeGroupKey) ?? campaign.groups[0]
  const pricing = computeComboPricing(campaign, selections)
  const selectedCounts = Object.fromEntries(campaign.groups.map((g) => [g.key, (selections[g.key] ?? []).length]))

  const toggleProduct = (groupKey: string, product: ComboProduct) => {
    const group = campaign.groups.find((g) => g.key === groupKey)
    if (!group) return

    setSelections((prev) => {
      const current = prev[groupKey] ?? []
      const isSelected = current.some((p) => p.id === product.id)

      if (group.maxQuantity <= 1) {
        return { ...prev, [groupKey]: isSelected ? [] : [product] }
      }

      if (isSelected) {
        return { ...prev, [groupKey]: current.filter((p) => p.id !== product.id) }
      }
      if (current.length >= group.maxQuantity) {
        setWarningMessage(`You can select up to ${group.maxQuantity} item(s) from ${group.label}.`)
        return prev
      }
      return { ...prev, [groupKey]: [...current, product] }
    })
  }

  const removeSelection = (groupKey: string, productId: string) => {
    setSelections((prev) => ({ ...prev, [groupKey]: (prev[groupKey] ?? []).filter((p) => p.id !== productId) }))
  }

  const removeAll = () => setSelections({})

  const commitSelectionsToCart = (selectionsToCommit: ComboSelections) => {
    const selectedProducts = campaign.groups.flatMap((g) => selectionsToCommit[g.key] ?? [])
    if (selectedProducts.length === 0) return

    const selectionPricing = computeComboPricing(campaign, selectionsToCommit)

    // Spread the combo bonus proportionally across each item's price so the cart/checkout
    // total exactly matches the "Subtotal" the customer saw in the builder sidebar.
    const basePrices = selectedProducts.map((p) => priceNewOf(p))
    const basePriceTotal = basePrices.reduce((sum, price) => sum + price, 0)
    const bonus = selectionPricing.comboBonus

    const finalPrices = basePrices.map((price) =>
      bonus > 0 && basePriceTotal > 0 ? Math.round(price - (bonus * price) / basePriceTotal) : price
    )
    const roundingRemainder = basePriceTotal - bonus - finalPrices.reduce((sum, price) => sum + price, 0)
    if (finalPrices.length > 0) finalPrices[finalPrices.length - 1] += roundingRemainder

    const cartItems: CartItem[] = selectedProducts.map((p, i) => ({
      id: p.id,
      name: p.name,
      slug: `combo/${campaignId}`,
      image: p.image,
      price: Math.max(0, finalPrices[i]),
      qty: 1,
    }))

    addItems(cartItems)
    const savings = selectionPricing.regularTotal - selectionPricing.total
    setSuccessMessage(
      `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} added to your cart successfully! You saved ${formatCurrency(savings)} on this combo.`
    )
  }

  const addAllToCart = () => {
    const missing = campaign.groups.filter((g) => g.required && !(selections[g.key]?.length))
    if (missing.length > 0) {
      setWarningMessage(`Please select ${missing.map((g) => g.label).join(', ')} before continuing.`)
      return
    }
    commitSelectionsToCart(selections)
  }

  const applyPreset = (preset: ComboSelections) => {
    setSelections(preset)
    setActiveGroupKey(campaign.groups[0]?.key ?? null)
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <section className="bg-[#f5f5f7] min-h-screen py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">{campaign.name}</h1>

          <div className="flex flex-col lg:flex-row gap-5 items-start">
            <ComboSummarySidebar
              campaign={campaign}
              selections={selections}
              pricing={pricing}
              onRemove={removeSelection}
              onRemoveAll={removeAll}
              onAddAllToCart={addAllToCart}
            />

            <div className="flex-1 min-w-0 w-full">
              {campaign.groups.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-[14px]">
                  This combo campaign has no categories configured yet.
                </div>
              ) : (
                <>
                  <SuggestedCombos campaign={campaign} onEdit={applyPreset} onAddToCart={commitSelectionsToCart} />
                  <CategoryTabs
                    groups={campaign.groups}
                    activeKey={activeGroup?.key ?? ''}
                    selectedCounts={selectedCounts}
                    color={campaign.themeColor ?? '#c3272b'}
                    onChange={setActiveGroupKey}
                  />
                  {activeGroup && (
                    <ProductGrid
                      key={activeGroup.key}
                      group={activeGroup}
                      selectedIds={(selections[activeGroup.key] ?? []).map((p) => p.id)}
                      color={campaign.themeColor ?? '#c3272b'}
                      onToggle={(product) => toggleProduct(activeGroup.key, product)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <WarningModal open={!!warningMessage} message={warningMessage ?? ''} onClose={() => setWarningMessage(null)} />
      <SuccessModal open={!!successMessage} message={successMessage ?? ''} onClose={() => setSuccessMessage(null)} />
    </>
  )
}
