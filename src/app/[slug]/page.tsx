import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import CategoryPage from '@/components/category/CategoryPage'
import ProductDetailPage from '@/components/product/ProductDetailPage'
import { getCategoryInfo } from '@/data/categoryRegistry'
import { categoryProductsMap } from '@/data/categoryProducts'
import { getProductDetail } from '@/data/productDetail'

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const product = getProductDetail(slug)
  if (product) {
    return (
      <>
        <Breadcrumbs items={product.breadcrumb} />
        <ProductDetailPage product={product} />
      </>
    )
  }

  const info = getCategoryInfo(slug)
  if (!info) notFound()

  const catalog = categoryProductsMap[slug]

  return (
    <>
      <Breadcrumbs items={info.breadcrumb} />
      <CategoryPage
        categoryName={info.name}
        products={catalog?.products ?? []}
        priceMinDefault={catalog?.priceMin ?? 0}
        priceMaxDefault={catalog?.priceMax ?? 0}
      />
    </>
  )
}
