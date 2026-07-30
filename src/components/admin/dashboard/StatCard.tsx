import Link from 'next/link'

const RED = '#bd2026'

export default function StatCard({
  icon,
  value,
  label,
  delta,
  href,
}: {
  icon: string
  value: string
  label: string
  delta?: { text: string; up: boolean }
  href?: string
}) {
  const content = (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-5 h-full">
      <div className="w-11 h-11 rounded-2xl bg-[#fdecec] flex items-center justify-center">
        <span className="mi text-[22px]" style={{ color: RED }}>
          {icon}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900 m-0 mt-4 leading-tight">{value}</p>
      <div className="flex items-center justify-between gap-2 mt-1">
        <p className="text-[13px] text-gray-500 m-0">{label}</p>
        {delta && (
          <span
            className={`shrink-0 text-[12px] font-semibold flex items-center gap-0.5 ${
              delta.up ? 'text-[#10b981]' : 'text-[#ef4444]'
            }`}
          >
            {delta.text}
            <span className="mi text-[14px]">{delta.up ? 'arrow_upward' : 'arrow_downward'}</span>
          </span>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block no-underline transition-transform hover:-translate-y-0.5">
        {content}
      </Link>
    )
  }

  return content
}
