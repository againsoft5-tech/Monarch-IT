import { getProductDetail, type ProductDetail } from '@/data/productDetail'
import type { CategoryProduct } from '@/data/categoryProducts'
import type { CompareProduct, CompareSection } from '@/data/compareProducts'

function splitSpecLine(line: string): [string, string] {
  const idx = line.indexOf(':')
  if (idx === -1) return [line, '']
  return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()]
}

export function toCompareProduct(detail: ProductDetail): CompareProduct {
  const sections: CompareSection[] = detail.specGroups.map((g) => ({
    title: g.label,
    rows: g.lines.map(splitSpecLine),
  }))

  return {
    slug: detail.slug,
    name: detail.name,
    model: detail.model ?? detail.brand,
    accent: '#d32f2f',
    rating: detail.rating,
    reviews: detail.reviewCount,
    priceNew: detail.priceNew,
    priceOld: detail.priceOld,
    discountPct: detail.discountPct,
    sections,
  }
}

export function categoryProductToCompare(product: CategoryProduct): CompareProduct {
  const detail = getProductDetail(product.slug)
  if (detail) return toCompareProduct(detail)

  return {
    slug: product.slug,
    name: product.name,
    model: product.name,
    accent: '#d32f2f',
    rating: product.rating,
    reviews: product.reviews,
    priceNew: product.priceNew,
    priceOld: product.priceOld,
    discountPct: product.discountPct,
    sections: [],
  }
}
