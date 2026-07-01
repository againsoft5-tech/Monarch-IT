'use client'

import { useState } from 'react'
import Link from 'next/link'
import { drawerCategories } from '@/data/categories'

export default function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <>
      <div
        onClick={onClose}
        className={`md:hidden fixed inset-0 bg-black/50 z-[9998] transition-opacity ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`md:hidden fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white z-[9999] shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <span className="text-base font-semibold text-gray-900">All Categories</span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
            aria-label="Close menu"
          >
            <span className="mi text-[20px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {drawerCategories.map((cat) => {
            const isOpen = expanded === cat.name
            return (
              <div key={cat.name} className="border-b border-gray-100">
                <div
                  onClick={() => setExpanded(isOpen ? null : cat.name)}
                  className="flex items-center justify-between px-4 py-3.5 cursor-pointer active:bg-gray-50"
                >
                  <Link
                    href={cat.href}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center text-[14px] font-medium text-gray-800 no-underline"
                  >
                    <span className="mi mr-2.5 text-gray-500">{cat.icon}</span>
                    {cat.name}
                  </Link>
                  <span className={`mi text-gray-400 transition-transform ${isOpen ? 'rotate-45' : ''}`}>add</span>
                </div>

                {isOpen && (
                  <div className="flex flex-col pb-2 pl-11 pr-4">
                    {cat.sub.map((s) => (
                      <Link
                        key={s.name}
                        href={s.href}
                        className="py-2 text-[13px] text-gray-600 no-underline hover:text-[#d32f2f]"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
