'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const slides = [
  {
    src: '/images/image/cache/catalog/website/slider/slider-1880x1060.jpg',
    href: '/offers',
    alt: 'Slider 1',
  },
  {
    src: '/images/image/cache/catalog/website/slider/slider-1880x1060.jpg',
    href: '/offers',
    alt: 'Slider 2',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

  return (
    <div className="w-full" onMouseEnter={stop} onMouseLeave={start}>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1880 / 1060' }}>
        {slides.map((slide, i) => (
          <a
            key={i}
            href={slide.href}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'
            }`}
          >
            <Image src={slide.src} alt={slide.alt} fill className="object-cover object-center" priority={i === 0} />
          </a>
        ))}

        <button
          type="button"
          onClick={() => changeSlide(-1)}
          aria-label="Previous slide"
          className="absolute bottom-[35px] left-10 min-[992px]:left-28 z-[99] w-[38px] h-[38px] bg-[#f5f5f7] rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:scale-105 transition-all"
        >
          <span className="mi text-[20px] font-bold text-[#d32f2e]">chevron_left</span>
        </button>
        <button
          type="button"
          onClick={() => changeSlide(1)}
          aria-label="Next slide"
          className="absolute bottom-[35px] left-[88px] min-[992px]:left-[176px] z-[99] w-[38px] h-[38px] bg-[#f5f5f7] rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:scale-105 transition-all"
        >
          <span className="mi text-[20px] font-bold text-[#d32f2e]">chevron_right</span>
        </button>
      </div>
    </div>
  )
}
