'use client'

import Link from 'next/link'
import { useComboStore } from '@/lib/comboStore'

export default function ComboGallery() {
  const db = useComboStore()
  const campaigns = Object.values(db).filter((c) => c.active)

  return (
    <section className="bg-[#f5f5f7] min-h-[60vh] py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Build Your Combo</h1>
        <p className="text-[14px] text-gray-500 mb-8">
          Pick a combo campaign below, add products from each category, and unlock extra bundle savings.
        </p>

        {campaigns.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-400 text-[14px]">
            No combo campaigns are live right now. Please check back soon.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((c) => {
              const productCount = c.groups.reduce((n, g) => n + g.products.length, 0)
              const color = c.themeColor ?? '#c3272b'
              return (
                <Link
                  key={c.id}
                  href={`/combo/${c.id}`}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden no-underline hover:shadow-md transition-shadow"
                >
                  <div className="h-28 flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: color }}>
                    {c.name}
                  </div>
                  <div className="p-5">
                    <p className="text-[13px] text-gray-500 m-0 mb-3">
                      {c.groups.length} categor{c.groups.length !== 1 ? 'ies' : 'y'} &middot; {productCount} product
                      {productCount !== 1 ? 's' : ''}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold" style={{ color }}>
                      Build Your Combo
                      <span className="mi text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
