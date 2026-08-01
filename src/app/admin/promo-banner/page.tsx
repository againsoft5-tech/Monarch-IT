'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAdminAuth } from '@/context/AdminAuthContext'
import {
  usePromoBannerStore,
  addSlide,
  updateSlide,
  removeSlide,
  reorderSlide,
  type PromoSide,
  type PromoSlide,
} from '@/lib/promoBannerStore'

const RED = '#bd2026'

const inputCls =
  'w-full h-10 px-3.5 rounded-xl border border-gray-200 outline-none text-[13px] text-gray-800 focus:border-gray-400 transition-colors'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

async function uploadImage(file: File): Promise<string | null> {
  const fd = new FormData()
  fd.append('file', file)
  try {
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (!res.ok) return null
    const data = (await res.json()) as { url?: string }
    return data.url ?? null
  } catch {
    return null
  }
}

function SlideCard({
  side,
  slide,
  index,
  count,
}: {
  side: PromoSide
  slide: PromoSlide
  index: number
  count: number
}) {
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    const url = await uploadImage(file)
    setUploading(false)
    if (url) updateSlide(side, slide.id, { image: url })
    else window.alert('Image upload failed. Please try a PNG, JPG, WEBP or SVG under 5MB.')
  }

  return (
    <div className="border border-gray-100 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-semibold text-gray-400 m-0">Product {index + 1}</p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => reorderSlide(side, slide.id, -1)}
            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Move up"
          >
            <span className="mi text-[16px]">arrow_upward</span>
          </button>
          <button
            type="button"
            disabled={index === count - 1}
            onClick={() => reorderSlide(side, slide.id, 1)}
            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Move down"
          >
            <span className="mi text-[16px]">arrow_downward</span>
          </button>
          <button
            type="button"
            onClick={() => window.confirm('Remove this product?') && removeSlide(side, slide.id)}
            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-[#bd2026] cursor-pointer"
            aria-label="Remove"
          >
            <span className="mi text-[16px]">delete</span>
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-24 h-24 shrink-0 rounded-xl bg-[#f4f5f7] border border-gray-100 overflow-hidden flex items-center justify-center relative">
          {slide.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={slide.image} alt="" className="w-full h-full object-contain" />
          ) : (
            <span className="mi text-[22px] text-gray-300">image</span>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-[10px] text-gray-500">
              Uploading...
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <label className="flex items-center justify-center h-9 rounded-xl border border-dashed border-gray-300 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer">
            Upload image
            <input type="file" accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml" className="hidden" onChange={handleFile} />
          </label>
          <input
            type="text"
            value={slide.image}
            onChange={(e) => updateSlide(side, slide.id, { image: e.target.value })}
            placeholder="or paste image URL"
            className={`${inputCls} h-9`}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Category label">
          <input
            type="text"
            value={slide.label}
            onChange={(e) => updateSlide(side, slide.id, { label: e.target.value })}
            placeholder="Gaming Controller"
            className={inputCls}
          />
        </Field>
        <Field label="Product title">
          <input
            type="text"
            value={slide.title}
            onChange={(e) => updateSlide(side, slide.id, { title: e.target.value })}
            placeholder="ONIKUMA C1"
            className={inputCls}
          />
        </Field>
        <Field label="Subtitle">
          <input
            type="text"
            value={slide.subtitle}
            onChange={(e) => updateSlide(side, slide.id, { subtitle: e.target.value })}
            placeholder="Dual-Mode Six-Axis Gyroscope"
            className={inputCls}
          />
        </Field>
        <Field label="Button text">
          <input
            type="text"
            value={slide.buttonText}
            onChange={(e) => updateSlide(side, slide.id, { buttonText: e.target.value })}
            placeholder="Buy"
            className={inputCls}
          />
        </Field>
        <Field label="Buy now link">
          <input
            type="text"
            value={slide.buttonLink}
            onChange={(e) => updateSlide(side, slide.id, { buttonLink: e.target.value })}
            placeholder="/product/onikuma-c1"
            className={inputCls}
          />
        </Field>
      </div>
    </div>
  )
}

function SideColumn({ side, title, slides }: { side: PromoSide; title: string; slides: PromoSlide[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-bold text-gray-900 m-0">{title}</h2>
        <button
          type="button"
          onClick={() => addSlide(side)}
          className="h-8 px-4 rounded-full text-white text-[12.5px] font-semibold cursor-pointer"
          style={{ backgroundColor: RED }}
        >
          + Add product
        </button>
      </div>
      <div className="space-y-4">
        {slides.length === 0 && <p className="text-[13px] text-gray-400">No products yet. Add one to show it on the homepage.</p>}
        {slides.map((slide, i) => (
          <SlideCard key={slide.id} side={side} slide={slide} index={i} count={slides.length} />
        ))}
      </div>
    </div>
  )
}

export default function AdminPromoBannerPage() {
  const { isAdminLoggedIn, adminChecked } = useAdminAuth()
  const router = useRouter()
  const db = usePromoBannerStore()

  useEffect(() => {
    if (adminChecked && !isAdminLoggedIn) router.replace('/admin/login')
  }, [adminChecked, isAdminLoggedIn, router])

  if (!adminChecked || !isAdminLoggedIn) {
    return <div className="min-h-full flex items-center justify-center bg-[#eef0f3] text-gray-400 text-[14px]">Loading...</div>
  }

  return (
    <div className="min-h-full bg-[#eef0f3] px-4 py-8 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/admin" className="text-[13px] text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 mb-1">
            <span className="mi text-[16px]">arrow_back</span> Dashboard
          </Link>
          <h1 className="text-xl font-bold text-gray-900 m-0">Homepage Promo Banner</h1>
          <p className="text-[13px] text-gray-500 mt-1 mb-0">
            Edit the left and right promo cards shown on the homepage. Each side can hold multiple products — visitors cycle
            through them with the up/down arrows in the middle.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <SideColumn side="left" title="Left card" slides={db.left} />
          <SideColumn side="right" title="Right card" slides={db.right} />
        </div>
      </div>
    </div>
  )
}
