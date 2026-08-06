import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import { offerList } from '@/data/offers'

export default function OffersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Offers', href: '/offers' }]} />
      <div className="container mx-auto px-4 min-[992px]:px-14 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4d4d4d]">Offers & Deals</h1>
          <p className="mt-1.5 text-[15px] md:text-base text-gray-500">
            Grab the best discounts across {offerList.length} deal{offerList.length === 1 ? '' : 's'}.
          </p>
        </div>

        {offerList.length === 0 ? (
          <div className="text-center py-16">
            <span className="mi text-[56px] text-gray-300 block mb-4">local_offer</span>
            <p className="text-[14px] text-gray-500">No active offers right now. Please check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerList.map((offer) => {
              const detailsHref = offer.link ?? `/offers/${offer.slug}`
              return (
                <div
                  key={offer.slug}
                  className="bg-white border border-[#f0f0f0] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
                >
                  <Link href={detailsHref} className="relative block aspect-square bg-[#f5f6fa]">
                    <Image src={offer.image} alt={offer.title} fill className="object-cover" />
                  </Link>

                  <div className="p-4 text-center">
                    <div className="flex items-center justify-between gap-3 text-[12px] text-gray-400 mb-3 pb-3 border-b border-gray-100">
                      <span className="inline-flex items-center gap-1">
                        <span className="mi text-[16px]">calendar_month</span>
                        {offer.startDate} - {offer.endDate}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="mi text-[16px]">storefront</span>
                        {offer.outletLabel}
                      </span>
                    </div>

                    <h2 className="text-[16px] font-bold text-gray-900 mb-1">{offer.title}</h2>
                    <p className="text-[13px] text-gray-500 mb-4">{offer.description}</p>

                    <Link
                      href={detailsHref}
                      className="inline-flex items-center justify-center bg-[#d32f2f] text-white text-[14px] font-semibold px-8 py-2.5 rounded-full no-underline hover:bg-[#b71c1c] transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
