'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MobileDrawer from './MobileDrawer'
import SearchDropdown from './SearchDropdown'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

const IMG_BASE = '/images'

export default function MobileHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [query, setQuery] = useState('')
  const { openCart, itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!searchFocused) return
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchFocused(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [searchFocused])

  return (
    <>
      <div ref={searchRef} className="md:hidden relative flex items-center gap-2.5 bg-[#f4f5f7] px-4 py-3">
        <Link href="/" className="shrink-0 flex items-center">
          <Image
            src={`${IMG_BASE}/catalog/view/theme/default/image/monarch-it-icon.png`}
            alt="Monarch IT"
            width={40}
            height={34}
            className="h-9 w-auto object-contain"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center bg-white rounded-full px-4 py-2.5">
            <Image src="/images/compare-icons/search-icon.svg" alt="" width={18} height={18} className="w-[18px] h-[18px] mr-2.5 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search Products"
              autoComplete="off"
              className="flex-1 min-w-0 border-none bg-transparent outline-none text-[14px] text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-700 cursor-pointer"
            aria-label="Cart"
          >
            <Image
              src={`${IMG_BASE}/catalog/view/theme/default/image/cart-icon.svg`}
              alt="Cart"
              width={20}
              height={20}
              className="w-[20px] h-[20px]"
            />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#d32f2f] border border-white" />
            )}
          </button>

          <Link
            href={isLoggedIn ? '/account' : '/login'}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-700 no-underline"
            aria-label="Account"
          >
            <Image
              src={`${IMG_BASE}/catalog/view/theme/default/image/account-icon.svg`}
              alt="Account"
              width={20}
              height={20}
              className="w-[20px] h-[20px]"
            />
          </Link>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 flex items-center justify-center text-gray-700 cursor-pointer"
            aria-label="Open menu"
          >
            <span className="mi text-[26px]">menu</span>
          </button>
        </div>

        {searchFocused && (
          <SearchDropdown
            query={query}
            onNavigate={() => {
              setSearchFocused(false)
              setQuery('')
            }}
            positionClassName="absolute left-3 right-3 top-full mt-2"
          />
        )}
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
