'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import type { ProductImage } from '@/data/productDetail'

export default function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollThumbs = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 100, behavior: 'smooth' })
  }

  return (
    <div className="p-4">
      <div className="relative rounded-[20px] h-[320px] md:h-[400px] flex items-center justify-center bg-white border border-gray-100 overflow-hidden">
        <Image
          src={images[active].large}
          alt={name}
          width={500}
          height={500}
          className="max-w-full max-h-full object-contain p-2.5"
          priority
        />
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        <button
          type="button"
          onClick={() => scrollThumbs(-1)}
          aria-label="Previous thumbnail"
          className="w-[30px] h-[30px] shrink-0 rounded-full bg-[#f5f5f7] border-[1.5px] border-gray-200 flex items-center justify-center text-[#d92128] hover:bg-[#d92128] hover:text-white transition-colors cursor-pointer"
        >
          <span className="mi text-xl">chevron_left</span>
        </button>

        <div ref={trackRef} className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`w-16 h-16 shrink-0 rounded-lg border-2 bg-[#fafbfe] flex items-center justify-center overflow-hidden transition-colors cursor-pointer ${
                i === active ? 'border-[#d92128]' : 'border-gray-200 hover:border-[#d92128]'
              }`}
            >
              <Image src={img.thumb} alt={name} width={64} height={64} className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollThumbs(1)}
          aria-label="Next thumbnail"
          className="w-[30px] h-[30px] shrink-0 rounded-full bg-[#f5f5f7] border-[1.5px] border-gray-200 flex items-center justify-center text-[#d92128] hover:bg-[#d92128] hover:text-white transition-colors cursor-pointer"
        >
          <span className="mi text-xl">chevron_right</span>
        </button>
      </div>
    </div>
  )
}
