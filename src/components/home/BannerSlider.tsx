'use client'

import { useState } from 'react'
import Image from 'next/image'

const IMG_BASE = '/images/image/cache/catalog/website/banner'

const banners = [
  { img: `${IMG_BASE}/slider1-660x418.jpg`, url: '/laptop' },
  { img: `${IMG_BASE}/slider2-660x418.jpg`, url: '/desktops' },
  { img: `${IMG_BASE}/samrt-tv-exchange1-660x418.jpg`, url: '/monitor' },
]

export default function BannerSlider() {
  const [index, setIndex] = useState(0)
  const [sliding, setSliding] = useState(false)

  const left = banners[index]
  const right = banners[(index + 1) % banners.length]

  const go = (dir: number) => {
    setSliding(true)
    setTimeout(() => {
      setIndex((i) => (i + dir + banners.length) % banners.length)
      setSliding(false)
    }, 400)
  }

  return (
    <div className="container mx-auto px-4 min-[992px]:px-14 flex items-center justify-center gap-2.5 py-5">
      <a
        href={left.url}
        className={`flex-1 w-1/2 block transition-all duration-400 ${sliding ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      >
        <Image
          src={left.img}
          alt="Banner left"
          width={660}
          height={418}
          className="w-full h-auto object-contain rounded-[24px] max-[640px]:rounded-[14px]"
        />
      </a>

      <div className="relative flex items-center justify-center w-[110px] h-[190px] -mx-[55px] z-[5] shrink-0 max-[640px]:w-[76px] max-[640px]:h-[140px] max-[640px]:-mx-[38px]">
        <div className="absolute w-[110px] h-[110px] bg-white rotate-45 rounded-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] z-[1] max-[640px]:w-[55px] max-[640px]:h-[55px] max-[640px]:rounded-xl" />
        <div className="relative z-[2] flex flex-col items-center justify-between h-full py-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous banner"
            className="mt-5 max-[640px]:mt-[27px] text-[#e22a28] text-[22px] max-[640px]:text-sm hover:scale-125 transition-transform cursor-pointer"
          >
            <i className="fa fa-chevron-up" />
          </button>
          <div className="w-[62px] h-[62px] bg-[#e22a28] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(226,42,40,0.4),0_0_30px_rgba(226,42,40,0.15)] max-[640px]:w-[27px] max-[640px]:h-[27px]">
            <Image
              src="/images/catalog/view/theme/default/image/fire.png"
              alt="fire icon"
              width={30}
              height={30}
              className="w-[30px] max-[640px]:w-4"
              style={{ height: 'auto' }}
            />
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next banner"
            className="mb-5 max-[640px]:mb-[27px] text-[#e22a28] text-[22px] max-[640px]:text-sm hover:scale-125 transition-transform cursor-pointer"
          >
            <i className="fa fa-chevron-down" />
          </button>
        </div>
      </div>

      <a
        href={right.url}
        className={`flex-1 w-1/2 block transition-all duration-400 ${sliding ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      >
        <Image
          src={right.img}
          alt="Banner right"
          width={660}
          height={418}
          className="w-full h-auto object-contain rounded-[24px] max-[640px]:rounded-[14px]"
        />
      </a>
    </div>
  )
}
