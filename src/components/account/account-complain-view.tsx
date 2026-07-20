'use client'

import { useState } from 'react'
import { accountComplaints, COMPLAIN_INTRO_BN, type AccountComplainRow } from '@/data/accountData'
import AccountTable, { StatusBadge, TableAction } from './account-table'

let complaintSeq = accountComplaints.length

export default function AccountComplainView() {
  const [rows, setRows] = useState<AccountComplainRow[]>(accountComplaints)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const orderId = String(fd.get('orderId') || '').trim()
    const message = String(fd.get('message') || '').trim()
    complaintSeq += 1
    setRows((prev) => [
      {
        id: `CMP-${2200 + complaintSeq}`,
        date: new Date().toISOString().slice(0, 10),
        orderId: orderId || '—',
        subject: message.slice(0, 80) || 'Complaint',
        status: 'Open',
      },
      ...prev,
    ])
    setSubmitted(true)
    e.currentTarget.reset()
  }

  return (
    <div className="space-y-3">
      <div>
        <h1 className="m-0 text-[17px] font-bold text-gray-900">Complain</h1>
        <p className="m-0 mt-0.5 text-[12px] text-gray-500">
          Submit a complaint or feedback about an order or service.
        </p>
      </div>

      <AccountTable
        columns={[
          { key: 'id', label: 'Code' },
          { key: 'date', label: 'Date' },
          { key: 'order', label: 'Orders' },
          { key: 'subject', label: 'Subject' },
          { key: 'status', label: 'Status' },
          { key: 'action', label: 'Action', align: 'right' },
        ]}
        rowCount={rows.length}
      >
        {rows.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-4 py-10 text-center text-[13px] text-gray-500">
              No complaints yet.
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-50 last:border-0 hover:bg-[#fafbfc]">
              <td className="px-3 py-3 text-[13px] font-bold text-gray-900 md:px-4">{row.id}</td>
              <td className="px-3 py-3 text-[12px] text-gray-500 md:px-4">{row.date}</td>
              <td className="px-3 py-3 text-[13px] font-semibold text-[#d32f2f] md:px-4">{row.orderId}</td>
              <td className="max-w-[220px] truncate px-3 py-3 text-[12px] text-gray-700 md:px-4">
                {row.subject}
              </td>
              <td className="px-3 py-3 md:px-4">
                <StatusBadge
                  label={row.status}
                  tone={row.status.toLowerCase() === 'resolved' ? 'green' : 'amber'}
                />
              </td>
              <td className="px-3 py-3 text-right md:px-4">
                <TableAction variant="outline">View</TableAction>
              </td>
            </tr>
          ))
        )}
      </AccountTable>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col items-center justify-center gap-4 px-4 py-8 text-center md:px-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0f0]">
            <span className="mi text-[24px] text-[#d32f2f]">report</span>
          </div>
          <p className="m-0 max-w-2xl text-[13px] leading-relaxed text-gray-600">{COMPLAIN_INTRO_BN}</p>

          {submitted ? (
            <div className="rounded-xl bg-emerald-50 px-4 py-3 text-[13px] font-semibold text-emerald-700">
              Thanks — your complaint has been recorded. Our team will review it shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-3 text-left">
              <div>
                <label htmlFor="complain-order" className="mb-1 block text-[12px] font-semibold text-gray-700">
                  Order ID (optional)
                </label>
                <input
                  id="complain-order"
                  name="orderId"
                  placeholder="Order ID from your orders list"
                  className="h-10 w-full rounded-xl border border-gray-200 px-3 text-[13px] outline-none focus:border-[#d32f2f]"
                />
              </div>
              <div>
                <label htmlFor="complain-msg" className="mb-1 block text-[12px] font-semibold text-gray-700">
                  Your message
                </label>
                <textarea
                  id="complain-msg"
                  name="message"
                  required
                  rows={4}
                  placeholder="Write your complaint or feedback…"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-[13px] outline-none focus:border-[#d32f2f]"
                />
              </div>
              <button
                type="submit"
                className="h-10 w-full cursor-pointer rounded-xl border-0 bg-[#d32f2f] text-[13px] font-semibold text-white hover:bg-[#b71c1c]"
              >
                Submit complaint
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
