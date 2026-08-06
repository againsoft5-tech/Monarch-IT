import { componentProducts, monitorProducts, refrigeratorProducts } from './products'
import { categoryProductsMap, type CategoryProduct } from './categoryProducts'
import { drawerCategories } from './categories'

export type SearchProduct = CategoryProduct

const legacyProducts: SearchProduct[] = [
  ...monitorProducts,
  ...componentProducts,
  ...refrigeratorProducts,
].map((p) => ({
  id: p.slug,
  slug: p.slug,
  name: p.name,
  image: p.image,
  rating: p.rating,
  reviews: p.reviews,
  priceNew: p.priceNew,
  priceOld: p.priceOld ?? p.priceNew,
  discountPct: p.discountPct ?? 0,
}))

export const searchProducts: SearchProduct[] = [
  ...legacyProducts,
  ...Object.values(categoryProductsMap).flatMap((c) => c.products),
]

export type SearchCategory = { name: string; href: string }

export const searchCategories: SearchCategory[] = (() => {
  const seen = new Set<string>()
  const list: SearchCategory[] = []
  drawerCategories.forEach((cat) => {
    if (!seen.has(cat.name)) {
      seen.add(cat.name)
      list.push({ name: cat.name, href: cat.href })
    }
    cat.sub.forEach((s) => {
      if (!seen.has(s.name)) {
        seen.add(s.name)
        list.push({ name: s.name, href: s.href })
      }
    })
  })
  return list
})()
