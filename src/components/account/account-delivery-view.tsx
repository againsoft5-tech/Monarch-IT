'use client'

import { formatCurrency } from '@/lib/currency'
import { accountDeliveries } from '@/data/accountData'
import AccountTable, { StatusBadge } from './account-table'

export default function AccountDeliveryView() {
  const rows = accountDeliveries

  return (
    <div className="space-y-3">
      <div>
        <h1 className="m-0 text-[17px] font-bold text-gray-900">Delivery</h1>
        <p className="m-0 mt-0.5 text-[12px] text-gray-500">Shipment and tracking for your orders.</p>
      </div>
      <AccountTable
        columns={[
          { key: 'invoice', label: 'Shipment' },
          { key: 'date', label: 'Date' },
          { key: 'orders', label: 'Orders' },
          { key: 'method', label: 'Method' },
          { key: 'amount', label: 'Shipping', align: 'right' },
          { key: 'status', label: 'Status' },
          { key: 'track', label: 'Tracking' },
        ]}
        rowCount={rows.length}
      >
        {rows.length === 0 ? (
          <tr>
            <td colSpan={7} className="px-4 py-10 text-center text-[13px] text-gray-500">
              No deliveries yet.
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.invoice} className="border-b border-gray-50 last:border-0 hover:bg-[#fafbfc]">
              <td className="px-3 py-3 text-[13px] font-bold text-gray-900 md:px-4">{row.invoice}</td>
              <td className="px-3 py-3 text-[12px] text-gray-500 md:px-4">{row.date}</td>
              <td className="px-3 py-3 text-[13px] font-semibold text-[#d32f2f] md:px-4">{row.orders}</td>
              <td className="px-3 py-3 text-[13px] text-gray-700 md:px-4">{row.method}</td>
              <td className="px-3 py-3 text-right text-[13px] tabular-nums md:px-4">
                {formatCurrency(row.amount)}
              </td>
              <td className="px-3 py-3 md:px-4">
                <StatusBadge label={row.status} tone="blue" />
              </td>
              <td className="px-3 py-3 text-[12px] md:px-4">
                {row.trackingUrl ? (
                  <a
                    href={row.trackingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#d32f2f] no-underline hover:underline"
                  >
                    {row.trackingNumber || 'Track'}
                  </a>
                ) : (
                  row.trackingNumber || '—'
                )}
              </td>
            </tr>
          ))
        )}
      </AccountTable>
    </div>
  )
}
