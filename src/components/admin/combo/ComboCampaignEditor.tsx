'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { useComboStore,
  updateCampaignMeta,
  setCampaignStatus,
  updateBonusTiers,
  addGroup,
  updateGroup,
  deleteGroup,
  addProduct,
  updateProduct,
  removeProduct,
  importCategoryIntoGroup,
} from '@/lib/comboStore'
import { priceNewOf, type DiscountType } from '@/data/comboData'
import { categoryProductsMap } from '@/data/categoryProducts'
import { formatCurrency } from '@/lib/currency'

const RED = '#bd2026'
const TABS = ['Setup', 'Groups', 'Products', 'Bonus & Publish'] as const
type Tab = (typeof TABS)[number]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full h-10 px-3.5 rounded-xl border border-gray-200 outline-none text-[13px] text-gray-800 focus:border-gray-400 transition-colors'

export default function ComboCampaignEditor({ campaignId }: { campaignId: string }) {
  const { isAdminLoggedIn, adminChecked } = useAdminAuth()
  const router = useRouter()
  const db = useComboStore()
  const campaign = db[campaignId]
  const [tab, setTab] = useState<Tab>('Setup')
  const [activeGroupKey, setActiveGroupKey] = useState<string | null>(null)
  const [newGroupLabel, setNewGroupLabel] = useState('')
  const [importCategory, setImportCategory] = useState('')
  const [newProduct, setNewProduct] = useState({ name: '', image: '', brand: '', priceOld: '', discountType: 'fixed' as DiscountType, discountValue: '' })
  const [newTier, setNewTier] = useState({ minGroups: '', bonusAmount: '' })

  useEffect(() => {
    if (adminChecked && !isAdminLoggedIn) router.replace('/admin/login')
  }, [adminChecked, isAdminLoggedIn, router])

  useEffect(() => {
    if (campaign && !activeGroupKey && campaign.groups.length > 0) setActiveGroupKey(campaign.groups[0].key)
  }, [campaign, activeGroupKey])

  const categorySlugs = useMemo(() => Object.keys(categoryProductsMap).sort(), [])

  if (!adminChecked || !isAdminLoggedIn) {
    return <div className="min-h-screen flex items-center justify-center bg-[#eef0f3] text-gray-400 text-[14px]">Loading...</div>
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#eef0f3] text-gray-500 text-[14px]">
        Campaign not found.
        <Link href="/admin/combo" className="text-[#bd2026] font-semibold no-underline">
          Back to campaigns
        </Link>
      </div>
    )
  }

  const activeGroup = campaign.groups.find((g) => g.key === activeGroupKey) ?? campaign.groups[0]

  const handleAddGroup = () => {
    const label = newGroupLabel.trim()
    if (!label) return
    addGroup(campaignId, label)
    setNewGroupLabel('')
  }

  const handleAddProduct = () => {
    if (!activeGroup) return
    const priceOld = Number(newProduct.priceOld)
    const discountValue = Number(newProduct.discountValue) || 0
    if (!newProduct.name.trim() || !priceOld) return
    addProduct(campaignId, activeGroup.key, {
      name: newProduct.name.trim(),
      image: newProduct.image.trim() || '/images/pc-builder/icons/storage-active.svg',
      brand: newProduct.brand.trim() || newProduct.name.trim().split(' ')[0],
      priceOld,
      discountType: newProduct.discountType,
      discountValue,
    })
    setNewProduct({ name: '', image: '', brand: '', priceOld: '', discountType: 'fixed', discountValue: '' })
  }

  const handleAddTier = () => {
    const minGroups = Number(newTier.minGroups)
    const bonusAmount = Number(newTier.bonusAmount)
    if (!minGroups || !bonusAmount) return
    updateBonusTiers(campaignId, [...campaign.bonusTiers, { minGroups, bonusAmount }])
    setNewTier({ minGroups: '', bonusAmount: '' })
  }

  return (
    <div className="min-h-screen bg-[#eef0f3] px-4 py-8 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <Link href="/admin/combo" className="text-[13px] text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 mb-1">
              <span className="mi text-[16px]">arrow_back</span> Campaigns
            </Link>
            <h1 className="text-xl font-bold text-gray-900 m-0">{campaign.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                campaign.active ? 'bg-[#ecfdf5] text-[#10b981]' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {campaign.active ? 'Active' : 'Inactive'}
            </span>
            {campaign.active && (
              <Link
                href={`/combo/${campaign.id}`}
                target="_blank"
                className="h-8 px-4 rounded-full border border-gray-200 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center no-underline"
              >
                View live
              </Link>
            )}
          </div>
        </div>

        <div className="flex bg-white rounded-full p-1 mb-6 shadow-sm border border-gray-100 w-fit">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 h-9 rounded-full text-[12.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                tab === t ? 'text-white' : 'text-gray-600'
              }`}
              style={tab === t ? { backgroundColor: RED } : undefined}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {tab === 'Setup' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Campaign Name">
                <input
                  type="text"
                  value={campaign.name}
                  onChange={(e) => updateCampaignMeta(campaignId, { name: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Campaign ID (URL slug)">
                <input type="text" value={campaign.id} disabled className={`${inputCls} bg-gray-50 text-gray-400`} />
              </Field>
              <Field label="Start Date">
                <input
                  type="date"
                  value={campaign.startDate ?? ''}
                  onChange={(e) => updateCampaignMeta(campaignId, { startDate: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="End Date">
                <input
                  type="date"
                  value={campaign.endDate ?? ''}
                  onChange={(e) => updateCampaignMeta(campaignId, { endDate: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Theme Color">
                <input
                  type="color"
                  value={campaign.themeColor ?? '#c3272b'}
                  onChange={(e) => updateCampaignMeta(campaignId, { themeColor: e.target.value })}
                  className="w-full h-10 rounded-xl border border-gray-200 cursor-pointer"
                />
              </Field>
              <Field label="Banner Image URL">
                <input
                  type="text"
                  value={campaign.bannerImage ?? ''}
                  onChange={(e) => updateCampaignMeta(campaignId, { bannerImage: e.target.value })}
                  placeholder="/images/combo/banner.jpg"
                  className={inputCls}
                />
              </Field>
            </div>
          )}

          {tab === 'Groups' && (
            <div>
              <div className="space-y-3 mb-5">
                {campaign.groups.length === 0 && (
                  <p className="text-[13px] text-gray-400">No groups yet. Add one below (e.g. NAS, HDD, SSD, Memory).</p>
                )}
                {campaign.groups.map((g) => (
                  <div key={g.key} className="flex flex-wrap items-center gap-3 border border-gray-100 rounded-xl p-3">
                    <input
                      type="text"
                      value={g.label}
                      onChange={(e) => updateGroup(campaignId, g.key, { label: e.target.value })}
                      className="flex-1 min-w-[120px] h-9 px-3 rounded-lg border border-gray-200 outline-none text-[13px]"
                    />
                    <label className="flex items-center gap-1.5 text-[12.5px] text-gray-600">
                      <input
                        type="checkbox"
                        checked={g.required}
                        onChange={(e) => updateGroup(campaignId, g.key, { required: e.target.checked })}
                      />
                      Required
                    </label>
                    <label className="flex items-center gap-1.5 text-[12.5px] text-gray-600">
                      Max qty
                      <input
                        type="number"
                        min={1}
                        value={g.maxQuantity}
                        onChange={(e) => updateGroup(campaignId, g.key, { maxQuantity: Math.max(1, Number(e.target.value) || 1) })}
                        className="w-16 h-9 px-2 rounded-lg border border-gray-200 outline-none text-[13px]"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => deleteGroup(campaignId, g.key)}
                      className="ml-auto h-8 px-3 rounded-full border border-gray-200 text-[12px] font-semibold text-[#bd2026] hover:bg-red-50 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newGroupLabel}
                  onChange={(e) => setNewGroupLabel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddGroup()}
                  placeholder="Group label, e.g. HDD"
                  className={`${inputCls} max-w-xs`}
                />
                <button
                  type="button"
                  onClick={handleAddGroup}
                  className="h-10 px-4 rounded-full text-white text-[13px] font-semibold cursor-pointer"
                  style={{ backgroundColor: RED }}
                >
                  + Add Group
                </button>
              </div>
            </div>
          )}

          {tab === 'Products' && (
            <div>
              {campaign.groups.length === 0 ? (
                <p className="text-[13px] text-gray-400">Add at least one group first (see the Groups tab).</p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {campaign.groups.map((g) => (
                      <button
                        key={g.key}
                        type="button"
                        onClick={() => setActiveGroupKey(g.key)}
                        className={`h-8 px-4 rounded-full text-[12.5px] font-semibold cursor-pointer ${
                          activeGroup?.key === g.key ? 'text-white' : 'bg-gray-50 text-gray-600'
                        }`}
                        style={activeGroup?.key === g.key ? { backgroundColor: RED } : undefined}
                      >
                        {g.label} ({g.products.length})
                      </button>
                    ))}
                  </div>

                  {activeGroup && (
                    <>
                      <div className="flex items-center gap-2 mb-5">
                        <select
                          value={importCategory}
                          onChange={(e) => setImportCategory(e.target.value)}
                          className="h-9 px-3 rounded-lg border border-gray-200 outline-none text-[12.5px] text-gray-700"
                        >
                          <option value="">Import from category...</option>
                          {categorySlugs.map((slug) => (
                            <option key={slug} value={slug}>
                              {slug}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          disabled={!importCategory}
                          onClick={() => {
                            importCategoryIntoGroup(campaignId, activeGroup.key, importCategory)
                            setImportCategory('')
                          }}
                          className="h-9 px-4 rounded-full border border-gray-200 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
                        >
                          Import
                        </button>
                      </div>

                      {activeGroup.products.length > 0 && (
                        <div className="grid grid-cols-[1fr_96px_96px_64px_80px_92px] gap-2 border border-transparent p-3 mb-1.5">
                          <span className="text-[11px] font-semibold text-gray-400 uppercase">Product Name</span>
                          <span className="text-[11px] font-semibold text-gray-400 uppercase">Regular Price</span>
                          <span className="text-[11px] font-semibold text-gray-400 uppercase">Special Price</span>
                          <span className="text-[11px] font-semibold text-gray-400 uppercase">Type</span>
                          <span className="text-[11px] font-semibold text-gray-400 uppercase">Discount</span>
                          <span className="text-[11px] font-semibold text-gray-400 uppercase">Action</span>
                        </div>
                      )}
                      <div className="space-y-2 mb-5">
                        {activeGroup.products.map((p) => (
                          <div key={p.id} className="grid grid-cols-[1fr_96px_96px_64px_80px_92px] items-center gap-2 border border-gray-100 rounded-xl p-3">
                            <input
                              type="text"
                              value={p.name}
                              onChange={(e) => updateProduct(campaignId, activeGroup.key, p.id, { name: e.target.value })}
                              className="h-9 px-3 rounded-lg border border-gray-200 outline-none text-[13px]"
                            />
                            <input
                              type="number"
                              value={p.priceOld}
                              onChange={(e) => updateProduct(campaignId, activeGroup.key, p.id, { priceOld: Number(e.target.value) || 0 })}
                              className="h-9 px-2 rounded-lg border border-gray-200 outline-none text-[13px]"
                              title="Regular price"
                            />
                            <div className="h-9 px-2 rounded-lg bg-[#ecfdf5] flex items-center text-[13px] font-semibold text-[#10b981]" title="Special price (auto-calculated)">
                              {formatCurrency(priceNewOf(p))}
                            </div>
                            <select
                              value={p.discountType}
                              onChange={(e) => updateProduct(campaignId, activeGroup.key, p.id, { discountType: e.target.value as DiscountType })}
                              className="h-9 px-2 rounded-lg border border-gray-200 outline-none text-[12.5px]"
                            >
                              <option value="percent">%</option>
                              <option value="fixed">৳</option>
                            </select>
                            <input
                              type="number"
                              value={p.discountValue}
                              onChange={(e) => {
                                const raw = Number(e.target.value) || 0
                                const value = p.discountType === 'percent' ? Math.max(0, Math.min(100, raw)) : Math.max(0, raw)
                                updateProduct(campaignId, activeGroup.key, p.id, { discountValue: value })
                              }}
                              className="h-9 px-2 rounded-lg border border-gray-200 outline-none text-[13px]"
                              title="Discount value"
                            />
                            <button
                              type="button"
                              onClick={() => removeProduct(campaignId, activeGroup.key, p.id)}
                              className="h-8 px-3 rounded-full border border-gray-200 text-[12px] font-semibold text-[#bd2026] hover:bg-red-50 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-2 sm:grid-cols-2 border-t border-gray-100 pt-4">
                        <input
                          type="text"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct((s) => ({ ...s, name: e.target.value }))}
                          placeholder="Product name"
                          className={inputCls}
                        />
                        <input
                          type="text"
                          value={newProduct.brand}
                          onChange={(e) => setNewProduct((s) => ({ ...s, brand: e.target.value }))}
                          placeholder="Brand"
                          className={inputCls}
                        />
                        <input
                          type="text"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct((s) => ({ ...s, image: e.target.value }))}
                          placeholder="Image URL (optional)"
                          className={inputCls}
                        />
                        <input
                          type="number"
                          value={newProduct.priceOld}
                          onChange={(e) => setNewProduct((s) => ({ ...s, priceOld: e.target.value }))}
                          placeholder="Regular price"
                          className={inputCls}
                        />
                        <select
                          value={newProduct.discountType}
                          onChange={(e) => setNewProduct((s) => ({ ...s, discountType: e.target.value as DiscountType }))}
                          className={inputCls}
                        >
                          <option value="fixed">Fixed amount (৳)</option>
                          <option value="percent">Percent (%)</option>
                        </select>
                        <input
                          type="number"
                          value={newProduct.discountValue}
                          onChange={(e) => setNewProduct((s) => ({ ...s, discountValue: e.target.value }))}
                          placeholder="Discount value"
                          className={inputCls}
                        />
                        <button
                          type="button"
                          onClick={handleAddProduct}
                          className="h-10 px-4 rounded-full text-white text-[13px] font-semibold cursor-pointer sm:col-span-2"
                          style={{ backgroundColor: RED }}
                        >
                          + Add Product
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {tab === 'Bonus & Publish' && (
            <div>
              <h3 className="text-[14px] font-bold text-gray-800 mb-1">Combo Bonus Tiers</h3>
              <p className="text-[12.5px] text-gray-400 mb-4">
                Extra discount unlocked once a customer selects from this many groups (highest matching tier applies).
              </p>
              <div className="space-y-2 mb-4">
                {campaign.bonusTiers.length === 0 && <p className="text-[13px] text-gray-400">No bonus tiers configured.</p>}
                {campaign.bonusTiers.map((tier, i) => (
                  <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-xl p-3">
                    <span className="text-[13px] text-gray-600">
                      {tier.minGroups}+ groups &rarr; {formatCurrency(tier.bonusAmount)} off
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateBonusTiers(
                          campaignId,
                          campaign.bonusTiers.filter((_, idx) => idx !== i)
                        )
                      }
                      className="ml-auto h-8 px-3 rounded-full border border-gray-200 text-[12px] font-semibold text-[#bd2026] hover:bg-red-50 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mb-8">
                <input
                  type="number"
                  min={2}
                  value={newTier.minGroups}
                  onChange={(e) => setNewTier((s) => ({ ...s, minGroups: e.target.value }))}
                  placeholder="Min groups"
                  className="h-10 w-28 px-3 rounded-xl border border-gray-200 outline-none text-[13px]"
                />
                <input
                  type="number"
                  value={newTier.bonusAmount}
                  onChange={(e) => setNewTier((s) => ({ ...s, bonusAmount: e.target.value }))}
                  placeholder="Bonus amount (৳)"
                  className="h-10 w-40 px-3 rounded-xl border border-gray-200 outline-none text-[13px]"
                />
                <button
                  type="button"
                  onClick={handleAddTier}
                  className="h-10 px-4 rounded-full text-white text-[13px] font-semibold cursor-pointer"
                  style={{ backgroundColor: RED }}
                >
                  + Add Tier
                </button>
              </div>

              <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
                <div>
                  <h3 className="text-[14px] font-bold text-gray-800 m-0">Publish</h3>
                  <p className="text-[12.5px] text-gray-400 m-0">Only active campaigns are visible on the storefront.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCampaignStatus(campaignId, !campaign.active)}
                  className={`h-10 px-5 rounded-full text-[13px] font-semibold cursor-pointer ${
                    campaign.active ? 'border border-gray-200 text-gray-700' : 'text-white'
                  }`}
                  style={!campaign.active ? { backgroundColor: RED } : undefined}
                >
                  {campaign.active ? 'Deactivate Campaign' : 'Activate Campaign'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
