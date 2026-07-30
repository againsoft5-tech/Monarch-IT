'use client'

import { useMemo, useRef, useState } from 'react'

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

function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${Math.round(n / 1000)}K`
  return String(Math.round(n))
}

const W = 720
const H = 260
const PAD = { top: 16, right: 16, bottom: 28, left: 46 }
const plotW = W - PAD.left - PAD.right
const plotH = H - PAD.top - PAD.bottom

export default function RevenueAreaChart({ data, valuePrefix = '৳' }: { data: Point[]; valuePrefix?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hover, setHover] = useState<number | null>(null)

  const max = useMemo(() => niceMax(Math.max(...data.map((d) => d.value))), [data])

  const points = useMemo(
    () =>
      data.map((d, i) => ({
        x: PAD.left + (i * plotW) / (data.length - 1),
        y: PAD.top + plotH * (1 - d.value / max),
        label: d.label,
        value: d.value,
      })),
    [data, max]
  )

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const last = points[points.length - 1]
  const areaPath = `${linePath} L${last.x},${H - PAD.bottom} L${points[0].x},${H - PAD.bottom} Z`
  const labelStride = Math.ceil(points.length / 8)

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({ y: PAD.top + plotH * (1 - t), value: max * t }))

  const handleMove = (e: React.PointerEvent<SVGRectElement>) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const relX = ((e.clientX - rect.left) / rect.width) * W
    const idx = Math.round(((relX - PAD.left) / plotW) * (data.length - 1))
    setHover(Math.min(Math.max(idx, 0), data.length - 1))
  }

  const active = hover !== null ? points[hover] : null

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        style={{ aspectRatio: `${W} / ${H}` }}
        className="w-full block overflow-visible"
      >
        {ticks.map((t) => (
          <g key={t.value}>
            <line x1={PAD.left} x2={W - PAD.right} y1={t.y} y2={t.y} stroke="#eef0f3" strokeWidth={1} />
            <text x={PAD.left - 10} y={t.y + 4} textAnchor="end" fontSize={11} fill="#9ca3af">
              {formatCompact(t.value)}
            </text>
          </g>
        ))}

        <path d={areaPath} fill={RED} opacity={0.1} stroke="none" />
        <path d={linePath} fill="none" stroke={RED} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, i) =>
          i % labelStride === 0 ? (
            <text key={p.label} x={p.x} y={H - PAD.bottom + 18} textAnchor="middle" fontSize={11} fill="#9ca3af">
              {p.label}
            </text>
          ) : null
        )}

        <text x={last.x} y={last.y - 12} textAnchor="end" fontSize={12} fontWeight={700} fill="#111827">
          {valuePrefix}
          {formatCompact(last.value)}
        </text>
        <circle cx={last.x} cy={last.y} r={5} fill={RED} stroke="#fff" strokeWidth={2} />

        {active && (
          <>
            <line x1={active.x} x2={active.x} y1={PAD.top} y2={H - PAD.bottom} stroke="#d1d5db" strokeWidth={1} />
            <circle cx={active.x} cy={active.y} r={5} fill={RED} stroke="#fff" strokeWidth={2} />
          </>
        )}

        <rect
          x={PAD.left}
          y={PAD.top}
          width={plotW}
          height={plotH}
          fill="transparent"
          onPointerMove={handleMove}
          onPointerLeave={() => setHover(null)}
        />
      </svg>

      {active && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] bg-gray-900 text-white rounded-xl px-3 py-2 text-[12px] shadow-lg whitespace-nowrap z-10"
          style={{ left: `${(active.x / W) * 100}%`, top: `${(active.y / H) * 100}%` }}
        >
          <p className="font-bold m-0">
            {valuePrefix}
            {active.value.toLocaleString()}
          </p>
          <p className="text-gray-300 m-0 text-[11px]">{active.label}</p>
        </div>
      )}
    </div>
  )
}
