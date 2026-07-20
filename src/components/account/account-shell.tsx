'use client'

import { useEffect, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import { useAuth } from '@/context/AuthContext'
import {
  ACCOUNT_NAV,
  ACCOUNT_PROFILE_HREF,
  isAccountNavActive,
} from './account-nav-items'

const ACCENT = '#d32f2f'

export default function AccountShell({ children }: { children: ReactNode }) {
  const { logout, ready, isLoggedIn, customer } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const profileActive = isAccountNavActive(pathname, ACCOUNT_PROFILE_HREF)

  useEffect(() => {
    if (!ready) return
    if (!isLoggedIn) {
      const next = pathname && pathname.startsWith('/') ? pathname : '/account'
      router.replace(`/login?next=${encodeURIComponent(next)}`)
    }
  }, [ready, isLoggedIn, pathname, router])

  const sectionLabel =
    pathname.startsWith(ACCOUNT_PROFILE_HREF)
      ? 'Profile'
      : ACCOUNT_NAV.find((item) => isAccountNavActive(pathname, item.href))?.label || 'Account'

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!ready || !isLoggedIn || !customer) {
    return (
      <div className="bg-[#f6f7f9] min-h-[40vh] flex items-center justify-center text-sm text-gray-500">
        {ready ? 'Redirecting to login…' : 'Loading account…'}
      </div>
    )
  }

  const initial = (customer.name || customer.identifier || 'C').trim().charAt(0).toUpperCase()
  const contact = customer.email || customer.phone || customer.identifier

  return (
    <div className="bg-[#f6f7f9] min-h-[60vh]">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Account', href: '/account' },
          ...(pathname !== '/account' ? [{ label: sectionLabel, href: pathname }] : []),
        ]}
      />

      <div className="container mx-auto px-4 min-[992px]:px-14 py-4 md:py-6">
        <div className="mb-4 hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.03)] md:block">
          <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-4 py-3 lg:px-5">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[18px] font-bold text-white"
              style={{ background: ACCENT }}
            >
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold text-gray-900">{customer.name}</p>
              <p className="truncate text-[12px] text-gray-500">{contact}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/account/points"
                className="rounded-full bg-[#fff5f5] px-3 py-1.5 text-[12px] font-semibold text-[#d32f2f] no-underline hover:bg-[#ffe8e8]"
              >
                {customer.rewardPoints} Points
              </Link>
              <Link
                href={ACCOUNT_PROFILE_HREF}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[12px] font-semibold no-underline transition-colors ${
                  profileActive
                    ? 'border-[#d32f2f] bg-[#d32f2f] text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-[#d32f2f] hover:text-[#d32f2f]'
                }`}
              >
                <span className="mi text-[15px] leading-none">person</span>
                Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-gray-700 transition-colors hover:border-[#d32f2f] hover:text-[#d32f2f]"
              >
                <span className="mi text-[15px] leading-none">logout</span>
                Logout
              </button>
            </div>
          </div>

          <nav
            className="flex gap-0.5 overflow-x-auto px-2 py-2 scrollbar-thin"
            aria-label="Account sections"
          >
            {ACCOUNT_NAV.map((item) => {
              const active = isAccountNavActive(pathname, item.href)
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-[12px] font-semibold no-underline transition-colors ${
                    active
                      ? 'bg-[#fff0f0] text-[#d32f2f]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#d32f2f]'
                  }`}
                >
                  <span className="mi text-[16px] leading-none">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="mb-4 md:hidden">
          <div className="mb-3 rounded-2xl border border-gray-100 bg-white p-3.5 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[16px] font-bold text-white"
                style={{ background: ACCENT }}
              >
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-bold text-gray-900">{customer.name}</p>
                <p className="truncate text-[11px] text-gray-500">{contact}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <Link
                href="/account/points"
                className="rounded-full bg-[#fff5f5] px-2.5 py-1 text-[11px] font-semibold text-[#d32f2f] no-underline"
              >
                {customer.rewardPoints} Points
              </Link>
              <Link
                href={ACCOUNT_PROFILE_HREF}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold no-underline ${
                  profileActive
                    ? 'border-[#d32f2f] bg-[#d32f2f] text-white'
                    : 'border-gray-200 text-gray-700'
                }`}
              >
                <span className="mi text-[14px] leading-none">person</span>
                Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-[11px] font-semibold text-gray-700"
              >
                <span className="mi text-[14px] leading-none">logout</span>
                Logout
              </button>
            </div>
          </div>
          <nav className="flex gap-1.5 overflow-x-auto pb-1" aria-label="Account sections">
            {ACCOUNT_NAV.map((item) => {
              const active = isAccountNavActive(pathname, item.href)
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] font-semibold no-underline transition-colors ${
                    active
                      ? 'border-[#d32f2f] bg-[#d32f2f] text-white'
                      : 'border-gray-200 bg-white text-gray-600'
                  }`}
                >
                  <span className="mi text-[14px] leading-none">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {children}
      </div>
    </div>
  )
}
