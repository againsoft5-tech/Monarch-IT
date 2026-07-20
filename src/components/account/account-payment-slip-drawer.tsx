'use client'

import { useEffect, useMemo } from 'react'
import { formatCurrency } from '@/lib/currency'
import type { AccountPaymentRow } from '@/data/accountData'

const STORE = {
  name: 'Monarchit',
  tagline: 'Top tech product store in Bangladesh',
  phone: '01901871752',
  address: 'Dhaka, Bangladesh',
}

type Props = {
  open: boolean
  payment: AccountPaymentRow | null
  onClose: () => void
}

export default function AccountPaymentSlipDrawer({ open, payment, onClose }: Props) {
  const shareText = useMemo(() => {
    if (!payment) return ''
    return [
      `${STORE.name} — Payment Slip`,
      `Payment ID: ${payment.id}`,
      `Order: ${payment.orderId}`,
      `Amount: ${formatCurrency(payment.amount)}`,
      `Method: ${payment.method}`,
      `Status: ${payment.status}`,
      payment.trxId ? `TrxID: ${payment.trxId}` : null,
      `Date: ${payment.paidAt || payment.date}`,
      payment.customerName ? `Customer: ${payment.customerName}` : null,
    ]
      .filter(Boolean)
      .join('\n')
  }, [payment])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const waHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`
  const mailHref = `mailto:${payment?.customerEmail || ''}?subject=${encodeURIComponent(
    `${STORE.name} Payment Slip ${payment?.id || ''}`,
  )}&body=${encodeURIComponent(shareText)}`

  const isComplete = payment?.status.toLowerCase() === 'completed'

  const handlePrint = () => {
    const node = document.getElementById('payment-slip-print')
    if (!node) return
    const win = window.open('', '_blank', 'width=400,height=700')
    if (!win) return
    win.document.write(`<!doctype html><html><head><title>Payment Slip</title>
      <style>
        @page { size: 80mm auto; margin: 4mm; }
        body { margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
        .slip { width: 72mm; color: #111; font-size: 11px; line-height: 1.45; }
      </style></head><body>
      <div class="slip">${node.innerHTML}</div>
      <script>window.onload=function(){window.print();window.close();}<\\/script>
      </body></html>`)
    win.document.close()
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[10000] bg-black/45 transition-opacity ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      />

      <aside
        className={`fixed top-0 right-0 z-[10001] flex h-full w-[92%] max-w-[420px] flex-col bg-[#f0f1f3] shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Payment slip"
        aria-hidden={!open}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3.5">
          <div>
            <p className="m-0 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Payment slip
            </p>
            <p className="m-0 text-[15px] font-bold text-gray-900">{payment?.id || '—'}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-[#f4f5f7] text-gray-700 hover:bg-gray-200"
          >
            <span className="mi text-[22px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 md:px-4">
          {!payment ? (
            <p className="py-10 text-center text-[13px] text-gray-400">No payment selected.</p>
          ) : !isComplete ? (
            <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-8 text-center">
              <span className="mi text-[32px] text-amber-500">hourglass_empty</span>
              <p className="mt-2 mb-0 text-[14px] font-bold text-amber-800">Slip not ready</p>
              <p className="mt-1 mb-0 text-[12px] text-amber-700/80">
                Payment slip is available after the payment is completed.
              </p>
            </div>
          ) : (
            <>
              <div className="mx-auto w-[302px] max-w-full overflow-hidden rounded-sm bg-white shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
                <div
                  id="payment-slip-print"
                  className="px-3 py-4 text-[11px] leading-relaxed text-gray-900"
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  }}
                >
                  <div className="text-center">
                    <p className="m-0 text-[15px] font-bold tracking-wide">{STORE.name}</p>
                    <p className="m-0 mt-0.5 text-[10px] text-gray-500">{STORE.tagline}</p>
                    <p className="m-0 mt-1 text-[10px] text-gray-500">{STORE.address}</p>
                    <p className="m-0 text-[10px] text-gray-500">Tel: {STORE.phone}</p>
                  </div>

                  <DashLine />
                  <p className="m-0 text-center text-[12px] font-bold tracking-[0.12em]">
                    PAYMENT RECEIPT
                  </p>
                  <DashLine />

                  <SlipRow label="Payment ID" value={payment.id} />
                  <SlipRow label="Order ID" value={payment.orderId} />
                  <SlipRow label="Date" value={payment.paidAt || payment.date} />
                  <SlipRow label="Method" value={payment.method} />
                  {payment.trxId ? <SlipRow label="Trx ID" value={payment.trxId} /> : null}
                  <SlipRow label="Status" value={payment.status.toUpperCase()} />

                  <DashLine />

                  {payment.customerName ? <SlipRow label="Customer" value={payment.customerName} /> : null}
                  {payment.customerPhone ? <SlipRow label="Phone" value={payment.customerPhone} /> : null}
                  {payment.note ? <SlipRow label="Note" value={payment.note} /> : null}

                  <DashLine />

                  <div className="flex items-end justify-between gap-2 py-1">
                    <span className="text-[12px] font-bold">AMOUNT PAID</span>
                    <span className="text-[16px] font-bold tabular-nums tracking-tight">
                      {formatCurrency(payment.amount)}
                    </span>
                  </div>

                  <DashLine />

                  <p className="m-0 text-center text-[10px] text-gray-500">*** Thank you ***</p>
                  <p className="m-0 mt-1 text-center text-[9px] text-gray-400">
                    Keep this slip for your records
                  </p>
                  <p className="m-0 mt-2 text-center text-[9px] tracking-[0.2em] text-gray-300">
                    ||||||||||||||||||||||||||||
                  </p>
                  <p className="m-0 text-center text-[9px] text-gray-400">{payment.id}</p>
                </div>
              </div>

              <div className="mx-auto mt-4 flex w-[302px] max-w-full flex-col gap-2">
                <p className="m-0 text-center text-[11px] font-semibold text-gray-500">
                  Share this slip
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2.5 text-[12px] font-semibold text-white no-underline hover:brightness-95"
                  >
                    <span className="mi text-[16px] leading-none">chat</span>
                    WhatsApp
                  </a>
                  <a
                    href={mailHref}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[12px] font-semibold text-gray-800 no-underline hover:border-[#d32f2f] hover:text-[#d32f2f]"
                  >
                    <span className="mi text-[16px] leading-none">mail</span>
                    Email
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 bg-white px-3 py-2 text-[12px] font-semibold text-gray-600 hover:border-gray-400"
                >
                  <span className="mi text-[16px] leading-none">print</span>
                  Print (POS 80mm)
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  )
}

function DashLine() {
  return <div className="my-2 h-0 border-t border-dashed border-gray-400" aria-hidden />
}

function SlipRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-0.5">
      <span className="shrink-0 text-gray-500">{label}</span>
      <span className="break-all text-right font-semibold">{value}</span>
    </div>
  )
}
