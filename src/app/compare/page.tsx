'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import { compareProducts, type CompareProduct } from '@/data/compareProducts'
import { useCompare } from '@/context/CompareContext'

const GRID_COLS_3 = 'grid-cols-[minmax(120px,160px)_repeat(3,minmax(180px,1fr))]'
const GRID_COLS_2 = 'grid-cols-[minmax(120px,160px)_repeat(2,minmax(220px,1fr))]'

function RamIllustration({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 240 76" className="w-[86%] h-auto">
      <rect x="8" y="8" width="224" height="36" rx="4" fill="#1f2430" />
      <rect x="24" y="17" width="72" height="9" rx="2" fill={accent} />
      <text x="24" y="40" fill="#fff" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="700" letterSpacing="0.5">
        OSCOO
      </text>
      <rect x="8" y="44" width="224" height="12" rx="2" fill="#111318" />
      {Array.from({ length: 26 }).map((_, i) => (
        <rect key={i} x={13 + i * 8.5} y="50" width="4" height="8" fill="#d4af37" />
      ))}
    </svg>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-[#ffcb39] text-base leading-none">
      {'★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))}
    </span>
  )
}

function ProductSummary({ product }: { product: CompareProduct }) {
  return (
    <>
      <div className="w-full aspect-square max-w-[140px] flex items-center justify-center bg-gray-50 rounded-xl mb-3">
        <RamIllustration accent={product.accent} />
      </div>
      <p className="text-[14px] font-semibold text-gray-900 leading-snug mb-1.5 line-clamp-2">{product.name}</p>
      <div className="flex items-center justify-center gap-1 mb-1.5">
        <Stars rating={product.rating} />
        <span className="text-[12px] text-gray-600">
          {product.rating.toFixed(2)} ({product.reviews}
          <Image
            src="/images/catalog/view/theme/default/image/verified.svg"
            alt="Verified"
            width={11}
            height={11}
            className="inline w-[11px] h-[11px] mb-0.5 ml-0.5"
          />
          )
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        <span className="text-[15px] font-bold text-[#c3272b]">৳{product.priceNew.toLocaleString()}</span>
        {product.priceOld && (
          <span className="text-[11px] text-gray-400 line-through">৳{product.priceOld.toLocaleString()}</span>
        )}
        {product.discountPct && (
          <span className="text-[10.5px] font-bold text-[#00c68b]">{product.discountPct}% OFF</span>
        )}
      </div>
    </>
  )
}

function EmptySlot() {
  return (
    <div className="text-gray-400 flex flex-col items-center gap-2">
      <span className="mi text-[32px]">add_box</span>
      <p className="text-[12.5px] m-0">Search and add a product</p>
    </div>
  )
}

function ComparePageInner() {
  const { slots, setSlot, reset } = useCompare()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [started, setStarted] = useState(() => Boolean(slots[0] && slots[1]))
  const [queries, setQueries] = useState<string[]>(() => slots.map((s) => s?.name ?? ''))
  const [openSlot, setOpenSlot] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Key Features': true,
    'Physical dimension': false,
    'Warranty Information': false,
  })

  const reference = slots[0] ?? compareProducts[0]

  // Hydrate the comparison from a shared link (?p1=slug&p2=slug&p3=slug)
  useEffect(() => {
    const found = [0, 1, 2].map((i) => {
      const slug = searchParams.get(`p${i + 1}`)
      return slug ? compareProducts.find((p) => p.slug === slug) ?? null : null
    })
    found.forEach((product, i) => {
      if (product) setSlot(i, product)
    })
    if (found[0] && found[1]) setStarted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep the URL in sync with the active comparison so it stays shareable
  useEffect(() => {
    if (!started) return
    const params = new URLSearchParams()
    ;[0, 1, 2].forEach((i) => {
      const slug = slots[i]?.slug
      if (slug) params.set(`p${i + 1}`, slug)
    })
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }, [started, slots, pathname, router])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(timer)
  }, [toast])

  const resultsFor = useMemo(() => {
    return (index: number) => {
      const q = queries[index].trim().toLowerCase()
      if (!q) return compareProducts
      return compareProducts.filter((p) => p.name.toLowerCase().includes(q))
    }
  }, [queries])

  const selectProduct = (index: number, product: CompareProduct) => {
    setSlot(index, product)
    setQueries((prev) => prev.map((q, i) => (i === index ? product.name : q)))
    setOpenSlot(null)
  }

  const clearSlot = (index: number) => {
    setSlot(index, null)
    setQueries((prev) => prev.map((q, i) => (i === index ? '' : q)))
  }

  const resetAll = () => {
    reset()
    setQueries(['', '', ''])
    setOpenSlot(null)
    setStarted(false)
    router.replace(pathname, { scroll: false })
  }

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const handleShare = async () => {
    const url = window.location.href
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Product Comparison', text: 'Check out this product comparison on Monarch IT', url })
      } catch {
        // user dismissed the native share sheet
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setToast('Link copied to clipboard')
    } catch {
      setToast('Could not copy the link')
    }
  }

  const handlePrint = () => {
    const filledIndexes = visibleIndexes.filter((i) => slots[i])
    const products = filledIndexes.map((i) => slots[i]!)
    if (products.length === 0) return

    const esc = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

    const priceCell = (p: CompareProduct) => {
      const old = p.priceOld ? ` <span class="old">৳${p.priceOld.toLocaleString()}</span>` : ''
      const off = p.discountPct ? ` <span class="off">${p.discountPct}% OFF</span>` : ''
      return `৳${p.priceNew.toLocaleString()}${old}${off}`
    }
    const ratingCell = (p: CompareProduct) =>
      `<span class="stars">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}</span> ${p.rating.toFixed(2)} (${p.reviews} Reviews)`
    const summaryCell = (p: CompareProduct) => {
      const first = p.sections[0]
      if (!first) return '-'
      return `<ul>${first.rows.map(([label, value]) => `<li>${esc(label)}: ${esc(value)}</li>`).join('')}</ul>`
    }

    const headerCells = products.map((p) => `<th>${esc(p.name)}</th>`).join('')

    const topRows: [string, string[]][] = [
      ['Price', products.map(priceCell)],
      ['Model', products.map((p) => esc(p.model))],
      ['Rating', products.map(ratingCell)],
      ['Summary', products.map(summaryCell)],
    ]
    const topRowsHtml = topRows
      .map(([label, cells]) => `<tr><th class="row-label">${label}</th>${cells.map((c) => `<td>${c}</td>`).join('')}</tr>`)
      .join('')

    const sectionsHtml = (reference?.sections ?? [])
      .map((section, si) => {
        const sectionHeader = `<tr><td class="section-title" colspan="${products.length + 1}">${esc(section.title)}</td></tr>`
        const specRows = section.rows
          .map(([label], ri) => {
            const cells = filledIndexes
              .map((i) => `<td>${esc(slots[i]?.sections[si]?.rows[ri]?.[1] ?? '-')}</td>`)
              .join('')
            return `<tr><th class="row-label">${esc(label)}</th>${cells}</tr>`
          })
          .join('')
        return sectionHeader + specRows
      })
      .join('')

    const printedAt = new Date().toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })

    const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Product Comparison</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #1f2937; margin: 0; padding: 32px; }
  .timestamp { font-size: 11px; color: #6b7280; margin-bottom: 4px; }
  .page-title { text-align: center; font-size: 12px; color: #6b7280; margin-bottom: 18px; }
  .brand-row { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #d32f2f; padding-bottom: 14px; margin-bottom: 20px; }
  .brand-row img { height: 42px; width: auto; }
  .brand-meta { font-size: 12px; color: #4b5563; text-align: right; line-height: 1.6; }
  .brand-name { font-size: 22px; font-weight: 800; color: #d32f2f; margin: 0 0 4px; }
  table { width: 100%; border-collapse: collapse; }
  /* prevent the browser from repeating the product-name header row on every printed page */
  thead { display: table-row-group; }
  th, td { border: 1px solid #d1d5db; padding: 10px 12px; font-size: 13px; text-align: left; vertical-align: top; }
  thead th { background: #fff; font-size: 14px; font-weight: 700; color: #1f2937; }
  .row-label { width: 140px; font-weight: 700; color: #374151; background: #f9fafb; }
  .section-title { background: #fdecea; color: #d32f2f; font-weight: 800; font-size: 13px; }
  .old { text-decoration: line-through; color: #9ca3af; font-size: 11px; margin-left: 6px; }
  .off { color: #00a76a; font-size: 11px; font-weight: 700; margin-left: 6px; }
  .stars { color: #ffb400; }
  ul { margin: 0; padding-left: 18px; }
  li { margin-bottom: 3px; }
  a { color: inherit; text-decoration: none; }
  @media print { body { padding: 12px; } }
</style>
</head>
<body>
  <div class="timestamp">${printedAt}</div>
  <div class="page-title">Product Comparison</div>
  <div class="brand-row">
    <img src="${window.location.origin}/images/image/catalog/website/logo/monarch-it-logo.png" alt="Monarch IT" />
    <div class="brand-meta">
      <div class="brand-name">Monarch IT Limited</div>
      Phone: +8801332-812759<br />
      <a href="${window.location.origin}">${window.location.origin.replace(/^https?:\/\//, '')}</a>
    </div>
  </div>
  <table>
    <thead>
      <tr><th></th>${headerCells}</tr>
    </thead>
    <tbody>
      ${topRowsHtml}
      ${sectionsHtml}
    </tbody>
  </table>
</body>
</html>`

    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      setToast('Please allow pop-ups to print the comparison')
      return
    }
    printWindow.document.open()
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.focus()
    printWindow.onload = () => printWindow.print()
  }

  const renderSearchCell = (i: number, opts: { hideRemove?: boolean; hideName?: boolean } = {}) => {
    const { hideRemove = false, hideName = false } = opts
    const displayValue = hideName ? '' : queries[i]

    return (
      <div className="relative px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0 flex items-center bg-white border border-gray-200 focus-within:border-gray-400 transition-colors rounded-full px-3 py-1.5">
            <Image src="/images/compare-icons/search-icon.svg" alt="" width={20} height={20} className="w-5 h-5 mr-1.5 shrink-0" />
            <input
              type="text"
              value={displayValue}
              onChange={(e) => {
                setQueries((prev) => prev.map((q, idx) => (idx === i ? e.target.value : q)))
                setOpenSlot(i)
              }}
              onFocus={() => setOpenSlot(i)}
              placeholder="Search Products"
              autoComplete="off"
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-[13px] text-gray-700 placeholder-gray-400"
            />
          </div>
          {slots[i] && !hideRemove && (
            <button
              type="button"
              onClick={() => clearSlot(i)}
              aria-label="Remove product"
              className="shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Image src="/images/compare-icons/cross-icon.svg" alt="" width={36} height={36} className="w-9 h-9" />
            </button>
          )}
        </div>

        {openSlot === i && (
          <div className="absolute left-3 right-3 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-[0_8px_28px_rgba(0,0,0,0.13)] z-20 max-h-64 overflow-y-auto py-1.5">
            {resultsFor(i).length === 0 && (
              <p className="px-3.5 py-2.5 text-[13px] text-gray-400 m-0">No products found.</p>
            )}
            {resultsFor(i).map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => selectProduct(i, p)}
                className="w-full text-left flex items-center gap-2 px-3.5 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-[13px] text-gray-700 truncate">{p.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  const canStart = Boolean(slots[0] && slots[1])
  const showThirdColumn = Boolean(slots[1])
  const visibleIndexes = showThirdColumn ? [0, 1, 2] : [0, 1]
  const deskGridCols = showThirdColumn ? GRID_COLS_3 : GRID_COLS_2

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Product Comparison', href: '/compare' }]} />

      <div className="container mx-auto px-4 min-[992px]:px-14 py-8 md:py-10">
        {started && (
          <div className="text-center mb-7">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 m-0">Product Comparison</h1>
            <p className="text-[14px] text-gray-500 mt-1.5">Select items to compare side by side.</p>
          </div>
        )}

        {!started ? (
          <div className="max-w-sm mx-auto bg-white rounded-[24px] shadow-[0_2px_16px_var(--tw-shadow-color,#00000014)] p-6 md:p-7">
            <h2 className="text-[17px] font-bold text-gray-900 text-center m-0">Product Comparison</h2>
            <p className="text-[13px] text-gray-500 text-center mt-2 mb-4">
              You have not chosen any products to compare.
            </p>

            <div className="flex flex-col gap-2.5 mb-4">
              {renderSearchCell(0)}
              {renderSearchCell(1)}
            </div>

            <button
              type="button"
              disabled={!canStart}
              onClick={() => setStarted(true)}
              className="w-full bg-[#d32f2f] text-white text-[14px] font-semibold py-3 rounded-full shadow-[0_6px_18px_rgba(211,47,47,0.25)] hover:bg-[#b71c1c] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#d32f2f]"
            >
              View Comparison
            </button>
          </div>
        ) : (
          <>
            {/* Desktop / tablet table */}
            <div className="hidden md:block bg-white border border-gray-100 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-x-auto no-scrollbar">
              <div className="min-w-[760px]">
                {/* Search row */}
                <div className={`grid ${deskGridCols} items-center border-b bg-gray-100 border-gray-100`}>
                  <div className="flex items-center justify-center py-4">
                    <button
                      type="button"
                      onClick={resetAll}
                      title="Reset comparison"
                      className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Image src="/images/compare-icons/refresh-icon.svg" alt="Reset" width={36} height={36} className="w-9 h-9" />
                    </button>
                  </div>
                  {renderSearchCell(0, { hideRemove: true, hideName: true })}
                  {renderSearchCell(1, { hideName: true })}
                  {showThirdColumn && renderSearchCell(2, { hideName: true })}
                </div>

                {/* Product card row */}
                <div className={`grid ${deskGridCols} border-b border-gray-100`}>
                  <div />
                  {visibleIndexes.map((i) => {
                    const product = slots[i]
                    return (
                      <div key={i} className="px-4 py-5 border-l border-gray-50 flex flex-col items-center text-center min-h-[210px] justify-center">
                        {product ? <ProductSummary product={product} /> : <EmptySlot />}
                      </div>
                    )
                  })}
                </div>

                {/* Model row */}
                <div className={`grid ${deskGridCols} border-b border-gray-100`}>
                  <div className="px-4 py-3.5 text-[13px] font-semibold text-gray-700 flex items-center">Model</div>
                  {visibleIndexes.map((i) => (
                    <div key={i} className="px-4 py-3.5 border-l border-gray-50 text-[13px] text-gray-600 flex items-center justify-center text-center">
                      {slots[i]?.model ?? '—'}
                    </div>
                  ))}
                </div>

                {/* Spec sections */}
                {reference?.sections.map((section, si) => {
                  const isOpen = openSections[section.title]
                  return (
                    <div key={section.title}>
                      <button
                        type="button"
                        onClick={() => toggleSection(section.title)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-100"
                      >
                        <span className="text-[14px] font-bold text-[#d32f2f]">{section.title}</span>
                        <span className={`mi text-[20px] text-[#d32f2f] transition-transform ${!isOpen ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>

                      {isOpen &&
                        section.rows.map(([label], ri) => (
                          <div key={label} className={`grid ${deskGridCols} border-b border-gray-100`}>
                            <div className="px-4 py-3 text-[13px] text-gray-700 flex items-center">{label}</div>
                            {visibleIndexes.map((i) => (
                              <div
                                key={i}
                                className="px-4 py-3 border-l border-gray-50 text-[13px] text-gray-600 flex items-center justify-center text-center"
                              >
                                {slots[i]?.sections[si]?.rows[ri]?.[1] ?? '—'}
                              </div>
                            ))}
                          </div>
                        ))}
                    </div>
                  )
                })}

                {/* Actions row */}
                <div className={`grid ${deskGridCols} items-center`}>
                  <div className="flex items-center justify-center gap-2 py-4">
                    <button
                      type="button"
                      onClick={handleShare}
                      title="Share comparison"
                      className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Image src="/images/compare-icons/share-icon.svg" alt="Share" width={36} height={36} className="w-9 h-9" />
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      title="Print comparison"
                      className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Image src="/images/compare-icons/download-icon.svg" alt="Print" width={36} height={36} className="w-9 h-9" />
                    </button>
                  </div>
                  {visibleIndexes.map((i) => {
                    const product = slots[i]
                    return (
                      <div key={i} className="px-4 py-4 border-l border-gray-50 flex items-center justify-center">
                        <button
                          type="button"
                          disabled={!product}
                          className="bg-white text-[#c3272b] border-2 border-[#c3272b] rounded-full py-2 px-6 text-[13px] font-bold hover:bg-[#c3272b] hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#c3272b]"
                        >
                          Buy now
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Mobile comparison (2 products only) */}
            <div className="md:hidden bg-white border border-gray-100 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden">
              {/* Top bar: reset + share/download */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                <button
                  type="button"
                  onClick={resetAll}
                  title="Reset comparison"
                  className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <Image src="/images/compare-icons/refresh-icon.svg" alt="Reset" width={32} height={32} className="w-8 h-8" />
                </button>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleShare}
                    title="Share comparison"
                    className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <Image src="/images/compare-icons/share-icon.svg" alt="Share" width={32} height={32} className="w-8 h-8" />
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    title="Print comparison"
                    className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <Image src="/images/compare-icons/download-icon.svg" alt="Print" width={32} height={32} className="w-8 h-8" />
                  </button>
                </div>
              </div>

              {/* Search row */}
              <div className="grid grid-cols-2 items-center border-b border-gray-100">
                {renderSearchCell(0, { hideRemove: true, hideName: true })}
                {renderSearchCell(1, { hideName: true })}
              </div>

              {/* Product card row */}
              <div className="grid grid-cols-2 border-b border-gray-100">
                {[0, 1].map((i) => {
                  const product = slots[i]
                  return (
                    <div key={i} className={`px-2.5 py-4 flex flex-col items-center text-center min-h-[190px] justify-center ${i === 1 ? 'border-l border-gray-50' : ''}`}>
                      {product ? <ProductSummary product={product} /> : <EmptySlot />}
                    </div>
                  )
                })}
              </div>

              {/* Model row */}
              <div className="border-b border-gray-100">
                <div className="px-4 py-2 text-[12px] font-semibold text-gray-500 text-center bg-gray-50">Model</div>
                <div className="grid grid-cols-2">
                  <div className="px-3 py-3 text-[13px] text-gray-700 text-center border-r border-gray-100">
                    {slots[0]?.model ?? '—'}
                  </div>
                  <div className="px-3 py-3 text-[13px] text-gray-700 text-center">{slots[1]?.model ?? '—'}</div>
                </div>
              </div>

              {/* Spec sections, stacked label/value layout */}
              {reference?.sections.map((section, si) => {
                const isOpen = openSections[section.title]
                return (
                  <div key={section.title}>
                    <button
                      type="button"
                      onClick={() => toggleSection(section.title)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-100"
                    >
                      <span className="text-[14px] font-bold text-[#d32f2f]">{section.title}</span>
                      <span className={`mi text-[20px] text-[#d32f2f] transition-transform ${!isOpen ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>

                    {isOpen &&
                      section.rows.map(([label], ri) => (
                        <div key={label} className="border-b border-gray-100">
                          <div className="px-4 py-2 text-[12px] font-semibold text-gray-500 text-center bg-gray-50">
                            {label}
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-3 py-3 text-[13px] text-gray-700 text-center border-r border-gray-100">
                              {slots[0]?.sections[si]?.rows[ri]?.[1] ?? '—'}
                            </div>
                            <div className="px-3 py-3 text-[13px] text-gray-700 text-center">
                              {slots[1]?.sections[si]?.rows[ri]?.[1] ?? '—'}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )
              })}

              {/* Actions row */}
              <div className="grid grid-cols-2 items-center">
                {[0, 1].map((i) => {
                  const product = slots[i]
                  return (
                    <div key={i} className={`px-2.5 py-4 flex items-center justify-center ${i === 1 ? 'border-l border-gray-50' : ''}`}>
                      <button
                        type="button"
                        disabled={!product}
                        className="bg-white text-[#c3272b] border-2 border-[#c3272b] rounded-full py-2 px-4 text-[12.5px] font-bold hover:bg-[#c3272b] hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#c3272b]"
                      >
                        Buy now
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {openSlot !== null && <div className="fixed inset-0 z-10" onClick={() => setOpenSlot(null)} />}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-[13px] font-medium px-4 py-2.5 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
          {toast}
        </div>
      )}
    </>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={null}>
      <ComparePageInner />
    </Suspense>
  )
}
