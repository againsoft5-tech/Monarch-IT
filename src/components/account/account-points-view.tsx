'use client'

import { accountPoints } from '@/data/accountData'
import AccountTable from './account-table'

export default function AccountPointsView() {
  const { balance, events } = accountPoints

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="m-0 text-[17px] font-bold text-gray-900">Points</h1>
          <p className="m-0 mt-0.5 text-[12px] text-gray-500">Loyalty points balance and history.</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-wide text-gray-400">Balance</p>
          <p className="m-0 text-[24px] font-bold text-[#d32f2f]">{balance}</p>
        </div>
      </div>

      <AccountTable
        columns={[
          { key: 'date', label: 'Date' },
          { key: 'type', label: 'Type' },
          { key: 'purpose', label: 'Purpose' },
          { key: 'orders', label: 'Orders' },
          { key: 'payment', label: 'Payment' },
          { key: 'amount', label: 'Points', align: 'right' },
        ]}
        rowCount={events.length}
      >
        {events.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-4 py-10 text-center text-[13px] text-gray-500">
              No point events yet.
            </td>
          </tr>
        ) : (
          events.map((row, idx) => (
            <tr key={`${row.date}-${idx}`} className="border-b border-gray-50 last:border-0 hover:bg-[#fafbfc]">
              <td className="px-3 py-3 text-[12px] text-gray-500 md:px-4">{row.date}</td>
              <td className="px-3 py-3 text-[13px] font-semibold text-gray-800 md:px-4">{row.type}</td>
              <td className="px-3 py-3 text-[12px] text-gray-700 md:px-4">{row.purpose}</td>
              <td className="px-3 py-3 text-[13px] text-[#d32f2f] md:px-4">{row.orders || '—'}</td>
              <td className="px-3 py-3 text-[12px] text-gray-500 md:px-4">{row.paymentId || '—'}</td>
              <td className="px-3 py-3 text-right text-[13px] font-bold tabular-nums md:px-4">
                {row.amount}
              </td>
            </tr>
          ))
        )}
      </AccountTable>
    </div>
  )
}
