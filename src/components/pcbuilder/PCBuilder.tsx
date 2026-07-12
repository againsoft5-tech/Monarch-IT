'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import PartThumb from './PartThumb'
import WarningModal from './WarningModal'
import SuccessModal from './SuccessModal'
import { buildCategories, productsByCategory, type BuildProduct } from '@/data/pcBuilderData'
import { useToast, Toast } from '@/components/ui/Toast'
import { useCart } from '@/context/CartContext'
import type { CartItem } from '@/data/cart'

type Selection = { product: BuildProduct; qty: number }

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'PC Builder', href: '/pc-builder' },
]


export default function PCBuilder() {
  const [chipset, setChipset] = useState<'AMD' | 'Intel'>('AMD')
  const [activeCategory, setActiveCategory] = useState('cpu')
  const [builds, setBuilds] = useState<Record<string, Selection[]>>({})
  const [localQty, setLocalQty] = useState<Record<string, number>>({})
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc'>('default')
  const [filterOpen, setFilterOpen] = useState(false)
  const [brandSectionOpen, setBrandSectionOpen] = useState(true)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)
  const [warningMessage, setWarningMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { addItems } = useCart()
  const { toast, showToast } = useToast()

  const leftPanelRef = useRef<HTMLDivElement>(null)
  const [rightPanelHeight, setRightPanelHeight] = useState<number | null>(null)

  useEffect(() => {
    const el = leftPanelRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      setRightPanelHeight(el.getBoundingClientRect().height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const activeCat = buildCategories.find((c) => c.key === activeCategory)!

  const priceBounds = useMemo(() => {
    const prices = (productsByCategory[activeCategory] ?? []).map((p) => p.priceNew)
    return { min: prices.length ? Math.min(...prices) : 0, max: prices.length ? Math.max(...prices) : 0 }
  }, [activeCategory])

  const brands = useMemo(() => {
    const names = (productsByCategory[activeCategory] ?? []).map((p) => p.name.split(' ')[0])
    return Array.from(new Set(names))
  }, [activeCategory])

  useEffect(() => {
    setPriceMin(priceBounds.min)
    setPriceMax(priceBounds.max)
    setSelectedBrands([])
  }, [activeCategory, priceBounds.min, priceBounds.max])

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const filtersActive = priceMin > priceBounds.min || priceMax < priceBounds.max || selectedBrands.length > 0

  const total = useMemo(
    () =>
      Object.values(builds).reduce(
        (sum, items) => sum + items.reduce((s, sel) => s + sel.product.priceNew * sel.qty, 0),
        0
      ),
    [builds]
  )

  const getQty = (id: string) => localQty[id] ?? 1
  const setQty = (id: string, qty: number) => setLocalQty((prev) => ({ ...prev, [id]: Math.max(1, Math.min(9, qty)) }))

  const selectProduct = (categoryKey: string, product: BuildProduct) => {
    const category = buildCategories.find((c) => c.key === categoryKey)
    const qty = getQty(product.id)
    setBuilds((prev) => {
      const existing = prev[categoryKey] ?? []
      if (category?.multi) {
        const alreadyAdded = existing.some((s) => s.product.id === product.id)
        const updated = alreadyAdded
          ? existing.map((s) => (s.product.id === product.id ? { ...s, qty } : s))
          : [...existing, { product, qty }]
        return { ...prev, [categoryKey]: updated }
      }
      return { ...prev, [categoryKey]: [{ product, qty }] }
    })
    showToast(`${product.name} added to your build!`)
  }

  const removeSelection = (categoryKey: string, productId: string) => {
    setBuilds((prev) => ({
      ...prev,
      [categoryKey]: (prev[categoryKey] ?? []).filter((s) => s.product.id !== productId),
    }))
  }

  const updateBuildQty = (categoryKey: string, productId: string, delta: number) => {
    setBuilds((prev) => ({
      ...prev,
      [categoryKey]: (prev[categoryKey] ?? []).map((s) =>
        s.product.id === productId ? { ...s, qty: Math.max(1, Math.min(9, s.qty + delta)) } : s
      ),
    }))
  }

  const resetBuild = () => {
    setBuilds({})
    showToast('Build has been reset.')
  }

  const getSummaryBodyHtml = (origin: string) => {
    const regularTotal = Object.values(builds).reduce(
      (sum, items) => sum + items.reduce((s, sel) => s + sel.product.priceOld * sel.qty, 0),
      0
    )

    const rows = buildCategories
      .map((cat) => {
        const items = builds[cat.key] ?? []
        if (items.length === 0) {
          return `<tr><td>${cat.label}</td><td></td><td></td><td></td></tr>`
        }
        return items
          .map((sel, i) => {
            const lineNew = sel.product.priceNew * sel.qty
            const lineOld = sel.product.priceOld * sel.qty
            const priceCell =
              lineOld > lineNew
                ? `<span class="strike-wrap">৳${lineOld.toLocaleString()}</span><br/>৳${lineNew.toLocaleString()}`
                : `৳${lineNew.toLocaleString()}`
            const name = sel.qty > 1 ? `${sel.product.name} (x${sel.qty})` : sel.product.name
            return `<tr><td>${i === 0 ? cat.label : ''}</td><td>${name}</td><td>${priceCell}</td><td>৳${lineOld.toLocaleString()}</td></tr>`
          })
          .join('')
      })
      .join('')

    const totalCell =
      regularTotal > total
        ? `<span class="strike-wrap">৳${regularTotal.toLocaleString()}</span><br/>৳${total.toLocaleString()}`
        : `৳${total.toLocaleString()}`

    return `
  <div class="header">
    <img src="${origin}/images/catalog/view/theme/default/image/monarch-it.png" alt="Monarch IT" />
    <div>
      <p class="brand">Monarch IT</p>
      <p class="meta">Bs Bhaban, 2nd Floor, 75-76, New Elephant Road, Dhaka-1205, Bangladesh</p>
      <p class="meta">${origin}/pc-builder</p>
    </div>
  </div>
  <table>
    <thead>
      <tr><th>Component</th><th>Product Name</th><th>Price</th><th>Regular Price</th></tr>
    </thead>
    <tbody>${rows}</tbody>
    <tfoot>
      <tr><td colspan="2" style="border:none;"></td><td>Total:</td><td>${totalCell}</td></tr>
    </tfoot>
  </table>`
  }

  const summaryStyles = `
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact; }
  body { font-family: Arial, Helvetica, sans-serif; color: #222; }
  .header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
  .header img { height: 52px; }
  .brand { color: #c3272b; font-size: 26px; font-weight: 700; margin: 0; }
  .meta { font-size: 13px; color: #444; margin: 2px 0; }
  table { width: 100%; border-collapse: collapse; margin-top: 16px; }
  th { background: #c3272b; color: #fff; text-align: left; vertical-align: middle; padding: 10px 12px; font-size: 13px; line-height: 16px; }
  td { border: 1px solid #ddd; padding: 10px 12px; font-size: 13px; line-height: 16px; vertical-align: top; }
  .strike-wrap {
    display: inline-block;
    color: #999;
    font-size: 11px;
    background-image: linear-gradient(#999, #999);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: center;
  }
  tfoot td { font-weight: 700; text-align: right; border: none; padding-top: 14px; }`

  // html2canvas centers this box differently than real browsers do, so the PNG
  // export needs its own nudge without affecting the print page's styling above.
  const pngOnlyStyles = `.strike-wrap { background-position: center 100%; }`

  const downloadSummary = async () => {
    const html2canvas = (await import('html2canvas')).default

    // A4 at 96dpi = 794 x 1123px; fixed height keeps the exported PNG a true A4 page.
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.left = '-10000px'
    container.style.top = '0'
    container.style.width = '794px'
    container.style.height = '1123px'
    container.style.padding = '40px'
    container.style.boxSizing = 'border-box'
    container.style.background = '#ffffff'
    container.style.overflow = 'hidden'
    container.innerHTML = `<style>${summaryStyles}${pngOnlyStyles}</style>${getSummaryBodyHtml(window.location.origin)}`
    document.body.appendChild(container)

    const img = container.querySelector('img')
    if (img && !img.complete) {
      await new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true })
        img.addEventListener('error', resolve, { once: true })
      })
    }

    try {
      const canvas = await html2canvas(container, { scale: 2, backgroundColor: '#ffffff', useCORS: true })
      const dataUrl = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = 'monarch-it-pc-build-quotation.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      showToast('Quotation image downloaded!')
    } finally {
      document.body.removeChild(container)
    }
  }

  const printSummary = () => {
    const origin = window.location.origin
    const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Monarch IT - PC Build Quotation</title>
<style>
  @page { size: A4; margin: 16mm; }
  body { padding: 24px; background: #f0f0f0; }
  .page-container { max-width: 900px; margin: 0 auto; background: #fff; padding: 32px; box-shadow: 0 0 12px rgba(0,0,0,0.1); }
  @media print {
    body { padding: 0; background: #fff; }
    .page-container { max-width: none; margin: 0; padding: 0; box-shadow: none; }
  }
  ${summaryStyles}
</style>
</head>
<body><div class="page-container">${getSummaryBodyHtml(origin)}</div></body>
</html>`
    const win = window.open('', '_blank')
    if (!win) {
      showToast('Please allow pop-ups to print the quotation.')
      return
    }
    win.document.write(html)
    win.document.close()
    setTimeout(() => {
      win.focus()
      win.print()
    }, 300)
  }

  const shareBuild = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My PC Build - Monarch IT', url })
      } catch {
        // user cancelled the share sheet; nothing to do
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      showToast('Link copied to clipboard!')
    } catch {
      showToast('Could not copy link.')
    }
  }

  const requireCompleteBuild = (action: () => void) => {
    const missing = buildCategories.filter((cat) => cat.required && !builds[cat.key]?.length)
    if (missing.length > 0) {
      setWarningMessage(`Please select ${missing.map((c) => c.label).join(', ')} before continuing.`)
      return
    }
    action()
  }

  const addBuildToCart = () => {
    const cartItems: CartItem[] = buildCategories.flatMap((cat) =>
      (builds[cat.key] ?? []).map((sel) => ({
        id: sel.product.id,
        name: sel.product.name,
        slug: 'pc-builder',
        image: sel.product.image ?? cat.iconSvg ?? '/images/catalog/view/theme/default/image/monarch-it-icon.png',
        price: sel.product.priceNew,
        qty: sel.qty,
      }))
    )
    addItems(cartItems)
    setSuccessMessage(
      `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} added to your cart successfully!`
    )
  }

  const topActions = [
    {
      icon: 'ios_share',
      iconSvg: '/images/pc-builder/icons/share-icon.svg',
      title: 'Share Build',
      onClick: () => requireCompleteBuild(shareBuild),
    },
    {
      icon: 'photo_camera',
      title: 'Download Quotation',
      onClick: () => requireCompleteBuild(downloadSummary),
    },
    {
      icon: 'download',
      iconSvg: '/images/pc-builder/icons/download-icon.svg',
      title: 'Print Quotation',
      onClick: () => requireCompleteBuild(printSummary),
    },
    {
      icon: 'shopping_cart',
      title: 'Add Build to Cart',
      onClick: () => requireCompleteBuild(addBuildToCart),
    },
  ]

  const products = useMemo(() => {
    let list = productsByCategory[activeCategory] ?? []
    if (activeCat.key === 'cpu' || activeCat.key === 'motherboard') {
      list = list.filter((p) => !p.platform || p.platform === chipset)
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q))
    }
    list = list.filter((p) => p.priceNew >= priceMin && p.priceNew <= priceMax)
    if (selectedBrands.length) {
      list = list.filter((p) => selectedBrands.includes(p.name.split(' ')[0]))
    }
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.priceNew - b.priceNew)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.priceNew - a.priceNew)
    return list
  }, [activeCategory, activeCat.key, chipset, search, priceMin, priceMax, selectedBrands, sort])

  return (
    <div className="bg-white">
      <Toast message={toast} />
      <WarningModal open={!!warningMessage} message={warningMessage ?? ''} onClose={() => setWarningMessage(null)} />
      <SuccessModal open={!!successMessage} message={successMessage ?? ''} onClose={() => setSuccessMessage(null)} />

      {/* Filter drawer */}
      <div
        onClick={() => setFilterOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[10000] transition-opacity ${
          filterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[300px] bg-white z-[10001] shadow-2xl transition-opacity duration-300 overflow-y-auto ${
          filterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3.5 bg-[#c3272b] text-white sticky top-0 z-10">
          <span className="flex items-center gap-1.5 font-bold text-[15px]">
            <Image src="/images/pc-builder/icons/filter-icon-white.svg" alt="" width={17} height={12} /> Filter
          </span>
          <button
            type="button"
            onClick={() => setFilterOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
            aria-label="Close filters"
          >
            <span className="mi text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4">
          <div className="bg-white shadow-sm border border-gray-100 rounded-md p-4 mb-4">
            <div className="font-semibold text-[15px] text-gray-800 border-b border-gray-100 pb-2.5 mb-4">
              Price Range
            </div>
            <div className="relative h-1.5 mt-2 mb-1">
              <div className="absolute inset-0 rounded-full bg-gray-200" />
              <div
                className="absolute h-1.5 rounded-full bg-[#c3272b]"
                style={{
                  left: `${
                    priceBounds.max > priceBounds.min
                      ? ((priceMin - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100
                      : 0
                  }%`,
                  right: `${
                    priceBounds.max > priceBounds.min
                      ? 100 - ((priceMax - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100
                      : 0
                  }%`,
                }}
              />
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={priceMin}
                onChange={(e) => setPriceMin(Math.min(Number(e.target.value), priceMax))}
                className="absolute inset-0 w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#c3272b] [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#c3272b] [&::-moz-range-thumb]:cursor-pointer"
              />
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={priceMax}
                onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin))}
                className="absolute inset-0 w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#c3272b] [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#c3272b] [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between gap-2 mt-3">
              <input
                type="text"
                value={priceMin}
                onChange={(e) => setPriceMin(Math.min(Number(e.target.value) || 0, priceMax))}
                className="w-[80px] h-[30px] border border-gray-200 rounded text-center text-[13px] text-black"
              />
              <span className="text-gray-300">—</span>
              <input
                type="text"
                value={priceMax}
                onChange={(e) => setPriceMax(Math.max(Number(e.target.value) || 0, priceMin))}
                className="w-[80px] h-[30px] border border-gray-200 rounded text-center text-[13px] text-black"
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
            <button
              type="button"
              onClick={() => setBrandSectionOpen((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-100 cursor-pointer"
            >
              <p className="m-0 font-semibold text-[15px] text-gray-800">Brand</p>
              <span
                className={`mi text-gray-500 text-[20px] transition-transform ${brandSectionOpen ? 'rotate-180' : ''}`}
              >
                expand_more
              </span>
            </button>
            {brandSectionOpen && (
              <div className="px-3 py-2">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 px-1 py-1.5 rounded hover:bg-gray-50 cursor-pointer text-[14px] text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="accent-[#c3272b] w-[15px] h-[15px]"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            )}
          </div>

          {filtersActive && (
            <button
              type="button"
              onClick={() => {
                setPriceMin(priceBounds.min)
                setPriceMax(priceBounds.max)
                setSelectedBrands([])
              }}
              className="w-full text-center text-[13px] font-semibold text-[#c3272b] py-2 hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>
      </aside>

      <Breadcrumbs items={breadcrumbItems} />

      <div className="container mx-auto px-4 min-[992px]:px-14 pb-10">
        <div className="flex flex-wrap items-start justify-between gap-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Build Your PC</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">By Monarch IT</p>
          </div>

          <div className="flex items-center gap-2">
            {topActions.map((a) => (
              <button
                key={a.icon}
                type="button"
                title={a.title}
                onClick={a.onClick}
                className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center hover:bg-[#e8eaed] transition-colors cursor-pointer"
              >
                {a.iconSvg ? (
                  <Image src={a.iconSvg} alt="" width={20} height={20} />
                ) : (
                  <span className="mi text-[19px] text-gray-600">{a.icon}</span>
                )}
              </button>
            ))}
            <div className="ml-1 bg-[#c3272b] text-white rounded-full px-5 py-2.5 font-bold text-[14px] whitespace-nowrap">
              Total: ৳{total.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="bg-[#f3f4f6] rounded-[50px] p-3 md:p-6">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
            {/* Left panel: build list */}
            <div className="w-full lg:w-[400px] shrink-0">
              <div className="flex items-center justify-between gap-2.5 mb-4 flex-wrap">
                <div className="flex items-center h-14 gap-1.5 bg-white rounded-full px-3.5">
                  <span className="text-[14px] font-semibold text-gray-800 mr-0.5 whitespace-nowrap">Chipset</span>
                  <button
                    type="button"
                    onClick={() => setChipset('AMD')}
                    className={`group flex items-center px-3.5 py-2 rounded-full bg-white transition-colors cursor-pointer ${
                      chipset === 'AMD' ? 'border-2 border-[#c3272b]' : 'border border-gray-200 hover:border-[#c3272b]'
                    }`}
                  >
                    <span className="relative w-[52px] h-[12px]">
                      <Image
                        src="/images/pc-builder/icons/amd-gray.svg"
                        alt="AMD"
                        width={52}
                        height={12}
                        className={`absolute inset-0 transition-opacity ${
                          chipset === 'AMD' ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                        }`}
                      />
                      <Image
                        src="/images/pc-builder/icons/amd.svg"
                        alt=""
                        width={52}
                        height={12}
                        className={`absolute inset-0 transition-opacity ${
                          chipset === 'AMD' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChipset('Intel')}
                    className={`group flex items-center px-3.5 py-2 rounded-full bg-white transition-colors cursor-pointer ${
                      chipset === 'Intel' ? 'border-2 border-[#c3272b]' : 'border border-gray-200 hover:border-[#c3272b]'
                    }`}
                  >
                    <span className="relative w-[32px] h-[13px]">
                      <Image
                        src="/images/pc-builder/icons/intel-gray.svg"
                        alt="Intel"
                        width={32}
                        height={13}
                        className={`absolute inset-0 transition-opacity ${
                          chipset === 'Intel' ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                        }`}
                      />
                      <Image
                        src="/images/pc-builder/icons/intel-red.svg"
                        alt=""
                        width={32}
                        height={13}
                        className={`absolute inset-0 transition-opacity ${
                          chipset === 'Intel' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </span>
                  </button>
                </div>

                <div className="flex items-center h-14 gap-2 bg-white rounded-full px-2">
                  <button
                    type="button"
                    title={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
                    onClick={() => setViewMode((v) => (v === 'grid' ? 'list' : 'grid'))}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      viewMode === 'list' ? 'bg-[#c3272b] text-white' : 'bg-[#f4f5f7] text-gray-600 hover:bg-[#e8eaed]'
                    }`}
                  >
                    <span className="mi text-[23px]">format_list_bulleted</span>
                  </button>
                  <button
                    type="button"
                    title="Reset Build"
                    onClick={resetBuild}
                    className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center hover:bg-[#e8eaed] transition-colors cursor-pointer"
                  >
                    <Image src="/images/pc-builder/icons/refresh-icon-gray.svg" alt="" width={24} height={24} />
                  </button>
                </div>
              </div>

              <div ref={leftPanelRef} className="flex flex-col gap-2.5 bg-white rounded-[50px] p-4">
                {buildCategories.map((cat) => {
                  const items = builds[cat.key] ?? []
                  const isActive = activeCategory === cat.key
                  const showBrowsePill = items.length === 0 || cat.multi

                  return (
                    <div key={cat.key} className="flex flex-col gap-2.5">
                      {items.map((sel) => (
                        <div
                          key={sel.product.id}
                          className="flex items-center gap-2 border-2 border-[#c3272b] bg-white rounded-full px-2 py-1"
                        >
                          <PartThumb
                            icon={cat.icon}
                            iconSvg={cat.iconSvgActive ?? cat.iconSvg}
                            image={sel.product.image}
                            accent={cat.accent}
                            size="sm"
                          />
                          <button
                            type="button"
                            onClick={() => setActiveCategory(cat.key)}
                            className="flex-1 min-w-0 text-left cursor-pointer"
                          >
                            <div className="text-[12px] font-semibold text-gray-800 truncate leading-tight">
                              {cat.label}
                              {cat.required && <span className="text-[#c3272b]">*</span>}
                            </div>
                            <div className="text-[10.5px] text-gray-500 truncate leading-tight">
                              {sel.product.name}
                            </div>
                          </button>
                          <div className="shrink-0 flex items-center gap-1.5 border-r border-gray-400 pr-[6px]">
                            <span className="text-[12px] font-bold text-gray-700 whitespace-nowrap">
                              ৳{(sel.product.priceNew * sel.qty).toLocaleString()}
                            </span>
                            <div className="shrink-0 flex items-center gap-0.5 bg-[#f5f6fa] rounded-full px-1 py-0.5">
                              <button
                                type="button"
                                title="Decrease quantity"
                                onClick={() => updateBuildQty(cat.key, sel.product.id, -1)}
                                className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-[#c3272b] cursor-pointer text-[11px] leading-none"
                              >
                                −
                              </button>
                              <span className="text-[10px] font-semibold text-gray-700 w-2.5 text-center">
                                {sel.qty}
                              </span>
                              <button
                                type="button"
                                title="Increase quantity"
                                onClick={() => updateBuildQty(cat.key, sel.product.id, 1)}
                                className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-[#c3272b] cursor-pointer text-[11px] leading-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            title="Change"
                            onClick={() => setActiveCategory(cat.key)}
                            className="shrink-0 flex items-center text-gray-400 hover:text-[#c3272b] transition-colors cursor-pointer"
                          >
                            <span className="mi text-[16px]">sync</span>
                          </button>
                          <button
                            type="button"
                            title="Remove"
                            onClick={() => removeSelection(cat.key, sel.product.id)}
                            className="shrink-0 flex items-center text-gray-400 hover:text-[#c3272b] transition-colors cursor-pointer"
                          >
                            <span className="mi text-[16px]">close</span>
                          </button>
                        </div>
                      ))}

                      {showBrowsePill && (
                        <button
                          type="button"
                          onClick={() => setActiveCategory(cat.key)}
                          className={`group flex items-center gap-3 rounded-full border-2 bg-white px-4 py-2 transition-colors cursor-pointer ${
                            isActive
                              ? 'border-[#c3272b] text-[#c3272b]'
                              : 'border-gray-200 text-gray-600 hover:border-[#c3272b] hover:text-[#c3272b]'
                          }`}
                        >
                          {cat.iconSvg ? (
                            <span className="relative w-[26px] h-[26px] shrink-0">
                              <Image
                                src={cat.iconSvg}
                                alt=""
                                width={26}
                                height={26}
                                className={`absolute inset-0 object-contain transition-opacity ${
                                  isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                                }`}
                              />
                              <Image
                                src={cat.iconSvgActive ?? cat.iconSvg}
                                alt=""
                                width={26}
                                height={26}
                                className={`absolute inset-0 object-contain transition-opacity ${
                                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                }`}
                              />
                            </span>
                          ) : (
                            <span
                              className={`mi text-[26px] ${
                                isActive ? 'text-[#c3272b]' : 'text-[#808080] group-hover:text-[#c3272b]'
                              }`}
                            >
                              {cat.icon}
                            </span>
                          )}
                          <span className="flex-1 text-left text-[13px] font-semibold">
                            {items.length > 0 ? (
                              `Add another ${cat.label}`
                            ) : (
                              <>
                                {cat.label}
                                {cat.required && <span className="text-[#c3272b]">*</span>}
                              </>
                            )}
                          </span>
                          <span className="mi text-[19px]">add</span>
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right panel: product browser */}
            <div
              className="flex-1 w-full min-w-0 bg-white rounded-[50px] p-4 md:p-6 flex flex-col"
              style={rightPanelHeight ? { height: rightPanelHeight } : undefined}
            >
              <div className="flex flex-wrap items-center gap-3 mb-5 shrink-0">
                <div className="flex-1 min-w-[180px] flex items-center bg-[#f4f5f7] rounded-full px-4 py-2.5">
                  <Image
                    src="/images/compare-icons/search-icon.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] mr-2.5 shrink-0"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Products"
                    className="border-none bg-transparent outline-none flex-1 text-[14px] text-gray-700 placeholder-gray-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setFilterOpen(true)}
                  className={`group shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors cursor-pointer ${
                    filtersActive
                      ? 'bg-[#fdf1f1] text-[#c3272b] border-2 border-[#c3272b]'
                      : 'bg-[#f5f5f7] text-gray-600 border-2 border-transparent hover:text-[#c3272b]'
                  }`}
                >
                  <span className="relative w-[22px] h-[16px] shrink-0">
                    <Image
                      src="/images/pc-builder/icons/filter-icon.svg"
                      alt=""
                      width={22}
                      height={16}
                      className={`absolute inset-0 transition-opacity ${
                        filtersActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                      }`}
                    />
                    <Image
                      src="/images/pc-builder/icons/filter-icon-red.svg"
                      alt=""
                      width={22}
                      height={16}
                      className={`absolute inset-0 transition-opacity ${
                        filtersActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </span>
                  Filter By
                </button>
                <div className="shrink-0 flex items-center gap-1.5 bg-[#f5f5f7] rounded-full px-2.5 py-2">
                  <span className="mi text-gray-500 text-[22px]">swap_vert</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    className="bg-transparent border-none text-[13px] font-semibold text-gray-600 outline-none cursor-pointer"
                  >
                    <option value="default">Short By</option>
                    <option value="price-asc">Price (Low &gt; High)</option>
                    <option value="price-desc">Price (High &gt; Low)</option>
                  </select>
                </div>
              </div>

              <h2 className="text-center text-lg font-bold text-gray-900 mb-5 shrink-0">{activeCat.label}</h2>

              <div className="flex-1 min-h-0 overflow-y-auto pr-1.5 thin-scroll-gray">
                {products.length === 0 ? (
                  <div className="text-center py-16">
                    <span className="mi text-[48px] text-gray-300 block mb-3">search_off</span>
                    <p className="text-gray-500 text-[14px]">No products match your search.</p>
                  </div>
                ) : viewMode === 'list' ? (
                  <div className="flex flex-col gap-3">
                    {products.map((p) => {
                      const isPicked = (builds[activeCategory] ?? []).some((s) => s.product.id === p.id)
                      const qty = getQty(p.id)
                      return (
                        <div
                          key={p.id}
                          className={`bg-white rounded-2xl p-3 flex items-center gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 transition-colors ${
                            isPicked ? 'border-[#c3272b]' : 'border-transparent'
                          }`}
                        >
                          <div className="w-[120px] shrink-0">
                            <PartThumb
                              icon={activeCat.icon}
                              iconSvg={activeCat.iconSvgActive ?? activeCat.iconSvg}
                              image={p.image}
                              accent={activeCat.accent}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-semibold text-gray-800 leading-[1.3] mb-1.5">{p.name}</div>
                            {p.specs && p.specs.length > 0 && (
                              <ul className="list-disc pl-4 space-y-0.5">
                                {p.specs.map((spec) => (
                                  <li key={spec} className="text-[12px] text-gray-500">
                                    {spec}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="shrink-0 flex flex-col items-end gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap justify-end">
                              <span className="text-[15px] font-bold text-[#c3272b]">
                                ৳{p.priceNew.toLocaleString()}
                              </span>
                              {p.discountPct > 0 && (
                                <>
                                  <span className="text-[11px] text-gray-400 line-through">
                                    ৳{p.priceOld.toLocaleString()}
                                  </span>
                                  <span className="text-[10.5px] font-bold text-[#00c68b]">{p.discountPct}% OFF</span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => selectProduct(activeCategory, p)}
                                className={`rounded-full px-5 py-1.5 text-[12.5px] font-bold border-2 whitespace-nowrap transition-colors cursor-pointer ${
                                  isPicked
                                    ? 'bg-[#c3272b] text-white border-[#c3272b]'
                                    : 'bg-white text-[#c3272b] border-[#c3272b] hover:bg-[#c3272b] hover:text-white'
                                }`}
                              >
                                {isPicked ? 'Added' : 'Add'}
                              </button>
                              <div className="shrink-0 flex items-center gap-1.5 bg-[#f5f6fa] rounded-full px-1.5 py-1">
                                <button
                                  type="button"
                                  onClick={() => setQty(p.id, qty - 1)}
                                  className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-[#c3272b] cursor-pointer"
                                >
                                  −
                                </button>
                                <span className="text-[12px] font-semibold text-gray-700 w-3 text-center">{qty}</span>
                                <button
                                  type="button"
                                  onClick={() => setQty(p.id, qty + 1)}
                                  className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-[#c3272b] cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {products.map((p) => {
                    const isPicked = (builds[activeCategory] ?? []).some((s) => s.product.id === p.id)
                    const qty = getQty(p.id)
                    return (
                      <div
                        key={p.id}
                        className={`bg-white rounded-[14px] p-2.5 flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 transition-colors ${
                          isPicked ? 'border-[#c3272b]' : 'border-transparent'
                        }`}
                      >
                        <PartThumb
                          icon={activeCat.icon}
                          iconSvg={activeCat.iconSvgActive ?? activeCat.iconSvg}
                          image={p.image}
                          accent={activeCat.accent}
                        />
                        <div className="pt-2.5 flex flex-col flex-1">
                          <div className="text-[12.5px] font-semibold text-gray-700 leading-[1.4] mb-2 line-clamp-2 min-h-[2.8em]">
                            {p.name}
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
                            <span className="text-[14px] font-bold text-[#c3272b]">৳{p.priceNew.toLocaleString()}</span>
                            {p.discountPct > 0 && (
                              <>
                                <span className="text-[11px] text-gray-400 line-through">
                                  ৳{p.priceOld.toLocaleString()}
                                </span>
                                <span className="text-[10.5px] font-bold text-[#00c68b]">{p.discountPct}% OFF</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-auto">
                            <button
                              type="button"
                              onClick={() => selectProduct(activeCategory, p)}
                              className={`flex-1 rounded-full py-1.5 text-[12.5px] font-bold border-2 transition-colors cursor-pointer ${
                                isPicked
                                  ? 'bg-[#c3272b] text-white border-[#c3272b]'
                                  : 'bg-white text-[#c3272b] border-[#c3272b] hover:bg-[#c3272b] hover:text-white'
                              }`}
                            >
                              {isPicked ? 'Added' : 'Add'}
                            </button>
                            <div className="shrink-0 flex items-center gap-1.5 bg-[#f5f6fa] rounded-full px-1.5 py-1">
                              <button
                                type="button"
                                onClick={() => setQty(p.id, qty - 1)}
                                className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-[#c3272b] cursor-pointer"
                              >
                                −
                              </button>
                              <span className="text-[12px] font-semibold text-gray-700 w-3 text-center">{qty}</span>
                              <button
                                type="button"
                                onClick={() => setQty(p.id, qty + 1)}
                                className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-[#c3272b] cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
