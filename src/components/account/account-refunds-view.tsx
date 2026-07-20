'use client'

import { formatCurrency } from '@/lib/currency'
import { accountRefunds } from '@/data/accountData'
import AccountTable, { StatusBadge } from './account-table'

export default function AccountRefundsView() {
  const rows = accountRefunds

  return (
    <div className="space-y-3">
      <div>
        <h1 className="m-0 text-[17px] font-bold text-gray-900">Refunds</h1>
        <p className="m-0 mt-0.5 text-[12px] text-gray-500">Refund requests linked to your orders.</p>
      </div>
      <AccountTable
        columns={[
          { key: 'orders', label: 'Orders' },
          { key: 'date', label: 'Date' },
          { key: 'amount', label: 'Amount', align: 'right' },
          { key: 'method', label: 'Method' },
          { key: 'info', label: 'Reason' },
          { key: 'status', label: 'Status' },
        ]}
        rowCount={rows.length}
      >
        {rows.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-4 py-10 text-center text-[13px] text-gray-500">
              No refunds yet.
            </td>
          </tr>
        ) : (
          rows.map((row, idx) => (
            <tr key={`${row.orders}-${idx}`} className="border-b border-gray-50 last:border-0 hover:bg-[#fafbfc]">
              <td className="px-3 py-3 text-[13px] font-semibold text-[#d32f2f] md:px-4">{row.orders}</td>
              <td className="px-3 py-3 text-[12px] text-gray-500 md:px-4">{row.date}</td>
              <td className="px-3 py-3 text-right text-[13px] font-bold tabular-nums md:px-4">
                {formatCurrency(row.amount)}
              </td>
              <td className="px-3 py-3 text-[13px] text-gray-700 md:px-4">{row.method}</td>
              <td className="max-w-[220px] truncate px-3 py-3 text-[12px] text-gray-700 md:px-4">
                {row.info}
              </td>
              <td className="px-3 py-3 md:px-4">
                <StatusBadge label={row.status} tone="amber" />
              </td>
            </tr>
          ))
        )}
      </AccountTable>
    </div>
  )
}
