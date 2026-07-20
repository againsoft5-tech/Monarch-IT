'use client'

import { useMemo, useState } from 'react'
import { formatCurrency } from '@/lib/currency'
import { getOrderDetail, getOrderRows, type AccountOrderDetail, type AccountOrderRow } from '@/data/accountData'
import AccountOrderDetailDrawer from './account-order-detail-drawer'
import AccountPaymentDrawer from './account-payment-drawer'
import AccountTable, { StatusBadge, TableAction } from './account-table'

export default function AccountOrdersView() {
  const [orders] = useState<AccountOrderRow[]>(() => getOrderRows())
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null)
  const [activeDetail, setActiveDetail] = useState<AccountOrderDetail | null>(null)
  const [payOrderIds, setPayOrderIds] = useState<string[]>([])

  const allSelected = orders.length > 0 && orders.every((o) => selected[o.id])
  const selectedCount = useMemo(() => orders.filter((o) => selected[o.id]).length, [orders, selected])
  const selectedDue = useMemo(
    () => orders.filter((o) => selected[o.id]).reduce((sum, o) => sum + o.due, 0),
    [orders, selected],
  )
  const payOrders = useMemo(() => orders.filter((o) => payOrderIds.includes(o.id)), [orders, payOrderIds])

  const toggleAll = () => {
    if (allSelected) {
      setSelected({})
      return
    }
    const next: Record<string, boolean> = {}
    for (const o of orders) next[o.id] = true
    setSelected(next)
  }

  const openDetails = (orderId: string) => {
    setActiveOrderId(orderId)
    setActiveDetail(getOrderDetail(orderId) ?? null)
  }

  const openPay = (orderIds: string[]) => {
    setActiveOrderId(null)
    setPayOrderIds(orderIds)
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="m-0 text-[17px] font-bold text-gray-900">Orders</h1>
          <p className="m-0 mt-0.5 text-[12px] text-gray-500">
            Select unpaid orders and pay together, or open details.
          </p>
        </div>
      </div>

      <AccountTable
        columns={[
          { key: 'check', label: '', className: 'w-10' },
          { key: 'order', label: 'Order ID' },
          { key: 'product', label: 'Product', align: 'center' },
          { key: 'total', label: 'Total', align: 'right' },
          { key: 'paid', label: 'Paid', align: 'right' },
          { key: 'due', label: 'Due', align: 'right' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions', align: 'right' },
        ]}
        rowCount={orders.length}
        toolbar={
          <>
            <label className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="h-3.5 w-3.5 accent-[#d32f2f]"
              />
              Select All to Pay
            </label>
            {selectedCount > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[12px] text-gray-500">
                  {selectedCount} selected · Due {formatCurrency(selectedDue)}
                </span>
                <TableAction
                  variant="primary"
                  onClick={() => openPay(orders.filter((o) => selected[o.id]).map((o) => o.id))}
                >
                  Pay selected
                </TableAction>
              </div>
            ) : null}
          </>
        }
      >
        {orders.length === 0 ? (
          <tr>
            <td colSpan={8} className="px-4 py-10 text-center text-[13px] text-gray-500">
              No orders yet.
            </td>
          </tr>
        ) : (
          orders.map((row) => (
            <tr key={row.id} className="border-b border-gray-50 last:border-0 hover:bg-[#fafbfc]">
              <td className="px-3 py-3 md:px-4">
                <input
                  type="checkbox"
                  checked={Boolean(selected[row.id])}
                  onChange={() => setSelected((prev) => ({ ...prev, [row.id]: !prev[row.id] }))}
                  className="h-3.5 w-3.5 accent-[#d32f2f]"
                  aria-label={`Select ${row.id}`}
                />
              </td>
              <td className="px-3 py-3 md:px-4">
                <button
                  type="button"
                  onClick={() => openDetails(row.id)}
                  className="m-0 cursor-pointer border-0 bg-transparent p-0 text-left text-[13px] font-bold text-[#d32f2f] hover:underline"
                >
                  {row.id}
                </button>
                <p className="m-0 mt-0.5 text-[11px] text-gray-400">{row.date}</p>
              </td>
              <td className="px-3 py-3 text-center md:px-4">
                <TableAction variant="outline" onClick={() => openDetails(row.id)}>
                  {row.productLabel}
                </TableAction>
              </td>
              <td className="px-3 py-3 text-right text-[13px] font-semibold tabular-nums text-gray-800 md:px-4">
                {formatCurrency(row.total)}
              </td>
              <td className="px-3 py-3 text-right text-[13px] tabular-nums text-gray-600 md:px-4">
                {formatCurrency(row.paid)}
              </td>
              <td className="px-3 py-3 text-right text-[13px] font-bold tabular-nums text-[#d32f2f] md:px-4">
                {formatCurrency(row.due)}
              </td>
              <td className="px-3 py-3 md:px-4">
                <StatusBadge label={row.status} tone="amber" />
              </td>
              <td className="px-3 py-3 md:px-4">
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  <TableAction variant="primary" onClick={() => openPay([row.id])}>
                    Pay
                  </TableAction>
                  <TableAction variant="outline" onClick={() => openDetails(row.id)}>
                    Details
                  </TableAction>
                </div>
              </td>
            </tr>
          ))
        )}
      </AccountTable>

      <AccountOrderDetailDrawer
        open={Boolean(activeOrderId)}
        detail={activeDetail}
        onClose={() => {
          setActiveOrderId(null)
          setActiveDetail(null)
        }}
        onPay={(orderId) => openPay([orderId])}
      />

      <AccountPaymentDrawer open={payOrderIds.length > 0} orders={payOrders} onClose={() => setPayOrderIds([])} />
    </div>
  )
}
