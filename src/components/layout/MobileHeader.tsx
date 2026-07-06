'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MobileDrawer from './MobileDrawer'
import { useCart } from '@/context/CartContext'

const IMG_BASE = '/images'

export default function MobileHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { openCart, itemCount } = useCart()

  return (
    <>
      <div className="md:hidden flex items-center justify-between gap-3 bg-white px-4 py-3 border-b border-gray-100">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="w-9 h-9 flex items-center justify-center text-gray-700"
          aria-label="Open menu"
        >
          <span className="mi text-[26px]">menu</span>
        </button>

        <Link href="/" className="flex-1 flex justify-center">
          <Image
            src={`${IMG_BASE}/image/catalog/website/logo/monarch-it-logo.png`}
            alt="Monarch IT"
            width={140}
            height={34}
            className="h-8 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="w-9 h-9 flex items-center justify-center text-gray-700"
            aria-label="Toggle search"
          >
            <Image src="/images/compare-icons/search-icon.svg" alt="" width={20} height={20} className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={openCart}
            className="relative w-9 h-9 flex items-center justify-center text-gray-700"
            aria-label="Cart"
          >
            <Image
              src={`${IMG_BASE}/catalog/view/theme/default/image/cart-icon.svg`}
              alt="Cart"
              width={22}
              height={22}
              className="w-[22px] h-[22px]"
            />
            <span className="absolute top-0 right-0 bg-[#d32f2f] text-white text-[9px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center border-2 border-white leading-none">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden bg-white px-4 pb-3 border-b border-gray-100">
          <div className="flex items-center bg-[#f4f5f7] rounded-full px-4 py-2.5">
            <Image src="/images/compare-icons/search-icon.svg" alt="" width={18} height={18} className="w-[18px] h-[18px] mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search Products"
              autoComplete="off"
              className="flex-1 min-w-0 border-none bg-transparent outline-none text-[14px] text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      )}

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
