import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import CategoryPage from '@/components/category/CategoryPage'
import { getBrandInfo, getBrandProducts } from '@/data/brandIndex'

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params

  const info = getBrandInfo(brand)
  if (!info) notFound()

  const products = getBrandProducts(brand)
  const priceMinDefault = products.length ? Math.min(...products.map((p) => p.priceNew)) : 0
  const priceMaxDefault = products.length ? Math.max(...products.map((p) => p.priceNew)) : 0

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Brands', href: '/brands' },
          { label: info.name, href: `/brands/${info.slug}` },
        ]}
      />
      <CategoryPage
        categoryName={info.name}
        products={products}
        priceMinDefault={priceMinDefault}
        priceMaxDefault={priceMaxDefault}
      />
    </>
  )
}
