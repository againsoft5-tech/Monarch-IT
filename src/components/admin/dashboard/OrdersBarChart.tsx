'use client'

import { useState } from 'react'

const RED = '#bd2026'

type Point = { label: string; value: number }

function niceMax(value: number) {
  if (value <= 0) return 10
  const exponent = Math.floor(Math.log10(value))
  const magnitude = 10 ** exponent
  const residual = value / magnitude
  const niceResidual = residual > 5 ? 10 : residual > 2 ? 5 : residual > 1 ? 2 : 1
  return niceResidual * magnitude
}

function roundedTopBarPath(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, Math.max(h, 0))
  if (h <= 0) return ''
  return `M${x},${y + h} L${x},${y + rr} Q${x},${y} ${x + rr},${y} L${x + w - rr},${y} Q${x + w},${y} ${x + w},${y + rr} L${x + w},${y + h} Z`
}

const W = 340
const H = 260
const PAD = { top: 16, right: 10, bottom: 28, left: 30 }
const plotW = W - PAD.left - PAD.right
const plotH = H - PAD.top - PAD.bottom

export default function OrdersBarChart({ data }: { data: Point[] }) {
  const [hover, setHover] = useState<number | null>(null)
  const max = niceMax(Math.max(...data.map((d) => d.value)))
  const bandWidth = plotW / data.length
  const barWidth = Math.min(24, bandWidth * 0.5)

  const ticks = [0, 0.5, 1].map((t) => ({ y: PAD.top + plotH * (1 - t), value: Math.round(max * t) }))

  const hoverBar =
    hover !== null
      ? {
          cx: PAD.left + bandWidth * hover + bandWidth / 2,
          y: H - PAD.bottom - plotH * (data[hover].value / max),
        }
      : null

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ aspectRatio: `${W} / ${H}` }} className="w-full block overflow-visible">
        {ticks.map((t) => (
          <g key={t.value}>
            <line x1={PAD.left} x2={W - PAD.right} y1={t.y} y2={t.y} stroke="#eef0f3" strokeWidth={1} />
            <text x={PAD.left - 8} y={t.y + 4} textAnchor="end" fontSize={11} fill="#9ca3af">
              {t.value}
            </text>
          </g>
        ))}

        {data.map((d, i) => {
          const barH = plotH * (d.value / max)
          const cx = PAD.left + bandWidth * i + bandWidth / 2
          const x = cx - barWidth / 2
          const y = H - PAD.bottom - barH
          const isHover = hover === i
          return (
            <g key={d.label}>
              <path
                d={roundedTopBarPath(x, y, barWidth, barH, 4)}
                fill={RED}
                opacity={isHover ? 1 : 0.85}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
              />
              <text x={cx} y={H - PAD.bottom + 18} textAnchor="middle" fontSize={11} fill="#9ca3af">
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>

      {hoverBar && hover !== null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] bg-gray-900 text-white rounded-xl px-3 py-2 text-[12px] shadow-lg whitespace-nowrap z-10"
          style={{ left: `${(hoverBar.cx / W) * 100}%`, top: `${(hoverBar.y / H) * 100}%` }}
        >
          <p className="font-bold m-0">{data[hover].value} orders</p>
          <p className="text-gray-300 m-0 text-[11px]">{data[hover].label}</p>
        </div>
      )}
    </div>
  )
}
