'use client'

import { useState } from 'react'
import { accountQc, type AccountQcRow } from '@/data/accountData'
import AccountTable, { StatusBadge, TableAction } from './account-table'

export default function AccountQcView() {
  const [rows, setRows] = useState<AccountQcRow[]>(accountQc)
  const [orderId, setOrderId] = useState('')
  const [product, setProduct] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRows((prev) => [
      {
        orderId: orderId.trim() || '—',
        date: new Date().toISOString().slice(0, 10),
        status: 'Requested',
        product: product.trim() || 'QC request',
      },
      ...prev,
    ])
    setOrderId('')
    setProduct('')
    setMessage('')
  }

  return (
    <div className="space-y-3">
      <div>
        <h1 className="m-0 text-[17px] font-bold text-gray-900">QC</h1>
        <p className="m-0 mt-0.5 text-[12px] text-gray-500">
          Quality-check requests and reports for your orders.
        </p>
      </div>

      <AccountTable
        columns={[
          { key: 'order', label: 'Order' },
          { key: 'date', label: 'Date' },
          { key: 'product', label: 'Product' },
          { key: 'status', label: 'Status' },
          { key: 'action', label: 'Action', align: 'right' },
        ]}
        rowCount={rows.length}
      >
        {rows.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-4 py-10 text-center text-[13px] text-gray-500">
              No QC requests yet.
            </td>
          </tr>
        ) : (
          rows.map((row, idx) => (
            <tr key={`${row.orderId}-${idx}`} className="border-b border-gray-50 last:border-0 hover:bg-[#fafbfc]">
              <td className="px-3 py-3 text-[13px] font-semibold text-[#d32f2f] md:px-4">{row.orderId}</td>
              <td className="px-3 py-3 text-[12px] text-gray-500 md:px-4">{row.date}</td>
              <td className="px-3 py-3 text-[12px] text-gray-700 md:px-4">{row.product}</td>
              <td className="px-3 py-3 md:px-4">
                <StatusBadge label={row.status} tone="blue" />
              </td>
              <td className="px-3 py-3 text-right md:px-4">
                <TableAction variant="outline">View</TableAction>
              </td>
            </tr>
          ))
        )}
      </AccountTable>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)] md:p-5"
      >
        <h2 className="m-0 mb-3 text-[14px] font-bold text-gray-900">Request QC</h2>
        <div className="space-y-3">
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Order ID (optional)"
            className="h-10 w-full rounded-xl border border-gray-200 px-3 text-[13px] outline-none focus:border-[#d32f2f]"
          />
          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Product name"
            className="h-10 w-full rounded-xl border border-gray-200 px-3 text-[13px] outline-none focus:border-[#d32f2f]"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Notes for QC team…"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-[13px] outline-none focus:border-[#d32f2f]"
          />
          <button
            type="submit"
            className="h-10 cursor-pointer rounded-xl border-0 bg-[#d32f2f] px-5 text-[13px] font-semibold text-white hover:bg-[#b71c1c]"
          >
            Request QC
          </button>
        </div>
      </form>
    </div>
  )
}
