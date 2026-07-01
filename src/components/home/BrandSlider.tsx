'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { brands } from '@/data/brands'

export default function BrandSlider() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (amount: number) => {
    trackRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="relative py-10 bg-white min-[992px]:pl-20">
      <div className="text-center mb-[30px]">
        <h2 className="m-0 mb-1 font-bold text-2xl md:text-[26px] text-[#333]">Brands We Distribute</h2>
        <p className="m-0 text-sm text-[#777]">Official distributor of trusted brands.</p>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative mx-auto px-6 md:px-[50px]">
          <button
            type="button"
            onClick={() => scroll(-300)}
            aria-label="Previous brand"
            className="absolute left-0 md:left-2.5 top-1/2 -translate-y-1/2 z-10 w-[35px] h-[35px] rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-[#e53e3e] shadow-[0_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#f7fafc] hover:text-[#c53030] transition-colors"
          >
            <i className="fa fa-chevron-left text-sm" />
          </button>

          <div
            ref={trackRef}
            className="flex gap-[25px] overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {brands.map((b) => (
              <a
                key={b.name}
                href={b.href}
                className="flex-none bg-white border border-[#f0f0f0] rounded-2xl px-6 py-[15px] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
              >
                <Image
                  src={b.logo}
                  alt={b.name}
                  title={b.name}
                  width={100}
                  height={40}
                  className="h-10 w-auto object-contain"
                  style={{ width: 'auto' }}
                />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll(300)}
            aria-label="Next brand"
            className="absolute right-0 md:right-2.5 top-1/2 -translate-y-1/2 z-10 w-[35px] h-[35px] rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-[#e53e3e] shadow-[0_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#f7fafc] hover:text-[#c53030] transition-colors"
          >
            <i className="fa fa-chevron-right text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}
