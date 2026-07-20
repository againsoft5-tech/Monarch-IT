'use client'

import { useState } from 'react'
import { accountManager, accountSupportTickets, type AccountSupportRow } from '@/data/accountData'
import AccountTable, { StatusBadge, TableAction } from './account-table'

let ticketSeq = accountSupportTickets.length

export default function AccountSupportView() {
  const [rows, setRows] = useState<AccountSupportRow[]>(accountSupportTickets)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [orderId, setOrderId] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    ticketSeq += 1
    setRows((prev) => [
      {
        code: `SUP-${5500 + ticketSeq}`,
        date: new Date().toISOString().slice(0, 10),
        orders: orderId.trim() || '—',
        manager: accountManager.name,
        status: 'Open',
        message: subject ? `${subject}: ${message}` : message,
      },
      ...prev,
    ])
    setSubmitted(true)
    setSubject('')
    setMessage('')
    setOrderId('')
  }

  return (
    <div className="space-y-3">
      <div>
        <h1 className="m-0 text-[17px] font-bold text-gray-900">Support</h1>
        <p className="m-0 mt-0.5 text-[12px] text-gray-500">Open tickets and get help from our team.</p>
      </div>

      <AccountTable
        columns={[
          { key: 'code', label: 'Code' },
          { key: 'date', label: 'Date' },
          { key: 'orders', label: 'Orders' },
          { key: 'manager', label: 'Manager' },
          { key: 'status', label: 'Status' },
          { key: 'action', label: 'Action', align: 'right' },
        ]}
        rowCount={rows.length}
      >
        {rows.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-4 py-10 text-center text-[13px] text-gray-500">
              No support tickets yet.
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.code} className="border-b border-gray-50 last:border-0 hover:bg-[#fafbfc]">
              <td className="px-3 py-3 text-[13px] font-bold text-gray-900 md:px-4">{row.code}</td>
              <td className="px-3 py-3 text-[12px] text-gray-500 md:px-4">{row.date}</td>
              <td className="px-3 py-3 text-[13px] font-semibold text-[#d32f2f] md:px-4">{row.orders}</td>
              <td className="px-3 py-3 text-[12px] text-gray-700 md:px-4">{row.manager}</td>
              <td className="px-3 py-3 md:px-4">
                <StatusBadge label={row.status} tone="amber" />
              </td>
              <td className="px-3 py-3 text-right md:px-4">
                <span title={row.message}>
                  <TableAction variant="outline">Open</TableAction>
                </span>
              </td>
            </tr>
          ))
        )}
      </AccountTable>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)] md:p-5"
      >
        <h2 className="m-0 mb-3 text-[14px] font-bold text-gray-900">New ticket</h2>
        {submitted ? (
          <p className="mb-3 rounded-xl bg-emerald-50 px-3 py-2 text-[12px] font-semibold text-emerald-700">
            Ticket created successfully.
          </p>
        ) : null}
        <div className="space-y-3">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="h-10 w-full rounded-xl border border-gray-200 px-3 text-[13px] outline-none focus:border-[#d32f2f]"
          />
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Order ID (optional)"
            className="h-10 w-full rounded-xl border border-gray-200 px-3 text-[13px] outline-none focus:border-[#d32f2f]"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            placeholder="How can we help?"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-[13px] outline-none focus:border-[#d32f2f]"
          />
          <button
            type="submit"
            className="h-10 cursor-pointer rounded-xl border-0 bg-[#d32f2f] px-5 text-[13px] font-semibold text-white hover:bg-[#b71c1c]"
          >
            Submit ticket
          </button>
        </div>
      </form>
    </div>
  )
}
