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
            <span className="mi text-[24px]">search</span>
          </button>
          <button
            type="button"
            onClick={openCart}
            className="relative w-9 h-9 flex items-center justify-center text-gray-700"
            aria-label="Cart"
          >
            <span className="mi text-[24px]">shopping_cart</span>
            <span className="absolute top-0 right-0 bg-[#d32f2f] text-white text-[9px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center border-2 border-white leading-none">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden flex items-center gap-2 bg-white px-4 pb-3 border-b border-gray-100">
          <div className="flex-1 flex items-center bg-[#f4f5f7] rounded-[8px] px-3 py-2">
            <input
              type="text"
              placeholder="Search products, brands..."
              autoComplete="off"
              className="border-none bg-transparent outline-none flex-1 text-[14px] text-gray-700 placeholder-gray-400"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-1 bg-[#d32f2f] text-white px-3 py-2 rounded-[8px] text-[13px] font-semibold"
          >
            <span className="mi text-[16px]">search</span> Search
          </button>
        </div>
      )}

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
