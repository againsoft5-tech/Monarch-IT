'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const slides = [
  {
    src: '/images/image/cache/catalog/website/slider/slider-final-1350x600.jpg',
    href: '/offers',
    alt: 'Slider 1',
  },
  {
    src: '/images/image/cache/catalog/website/slider/slider-final2-1350x600.jpg',
    href: '/offers',
    alt: 'Slider 2',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const start = () => {
    if (slides.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 3000)
  }

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  useEffect(() => {
    start()
    return stop
  }, [])

  const changeSlide = (dir: number) => {
    setCurrent((c) => (c + dir + slides.length) % slides.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    stop()
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 40) changeSlide(diff > 0 ? 1 : -1)
    touchEndX.current = 0
    start()
  }

  return (
    <div
      className="w-full"
      onMouseEnter={stop}
      onMouseLeave={start}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative w-full overflow-hidden bg-white"
        style={{ aspectRatio: '1350 / 600' }}
      >
        {slides.map((slide, i) => (
          <a
            key={i}
            href={slide.href}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'
            }`}
          >
            <Image src={slide.src} alt={slide.alt} fill className="object-contain object-center" priority={i === 0} />
          </a>
        ))}

        <button
          type="button"
          onClick={() => changeSlide(-1)}
          aria-label="Previous slide"
          className="hidden md:flex absolute bottom-[35px] left-10 min-[992px]:left-28 z-20 w-[38px] h-[38px] bg-[#f5f5f7] rounded-full items-center justify-center cursor-pointer hover:bg-white hover:scale-105 transition-all"
        >
          <Image src="/images/promo-banner/left-arrow.svg" alt="Previous" width={9} height={16} className="w-[9px] h-4" />
        </button>
        <button
          type="button"
          onClick={() => changeSlide(1)}
          aria-label="Next slide"
          className="hidden md:flex absolute bottom-[35px] left-[84px] min-[992px]:left-[156px] z-20 w-[38px] h-[38px] bg-[#f5f5f7] rounded-full items-center justify-center cursor-pointer hover:bg-white hover:scale-105 transition-all"
        >
          <Image src="/images/promo-banner/right-arrow.svg" alt="Next" width={9} height={16} className="w-[9px] h-4" />
        </button>
      </div>

      {slides.length > 1 && (
        <div className="flex md:hidden items-center justify-center gap-1.5 py-3">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === current ? 'w-5 bg-gray-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
