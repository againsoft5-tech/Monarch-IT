import { componentProducts, monitorProducts, refrigeratorProducts } from './products'
import { categoryProductsMap } from './categoryProducts'
import { drawerCategories } from './categories'

export type SearchProduct = {
  slug: string
  name: string
  image: string
  priceNew: number
  priceOld: number | null
}

export const searchProducts: SearchProduct[] = [
  ...monitorProducts,
  ...componentProducts,
  ...refrigeratorProducts,
  ...Object.values(categoryProductsMap).flatMap((c) => c.products),
].map(({ slug, name, image, priceNew, priceOld }) => ({ slug, name, image, priceNew, priceOld }))

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
