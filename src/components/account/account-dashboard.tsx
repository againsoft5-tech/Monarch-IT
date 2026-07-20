'use client'

import Link from 'next/link'
import { formatCurrency } from '@/lib/currency'
import { useAuth } from '@/context/AuthContext'
import { accountManager, accountOrders, getStatusStats } from '@/data/accountData'
import AccountPinCard from './account-pin-card'

function StatusRing({
  pct,
  color,
  trackColor,
  count,
}: {
  pct: number
  color: string
  trackColor: string
  count: number
}) {
  const r = 28
  const c = 2 * Math.PI * r
  const offset = c - (Math.min(100, Math.max(0, pct)) / 100) * c
  return (
    <div className="relative h-[72px] w-[72px] shrink-0">
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke={trackColor} strokeWidth="7" />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[16px] font-bold leading-none text-gray-900">{count}</span>
        <span className="mt-0.5 text-[9px] font-semibold text-gray-400">{pct}%</span>
      </div>
    </div>
  )
}

const STAT_COLORS: Record<string, { color: string; track: string }> = {
  pending: { color: '#f59e0b', track: '#fef3c7' },
  processing: { color: '#3b82f6', track: '#dbeafe' },
  completed: { color: '#10b981', track: '#d1fae5' },
}

export default function AccountDashboard() {
  const { customer } = useAuth()
  const statusStats = getStatusStats()
  const recentOrders = accountOrders.slice(0, 3)

  if (!customer) return null

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)] md:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="m-0 text-[15px] font-bold text-gray-900">Order status</h2>
            <Link
              href="/account/orders"
              className="text-[12px] font-semibold text-[#d32f2f] no-underline hover:underline"
            >
              View orders
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {statusStats.map((s) => {
              const colors = STAT_COLORS[s.key] || STAT_COLORS.pending
              return (
                <div key={s.key} className="flex flex-col items-center gap-2 text-center">
                  <StatusRing
                    pct={s.pct}
                    color={colors.color}
                    trackColor={colors.track}
                    count={s.count}
                  />
                  <span className="text-[12px] font-semibold text-gray-700">{s.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)] md:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="m-0 text-[15px] font-bold text-gray-900">Recent orders</h2>
            <Link
              href="/account/orders"
              className="text-[12px] font-semibold text-[#d32f2f] no-underline hover:underline"
            >
              See all
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="m-0 text-[13px] text-gray-500">No orders yet. Place your first order from the shop.</p>
          ) : (
            <ul className="m-0 list-none space-y-2.5 p-0">
              {recentOrders.map((order) => (
                <li
                  key={order.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gray-100 bg-[#fafbfc] px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="m-0 truncate text-[13px] font-semibold text-gray-900">
                      {order.products[0]?.name || order.productLabel}
                    </p>
                    <p className="m-0 mt-0.5 text-[11px] text-gray-500">
                      {order.id} · {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                      {order.status}
                    </span>
                    <p className="m-0 mt-1 text-[13px] font-bold text-[#d32f2f]">{formatCurrency(order.total)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            { href: '/account/payments', icon: 'payments', label: 'Pay now' },
            { href: '/account/qc', icon: 'fact_check', label: 'QC report' },
            { href: '/account/support', icon: 'support_agent', label: 'Support' },
            { href: '/account/complain', icon: 'report', label: 'Complain' },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-100 bg-white px-2 py-3.5 text-center no-underline shadow-[0_8px_28px_rgba(0,0,0,0.03)] transition-colors hover:border-[#d32f2f]/40"
            >
              <span className="mi text-[22px] text-[#d32f2f]">{a.icon}</span>
              <span className="text-[11px] font-semibold text-gray-700">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <aside className="space-y-4">
        <AccountPinCard />

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
          <p className="m-0 mb-3 text-[11px] font-bold uppercase tracking-wide text-gray-400">
            Account manager
          </p>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d32f2f] text-[16px] font-bold text-white">
              {accountManager.initial}
            </div>
            <div className="min-w-0">
              <p className="m-0 text-[14px] font-bold text-gray-900">{accountManager.name}</p>
              <a
                href={`tel:${accountManager.phone}`}
                className="mt-0.5 inline-flex items-center gap-1 text-[13px] font-semibold text-[#d32f2f] no-underline hover:underline"
              >
                <span className="mi text-[15px] leading-none">call</span>
                {accountManager.phone}
              </a>
            </div>
          </div>
          <p className="m-0 mt-3 text-[12px] leading-relaxed text-gray-600">{accountManager.message}</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
          <h3 className="m-0 mb-2 text-[13px] font-bold text-gray-900">Loyalty points</h3>
          <p className="m-0 text-[28px] font-bold leading-none text-[#d32f2f]">{customer.rewardPoints}</p>
          <p className="m-0 mt-1.5 text-[12px] text-gray-500">Earn points on every completed order.</p>
          <Link
            href="/account/points"
            className="mt-3 inline-block text-[12px] font-semibold text-[#d32f2f] no-underline hover:underline"
          >
            Points history →
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
          <h3 className="m-0 mb-2 text-[13px] font-bold text-gray-900">Need help?</h3>
          <p className="m-0 text-[12px] leading-relaxed text-gray-500">
            Track deliveries, request QC photos, or open a support ticket.
          </p>
          <div className="mt-3 flex flex-col gap-1.5">
            <Link
              href="/account/delivery"
              className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-[12px] font-semibold text-gray-700 no-underline hover:bg-[#fff0f0] hover:text-[#d32f2f]"
            >
              Delivery status
            </Link>
            <Link
              href="/account/refunds"
              className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-[12px] font-semibold text-gray-700 no-underline hover:bg-[#fff0f0] hover:text-[#d32f2f]"
            >
              Refunds
            </Link>
            <Link
              href="/account/profile"
              className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-[12px] font-semibold text-gray-700 no-underline hover:bg-[#fff0f0] hover:text-[#d32f2f]"
            >
              Account profile
            </Link>
          </div>
        </div>
      </aside>
    </div>
  )
}
