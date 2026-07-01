'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

const IMG_BASE = '/images'

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false)
  const { openCart, itemCount } = useCart()
  const isHome = usePathname() === '/'

  return (
    <header
      className={`z-30 hidden md:block ${
        isHome ? 'absolute top-0 left-0 right-0 bg-transparent' : 'relative bg-white'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-10 py-3.5 relative z-[100] md:pl-32">
          <div className="flex-none flex items-center">
            <Link href="/" className="flex items-center no-underline">
              <Image
                src={`${IMG_BASE}/image/catalog/website/logo/monarch-it-logo.png`}
                alt="Monarch IT"
                width={180}
                height={44}
                className="h-11 w-auto object-contain"
                style={{ width: 'auto' }}
                priority
              />
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center px-8">
            <div className="relative max-w-[400px] w-full">
              <div className="flex items-center bg-[#f4f5f7] rounded-[30px] px-5 py-2.5">
                <button type="button" className="text-gray-500 mr-2.5 hover:text-[#d32f2f] transition-colors">
                  <span className="mi text-[22px] leading-none">search</span>
                </button>
                <input
                  type="text"
                  placeholder="Search Products"
                  autoComplete="off"
                  className="border-none bg-transparent outline-none flex-1 text-[15px] text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-[5px] font-semibold text-[15px] text-[#333] cursor-pointer ml-5 whitespace-nowrap select-none group hover:text-[#d32f2f]">
              <span>SHOP</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:rotate-180 group-hover:stroke-[#d32f2f]"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex-none flex items-center gap-3">
            <Link
              href="/pc-builder"
              className="border-2 border-[#d32f2f] text-[#d32f2f] bg-white px-5 py-[9px] rounded-[30px] font-bold text-[13px] hover:bg-[#d32f2f] hover:text-white transition-all whitespace-nowrap"
            >
              PC Builder
            </Link>

            <button
              type="button"
              onClick={openCart}
              className="relative w-11 h-11 bg-[#f4f5f7] rounded-full flex items-center justify-center hover:bg-[#e8eaed] transition-colors"
            >
              <Image
                src={`${IMG_BASE}/catalog/view/theme/default/image/cart-icon.svg`}
                alt="Cart"
                width={22}
                height={22}
                className="w-1/2"
              />
              <span className="absolute top-0.5 right-0.5 bg-[#d32f2f] text-white text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center border-2 border-white leading-none">
                {itemCount}
              </span>
            </button>

            <div
              className="relative"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                className="w-11 h-11 bg-[#f4f5f7] rounded-full flex items-center justify-center hover:bg-[#e8eaed] transition-colors"
              >
                <Image
                  src={`${IMG_BASE}/catalog/view/theme/default/image/account-icon.svg`}
                  alt="Account"
                  width={22}
                  height={22}
                  className="w-1/2"
                />
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full bg-white border-[1.5px] border-gray-200 rounded-[10px] shadow-[0_8px_28px_rgba(0,0,0,0.13)] min-w-[175px] z-[1200] py-1.5">
                  <Link
                    href="/login"
                    className="flex items-center gap-[9px] px-4 py-2.5 text-[13px] font-medium text-gray-900 no-underline hover:bg-[#f5f6fa] hover:text-[#d32f2f] transition-colors"
                  >
                    <span className="mi text-[17px] text-gray-400">lock</span>
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-[9px] px-4 py-2.5 text-[13px] font-medium text-gray-900 no-underline hover:bg-[#f5f6fa] hover:text-[#d32f2f] transition-colors"
                  >
                    <span className="mi text-[17px] text-gray-400">person_add</span>
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
