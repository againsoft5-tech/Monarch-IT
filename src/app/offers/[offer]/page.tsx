import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import OfferInfoPage from '@/components/offers/OfferInfoPage'
import { getOfferInfo } from '@/data/offers'

export default async function OfferPage({ params }: { params: Promise<{ offer: string }> }) {
  const { offer } = await params

  const info = getOfferInfo(offer)
  if (!info) notFound()

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Offers', href: '/offers' },
          { label: info.title, href: `/offers/${info.slug}` },
        ]}
      />
      <OfferInfoPage offer={info} />
    </>
  )
}
