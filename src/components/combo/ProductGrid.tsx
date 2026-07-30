'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import type { ComboGroup, ComboProduct } from '@/data/comboData'
import { priceNewOf, discountAmountOf } from '@/data/comboData'
import { formatCurrency } from '@/lib/currency'

type Props = {
  group: ComboGroup
  selectedIds: string[]
  color: string
  onToggle: (product: ComboProduct) => void
}

export default function ProductGrid({ group, selectedIds, color, onToggle }: Props) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc'>('default')
  const [search, setSearch] = useState('')

  const brands = useMemo(() => Array.from(new Set(group.products.map((p) => p.brand))), [group.products])

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const products = useMemo(() => {
    let list = group.products
    if (selectedBrands.length > 0) list = list.filter((p) => selectedBrands.includes(p.brand))
    const query = search.trim().toLowerCase()
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query))
    list = [...list]
    if (sort === 'price-asc') list.sort((a, b) => priceNewOf(a) - priceNewOf(b))
    if (sort === 'price-desc') list.sort((a, b) => priceNewOf(b) - priceNewOf(a))
    return list
  }, [group.products, selectedBrands, search, sort])

  const isMulti = group.maxQuantity > 1
  const atLimit = isMulti && selectedIds.length >= group.maxQuantity

  return (
    <div className="flex-1 min-w-0">
      {brands.length > 1 && (
        <div className="mb-4">
          <p className="text-[11.5px] font-semibold text-gray-400 uppercase mb-2">Shop by brand</p>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => {
              const active = selectedBrands.includes(brand)
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => toggleBrand(brand)}
                  className={`h-8 px-4 rounded-full text-[12px] font-semibold border cursor-pointer ${
                    active ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                  style={active ? { backgroundColor: color } : undefined}
                >
                  {brand}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap mb-3">
        <p className="text-[12.5px] text-gray-400 m-0 shrink-0">
          {products.length} product{products.length !== 1 ? 's' : ''}
          {isMulti ? ` · select up to ${group.maxQuantity}` : ''}
        </p>
        <div className="relative flex-1 min-w-[160px]">
          <span className="mi absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-gray-400">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full h-8 pl-9 pr-3 rounded-lg border border-gray-200 outline-none text-[12.5px] text-gray-700 placeholder-gray-400 focus:border-gray-400 transition-colors"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="h-8 px-2.5 rounded-lg border border-gray-200 outline-none text-[12px] text-gray-600 shrink-0"
        >
          <option value="default">Combo Offer</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 text-[13px]">
          {search.trim() ? `No products match "${search}".` : 'No products in this category yet.'}
        </div>
      ) : (
        <div className="space-y-2.5">
          {products.map((p) => {
            const selected = selectedIds.includes(p.id)
            const disabled = !selected && atLimit
            const priceNew = priceNewOf(p)
            const discount = discountAmountOf(p)

            return (
              <label
                key={p.id}
                className={`flex items-center gap-3 bg-white rounded-2xl border p-3 transition-colors ${
                  disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-300'
                } ${selected ? '' : 'border-gray-100'}`}
                style={selected ? { borderColor: color } : undefined}
              >
                <input
                  type={isMulti ? 'checkbox' : 'radio'}
                  name={`combo-group-${group.key}`}
                  checked={selected}
                  disabled={disabled}
                  onChange={() => onToggle(p)}
                  className="shrink-0 w-4 h-4 accent-current"
                  style={{ color }}
                />
                <div className="w-14 h-14 shrink-0 rounded-xl bg-[#f4f5f7] relative overflow-hidden">
                  <Image src={p.image} alt="" fill sizes="56px" className="object-contain p-1.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-gray-800 font-medium m-0 truncate" title={p.name}>
                    {p.name}
                  </p>
                  {p.specs && p.specs.length > 0 && (
                    <p className="text-[11px] text-gray-400 m-0 truncate">{p.specs.join(' · ')}</p>
                  )}
                  {discount > 0 && (
                    <span className="inline-block text-[11px] font-semibold text-[#10b981] bg-[#ecfdf5] rounded px-1.5 py-0.5 mt-1">
                      -{formatCurrency(discount)}
                    </span>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  {discount > 0 && <p className="text-[11px] text-gray-400 line-through m-0">{formatCurrency(p.priceOld)}</p>}
                  <p className="text-[14px] font-bold text-gray-900 m-0">{formatCurrency(priceNew)}</p>
                </div>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}
