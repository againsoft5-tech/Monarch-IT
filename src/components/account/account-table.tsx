'use client'

import type { ReactNode } from 'react'

export type AccountColumn = {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

type Props = {
  columns: AccountColumn[]
  emptyText?: string
  toolbar?: ReactNode
  children?: ReactNode
  rowCount?: number
}

export default function AccountTable({
  columns,
  emptyText = 'No data',
  toolbar,
  children,
  rowCount = 0,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
      {toolbar ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 py-2.5 md:px-4">
          {toolbar}
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-[#fafbfc]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`whitespace-nowrap px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-gray-500 md:px-4 ${
                    col.align === 'center'
                      ? 'text-center'
                      : col.align === 'right'
                        ? 'text-right'
                        : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowCount > 0 ? (
              children
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-16 text-center text-[13px] text-gray-400"
                >
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function StatusBadge({
  label,
  tone = 'amber',
}: {
  label: string
  tone?: 'amber' | 'blue' | 'green' | 'red' | 'gray'
}) {
  const styles: Record<string, string> = {
    amber: 'bg-amber-50 text-amber-700',
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    red: 'bg-red-50 text-red-700',
    gray: 'bg-gray-100 text-gray-600',
  }
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap ${styles[tone]}`}
    >
      {label}
    </span>
  )
}

export function TableAction({
  children,
  onClick,
  href,
  variant = 'ghost',
}: {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'ghost' | 'primary' | 'outline'
}) {
  const cls =
    variant === 'primary'
      ? 'bg-[#d32f2f] text-white hover:bg-[#b71c1c] border-transparent'
      : variant === 'outline'
        ? 'border-gray-200 bg-white text-gray-700 hover:border-[#d32f2f] hover:text-[#d32f2f]'
        : 'border-transparent bg-transparent text-[#d32f2f] hover:underline'

  if (href) {
    return (
      <a
        href={href}
        className={`inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold no-underline transition-colors ${cls}`}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center justify-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-colors ${cls}`}
    >
      {children}
    </button>
  )
}
