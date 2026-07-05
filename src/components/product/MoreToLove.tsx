'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { RelatedProduct } from '@/data/productDetail'

export default function MoreToLove({ products }: { products: RelatedProduct[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (amount: number) => {
    trackRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="bg-white mt-6 py-7">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">More to love</h2>
        <p className="text-[14px] text-gray-500">Chosen by customers like you</p>
      </div>

      <div className="container mx-auto px-4 min-[992px]:px-14">
        <div className="relative">
          <button
            type="button"
            onClick={() => scroll(-300)}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 items-center justify-center text-[#d92128] shadow-md hover:bg-gray-50 cursor-pointer"
          >
            <span className="mi text-xl">chevron_left</span>
          </button>

          <div ref={trackRef} className="flex gap-4 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="flex-none w-[160px] md:w-[200px] bg-white rounded-[14px] overflow-hidden flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.14)] hover:-translate-y-1 transition-all no-underline"
              >
                <div className="aspect-square flex items-center justify-center">
                  <Image src={p.image} alt={p.name} width={200} height={200} className="w-[78%] h-[78%] object-contain" />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1 mb-1 flex-wrap">
                    <span className="text-[#ffcb39] text-base leading-none">
                      {'★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating))}
                    </span>
                    <span className="text-[11px] text-gray-600">{p.rating.toFixed(1)}</span>
                    <span className="inline-flex items-center gap-0.5 text-[11px] text-gray-600">
                      ({p.reviews}
                      <Image
                        src="/images/catalog/view/theme/default/image/verified.svg"
                        alt="Verified"
                        width={12}
                        height={12}
                        className="w-3 h-3"
                      />
                      )
                    </span>
                  </div>
                  <div className="text-[13px] font-bold text-[#4d4d4d] mb-2 line-clamp-2">{p.name}</div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[15px] font-bold text-[#c3272b]">৳{p.priceNew.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-400 line-through">৳{p.priceOld.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-[#00c68b]">{p.discountPct}% OFF</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll(300)}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 items-center justify-center text-[#d92128] shadow-md hover:bg-gray-50 cursor-pointer"
          >
            <span className="mi text-xl">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}
