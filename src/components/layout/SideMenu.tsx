'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCompare } from '@/context/CompareContext'
import { useAuth } from '@/context/AuthContext'
import ChatWidget from '@/components/chat/ChatWidget'
import { useToast, Toast } from '@/components/ui/Toast'

const IMG_BASE = '/images'

const menuItems = [
  { icon: `${IMG_BASE}/catalog/view/theme/default/image/svg/phone-black-icon.svg`, href: '#', label: 'Phone' },
  { icon: `${IMG_BASE}/catalog/view/theme/default/image/message-icon.svg`, href: '#', label: 'Message', action: 'chat' },
  { icon: `${IMG_BASE}/catalog/view/theme/default/image/compare-icon-svg.svg`, href: '/compare', label: 'Compare' },
  { icon: `${IMG_BASE}/catalog/view/theme/default/image/svg/gift-black-icon.svg`, href: '#', label: 'Gift' },
  { icon: `${IMG_BASE}/catalog/view/theme/default/image/svg/fire-black-icon.svg`, href: '#', label: 'Hot Deals' },
  { icon: `${IMG_BASE}/catalog/view/theme/default/image/svg/pc-icon.svg`, href: '/pc-builder', label: 'PC Builder', active: true },
]

export default function SideMenu() {
  const { count } = useCompare()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const { toast, showToast } = useToast()
  const [chatOpen, setChatOpen] = useState(false)

  const handleChatClick = () => {
    if (!isLoggedIn) {
      showToast('Please login to start chatting')
      router.push('/login')
      return
    }
    setChatOpen(true)
  }

  return (
    <div className="fixed left-0 top-0 z-[9999] w-20 h-screen pointer-events-none max-md:top-auto max-md:bottom-0 max-md:w-full max-md:h-auto">
      <div
        className="flex flex-col items-center gap-6 py-4 pointer-events-auto bg-[rgba(247,248,249,0.95)]
        rounded-b-[40px] border border-t-0 border-[#eee] ml-3.5 shadow-[5px_5px_15px_rgba(0,0,0,0.05)]
        max-md:flex-row max-md:justify-around max-md:overflow-x-auto max-md:no-scrollbar max-md:px-4 max-md:rounded-none max-md:border-t max-md:border-x-0 max-md:border-b-0 max-md:ml-0"
      >
        <Link href="/" className="shrink-0 transition-transform duration-200 hover:scale-105">
          <Image
            src={`${IMG_BASE}/catalog/view/theme/default/image/monarch-it-icon.png`}
            alt="Monarch IT"
            width={44}
            height={44}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {menuItems.map((item) => {
          const content = (
            <>
              <div
                className={`w-[45px] h-[45px] rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.05)] transition-all duration-200 ${
                  item.active
                    ? 'bg-[#d92128] shadow-[0_4px_10px_rgba(217,33,40,0.3)]'
                    : 'bg-white group-hover:bg-[#d92128] group-hover:shadow-[0_4px_10px_rgba(217,33,40,0.3)]'
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={22}
                  height={22}
                  className={`w-[22px] h-[22px] object-contain transition-all ${
                    item.active ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'
                  }`}
                />
              </div>
              {item.label === 'Compare' && count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#d92128] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white leading-none">
                  {count}
                </span>
              )}
            </>
          )

          if (item.action === 'chat') {
            return (
              <button
                key={item.label}
                type="button"
                onClick={handleChatClick}
                className="relative group shrink-0 transition-transform duration-200 hover:scale-105 cursor-pointer"
              >
                {content}
              </button>
            )
          }

          const isPlaceholder = item.href === '#'
          const LinkTag = isPlaceholder ? 'a' : Link
          return (
            <LinkTag key={item.label} href={item.href} className="relative group shrink-0 transition-transform duration-200 hover:scale-105">
              {content}
            </LinkTag>
          )
        })}
      </div>

      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
      <Toast message={toast} />
    </div>
  )
}
