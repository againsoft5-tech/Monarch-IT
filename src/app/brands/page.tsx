import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import { brandList } from '@/data/brandIndex'

export default function BrandsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Brands', href: '/brands' }]} />
      <div className="container mx-auto px-4 min-[992px]:px-14 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4d4d4d]">All Brands</h1>
          <p className="mt-1.5 text-[15px] md:text-base text-gray-500">
            Browse {brandList.length} brands available at Monarch IT.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {brandList.map((b) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className="flex flex-col items-center gap-3 bg-white border border-[#f0f0f0] rounded-2xl px-4 py-6 no-underline shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
            >
              <span className="w-16 h-16 rounded-full bg-[#f5f6fa] flex items-center justify-center overflow-hidden shrink-0">
                {b.logo ? (
                  <Image src={b.logo} alt={b.name} width={64} height={64} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="text-xl font-bold text-[#c3272b]">{b.name.charAt(0).toUpperCase()}</span>
                )}
              </span>
              <span className="text-[14px] font-semibold text-gray-800 text-center truncate max-w-full">{b.name}</span>
              <span className="text-[11.5px] text-gray-400">
                {b.productCount} product{b.productCount === 1 ? '' : 's'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
