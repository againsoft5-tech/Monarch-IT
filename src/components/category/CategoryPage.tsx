'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { CategoryProduct } from '@/data/categoryProducts'

type Props = {
  categoryName: string
  products: CategoryProduct[]
  priceMinDefault: number
  priceMaxDefault: number
}

const INITIAL_COUNT = 16
const LOAD_MORE_COUNT = 10

export default function CategoryPage({ categoryName, products, priceMinDefault, priceMaxDefault }: Props) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [availability, setAvailability] = useState<string[]>([])
  const [priceMin, setPriceMin] = useState(priceMinDefault)
  const [priceMax, setPriceMax] = useState(priceMaxDefault)
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc'>('default')
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [descOpen, setDescOpen] = useState(false)

  const toggleAvailability = (value: string) => {
    setAvailability((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
    setVisibleCount(INITIAL_COUNT)
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.priceNew >= priceMin && p.priceNew <= priceMax)
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.priceNew - b.priceNew)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.priceNew - a.priceNew)
    return list
  }, [products, priceMin, priceMax, sort])

  const paged = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const inStockCount = products.length
  const bestPriceCount = products.filter((p) => p.discountPct > 0).length
  const priceLow = products.length ? Math.min(...products.map((p) => p.priceNew)) : 0
  const priceHigh = products.length ? Math.max(...products.map((p) => p.priceNew)) : 0

  if (products.length === 0) {
    return (
      <div className="cp-cat-wrap">
        <div className="container mx-auto px-4 min-[992px]:pl-20 py-16">
          <div className="text-center max-w-md mx-auto">
            <span className="mi text-[56px] text-gray-300 block mb-4">inventory_2</span>
            <h1 className="text-lg font-semibold text-gray-800 mb-2">{categoryName}</h1>
            <p className="text-[14px] text-gray-500 mb-6">
              Product listings for this category are being added. Please check back soon.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-[#d32f2f] text-white text-[14px] font-semibold px-5 py-2.5 rounded-full no-underline hover:bg-[#b71c1c] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cp-cat-wrap">
      <div className="container mx-auto px-4 min-[992px]:pl-20 py-6">
        {/* Sidebar filters (off-canvas at every breakpoint) */}
        <div
          onClick={() => setFilterOpen(false)}
          className={`fixed inset-0 bg-black/50 z-[9998] transition-opacity ${
            filterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />
        <aside
          className={`fixed top-0 left-0 h-full w-[85%] max-w-[300px] bg-white z-[9999] shadow-2xl transition-transform duration-300 overflow-y-auto ${
            filterOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3.5 bg-[#3b5cff] text-white sticky top-0 z-10">
            <span className="flex items-center gap-1.5 font-bold text-[15px]">
              <span className="mi text-[18px]">tune</span> Filter
            </span>
            <button
              type="button"
              onClick={() => setFilterOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
              aria-label="Close filters"
            >
              <span className="mi text-[18px]">close</span>
            </button>
          </div>

            <div className="p-4">
              <div className="bg-white shadow-sm rounded-md p-4 mb-4">
                <div className="font-semibold text-[15px] text-gray-800 border-b border-gray-100 pb-2.5 mb-4">
                  Price Range
                </div>
                <div className="px-1">
                  <input
                    type="range"
                    min={priceMinDefault}
                    max={priceMaxDefault}
                    value={priceMax}
                    onChange={(e) => {
                      setPriceMax(Math.max(Number(e.target.value), priceMin))
                      setVisibleCount(INITIAL_COUNT)
                    }}
                    className="w-full accent-[#d92128]"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mt-3">
                  <input
                    type="text"
                    value={priceMin}
                    onChange={(e) => {
                      setPriceMin(Number(e.target.value) || 0)
                      setVisibleCount(INITIAL_COUNT)
                    }}
                    className="w-[80px] h-[30px] border border-gray-200 rounded text-center text-[13px]"
                  />
                  <span className="text-gray-300">—</span>
                  <input
                    type="text"
                    value={priceMax}
                    onChange={(e) => {
                      setPriceMax(Number(e.target.value) || 0)
                      setVisibleCount(INITIAL_COUNT)
                    }}
                    className="w-[80px] h-[30px] border border-gray-200 rounded text-center text-[13px]"
                  />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
                  <p className="m-0 font-semibold text-[15px] text-gray-800">Availability</p>
                  <span className="mi text-gray-500 text-[20px]">expand_more</span>
                </div>
                <div className="px-3 py-2">
                  {[
                    { value: 'in_stock', label: 'In Stock' },
                    { value: 'pre_order', label: 'Pre Order' },
                    { value: 'upcoming', label: 'Up Coming' },
                    { value: 'out_of_stock', label: 'Out of Stock' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 px-1 py-1.5 rounded hover:bg-gray-50 cursor-pointer text-[14px] text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={availability.includes(opt.value)}
                        onChange={() => toggleAvailability(opt.value)}
                        className="accent-[#d92128] w-[15px] h-[15px]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
        </aside>

        {/* Main content */}
        <div>
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="inline-flex items-center gap-1.5 bg-[#f5f5f7] border border-[#f5f5f7] rounded-full px-4 py-2 text-[14px] font-semibold text-gray-600 hover:border-[#d32f2f] hover:text-[#d32f2f] transition-colors"
              >
                <span className="mi text-[17px]">tune</span> Filter By
              </button>

              <div className="flex items-center gap-1.5 bg-[#f5f5f7] rounded-full px-3 py-1.5">
                <span className="mi text-gray-500 text-[20px]">swap_vert</span>
                <span className="text-gray-500 text-[14px] font-semibold">Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as typeof sort)
                    setVisibleCount(INITIAL_COUNT)
                  }}
                  className="bg-transparent border-none text-[13px] font-medium text-gray-500 outline-none cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price (Low &gt; High)</option>
                  <option value="price-desc">Price (High &gt; Low)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {paged.map((p) => (
                <div key={p.id} className="bg-white rounded-[14px] overflow-hidden flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.14)] hover:-translate-y-1 transition-all">
                  <Link href={`/${p.slug}`} className="aspect-square flex items-center justify-center">
                    <Image src={p.image} alt={p.name} width={228} height={228} className="w-[78%] h-[78%] object-contain" />
                  </Link>
                  <div className="p-3 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-1 flex-wrap">
                      <span className="text-[#ffcb39] text-lg leading-none">
                        {'★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating))}
                      </span>
                      <span className="text-[12px] text-gray-600">{p.rating.toFixed(1)}</span>
                      <span className="inline-flex items-center gap-0.5 text-[12px] text-gray-600">
                        ({p.reviews}
                        <Image
                          src="/images/catalog/view/theme/default/image/verified.svg"
                          alt="Verified Icon"
                          width={12}
                          height={12}
                          className="w-3 h-3 mb-0.5"
                        />
                        )
                      </span>
                    </div>
                    <div className="text-[13px] font-bold text-[#c3272b] leading-[1.45] mb-2 flex-1 line-clamp-2">
                      <Link href={`/${p.slug}`} className="text-[#4d4d4d] no-underline hover:text-[#c3272b]">
                        {p.name}
                      </Link>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
                      <span className="text-base font-bold text-[#c3272b]">৳{p.priceNew.toLocaleString()}</span>
                      <span className="text-[11px] text-gray-400 line-through">৳{p.priceOld.toLocaleString()}</span>
                      <span className="text-[10.5px] font-bold text-[#00c68b]">{p.discountPct}% OFF</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="flex-1 bg-white text-[#c3272b] border-2 border-[#c3272b] rounded-full py-1.5 px-2 text-[13px] font-bold hover:bg-[#c3272b] hover:text-white transition-colors"
                      >
                        Buy now
                      </button>
                      <button
                        type="button"
                        title="Add to Wish List"
                        className="w-9 h-9 shrink-0 rounded-full bg-[#f5f6fa] border border-[#ebebeb] flex items-center justify-center hover:bg-[#c3272b] hover:border-[#c3272b] transition-colors"
                      >
                        <span className="mi text-[16px] text-gray-500">favorite_border</span>
                      </button>
                      <button
                        type="button"
                        title="Compare this Product"
                        className="w-9 h-9 shrink-0 rounded-full bg-[#f5f6fa] border border-[#ebebeb] flex items-center justify-center hover:bg-[#c3272b] hover:border-[#c3272b] transition-colors"
                      >
                        <span className="mi text-[16px] text-gray-500">compare_arrows</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {paged.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <span className="mi text-[56px] text-gray-400 block mb-3">search_off</span>
                  <p className="text-gray-600">No products match the selected filters.</p>
                </div>
              )}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                  className="inline-flex items-center gap-2 bg-[#f5f5f7] hover:bg-gray-200 text-gray-700 font-semibold text-[13px] px-6 py-2.5 rounded-full transition-colors"
                >
                  <i className="fa fa-chevron-down" /> More
                </button>
              </div>
            )}

            <div className="bg-white border-[1.5px] border-[#f1f5f9] rounded-xl px-5 py-4 mt-6">
              <div className="font-bold text-[15px] text-gray-900 mb-2">{categoryName}</div>
              <p className="text-[13px] text-gray-600 leading-[1.8] m-0">
                Browse {products.length} {categoryName} model{products.length !== 1 ? 's' : ''} priced from ৳
                {priceLow.toLocaleString()} to ৳{priceHigh.toLocaleString()}. {inStockCount} in stock, {bestPriceCount}{' '}
                currently on discount.
              </p>
            </div>

            <div className="bg-white border-[1.5px] border-[#f1f5f9] rounded-xl mt-3.5 overflow-hidden">
              <div
                className={`relative overflow-hidden transition-[max-height] duration-500 ease-in-out px-5 pt-4 ${
                  descOpen ? 'max-h-none pb-4' : 'max-h-[170px]'
                }`}
              >
                <h2 className="text-[17px] font-bold text-gray-900 mb-2">About {categoryName}</h2>
                <p className="text-[13px] text-gray-600 leading-[1.8] mb-3">
                  Explore the full {categoryName} lineup available at Monarch IT, with options across different
                  budgets and use cases. Every unit ships with official warranty and after-sales support across our
                  service network in Bangladesh.
                </p>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5">Why buy from Monarch IT</h3>
                <p className="text-[13px] text-gray-600 leading-[1.8] mb-3">
                  All {categoryName} products listed here are sourced directly from authorized distributors, backed
                  by nationwide delivery and dedicated customer support.
                </p>
                {!descOpen && (
                  <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-b from-white/0 to-white pointer-events-none" />
                )}
              </div>
              <button
                type="button"
                onClick={() => setDescOpen((v) => !v)}
                className="w-full flex items-center justify-center py-2.5 text-[#d32f2f] hover:bg-gray-50 transition-colors"
                aria-label={descOpen ? 'Collapse description' : 'Expand description'}
              >
                <span className={`mi text-2xl transition-transform ${descOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}
