'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/currency'
import { accountPayments, type AccountPaymentRow } from '@/data/accountData'
import AccountPaymentSlipDrawer from './account-payment-slip-drawer'
import AccountTable, { StatusBadge, TableAction } from './account-table'

function statusTone(status: string): 'amber' | 'blue' | 'green' | 'red' | 'gray' {
  const s = status.toLowerCase()
  if (s === 'completed') return 'green'
  if (s === 'initiated' || s === 'pending' || s === 'inbound') return 'blue'
  if (s === 'failed') return 'red'
  return 'gray'
}

export default function AccountPaymentsView() {
  const [rows] = useState<AccountPaymentRow[]>(accountPayments)
  const [active, setActive] = useState<AccountPaymentRow | null>(null)

  return (
    <div className="space-y-3">
      <div>
        <h1 className="m-0 text-[17px] font-bold text-gray-900">Payments</h1>
        <p className="m-0 mt-0.5 text-[12px] text-gray-500">
          Payment history, method, and status for your orders.
        </p>
      </div>

      <AccountTable
        columns={[
          { key: 'payment', label: 'Payment ID' },
          { key: 'orders', label: 'Orders' },
          { key: 'amount', label: 'Amount', align: 'right' },
          { key: 'method', label: 'Method' },
          { key: 'status', label: 'Status' },
          { key: 'slip', label: 'Slip', align: 'center' },
        ]}
        rowCount={rows.length}
      >
        {rows.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-4 py-10 text-center text-[13px] text-gray-500">
              No payments yet.
            </td>
          </tr>
        ) : (
          rows.map((row) => {
            const completed = row.status.toLowerCase() === 'completed' || row.status.toLowerCase() === 'inbound'
            return (
              <tr key={row.id} className="border-b border-gray-50 last:border-0 hover:bg-[#fafbfc]">
                <td className="px-3 py-3 md:px-4">
                  <p className="m-0 text-[13px] font-bold text-gray-900">{row.id}</p>
                  <p className="m-0 mt-0.5 text-[11px] text-gray-400">{row.date}</p>
                </td>
                <td className="px-3 py-3 text-[13px] font-semibold text-[#d32f2f] md:px-4">{row.orderId}</td>
                <td className="px-3 py-3 text-right text-[13px] font-bold tabular-nums text-gray-900 md:px-4">
                  {formatCurrency(row.amount)}
                </td>
                <td className="px-3 py-3 text-[13px] text-gray-700 md:px-4">{row.method}</td>
                <td className="px-3 py-3 md:px-4">
                  <StatusBadge label={row.status} tone={statusTone(row.status)} />
                </td>
                <td className="px-3 py-3 text-center md:px-4">
                  {completed ? (
                    <TableAction variant="outline" onClick={() => setActive(row)}>
                      View
                    </TableAction>
                  ) : (
                    <span className="text-[11px] font-semibold text-gray-300">—</span>
                  )}
                </td>
              </tr>
            )
          })
        )}
      </AccountTable>

      <AccountPaymentSlipDrawer open={Boolean(active)} payment={active} onClose={() => setActive(null)} />
    </div>
  )
}
