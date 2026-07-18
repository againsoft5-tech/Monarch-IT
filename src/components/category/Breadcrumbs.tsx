import Link from 'next/link'

export type Crumb = { label: string; href: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <section className="after-header breadcrumbs bg-white">
      <div className="container mx-auto px-4 min-[992px]:px-14 py-3">
        <ul className="flex items-center gap-1.5 text-[13px] text-gray-500 m-0 p-0 list-none">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li
                key={`${item.href}-${item.label}`}
                className={`flex items-center gap-1.5 min-w-0 ${isLast ? 'flex-1' : 'shrink-0'}`}
              >
                {i > 0 && <span className="text-gray-300 shrink-0">/</span>}
                {isLast ? (
                  <span className="text-gray-700 font-medium truncate block" title={item.label}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="whitespace-nowrap hover:text-[#d32f2f] no-underline transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
