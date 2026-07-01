import Link from 'next/link'

export type Crumb = { label: string; href: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <section className="after-header breadcrumbs bg-white min-[992px]:pl-20">
      <div className="container mx-auto px-4 py-3">
        <ul className="flex items-center flex-wrap gap-1.5 text-[13px] text-gray-500 m-0 p-0 list-none">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-gray-300">/</span>}
              {i === items.length - 1 ? (
                <span className="text-gray-700 font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-[#d32f2f] no-underline transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
