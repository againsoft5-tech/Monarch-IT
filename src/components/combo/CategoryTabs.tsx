'use client'

import type { ComboGroup } from '@/data/comboData'

type Props = {
  groups: ComboGroup[]
  activeKey: string
  selectedCounts: Record<string, number>
  color: string
  onChange: (key: string) => void
}

export default function CategoryTabs({ groups, activeKey, selectedCounts, color, onChange }: Props) {
  return (
    <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100 mb-4 w-fit max-w-full overflow-x-auto">
      {groups.map((g) => {
        const active = g.key === activeKey
        const count = selectedCounts[g.key] ?? 0
        return (
          <button
            key={g.key}
            type="button"
            onClick={() => onChange(g.key)}
            className={`shrink-0 px-4 sm:px-5 h-9 rounded-full text-[12.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              active ? 'text-white' : 'text-gray-600'
            }`}
            style={active ? { backgroundColor: color } : undefined}
          >
            {g.label}
            {g.required && <span className={active ? 'text-white/80' : 'text-[#bd2026]'}>*</span>}
            {count > 0 && (
              <span
                className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center ${
                  active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
