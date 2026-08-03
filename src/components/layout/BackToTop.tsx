'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisible = () => setVisible(window.scrollY > 300)
    updateVisible()
    window.addEventListener('scroll', updateVisible, { passive: true })
    return () => window.removeEventListener('scroll', updateVisible)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-[100px] right-6 md:bottom-6 z-[9999] w-9 h-9 rounded-full bg-[#d92128] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(217,33,40,0.35)] transition-all duration-300 hover:bg-[#b71c1c] cursor-pointer ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <i className="fa fa-chevron-up text-sm" />
    </button>
  )
}
