import { searchProducts, type SearchProduct } from './searchIndex'
import { brands as curatedBrands } from './brands'
import { getProductDetail } from './productDetail'

export type BrandInfo = {
  name: string
  slug: string
  logo?: string
  productCount: number
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

type BrandGroup = {
  variantCounts: Map<string, number>
  products: Map<string, SearchProduct>
}

const groups = new Map<string, BrandGroup>()

for (const product of searchProducts) {
  const rawBrand = getProductDetail(product.slug)?.brand || product.name.split(' ')[0]
  if (!rawBrand) continue
  const key = rawBrand.toLowerCase()

  let group = groups.get(key)
  if (!group) {
    group = { variantCounts: new Map(), products: new Map() }
    groups.set(key, group)
  }
  group.variantCounts.set(rawBrand, (group.variantCounts.get(rawBrand) ?? 0) + 1)
  group.products.set(product.slug, product)
}

const curatedLogoByName = new Map(curatedBrands.map((b) => [b.name.toLowerCase(), b.logo]))

function pickDisplayName(group: BrandGroup) {
  let best = ''
  let bestCount = -1
  for (const [variant, count] of group.variantCounts) {
    if (count > bestCount) {
      best = variant
      bestCount = count
    }
  }
  return best
}

const brandEntries: { info: BrandInfo; products: SearchProduct[] }[] = []

for (const [key, group] of groups) {
  const name = pickDisplayName(group)
  const products = Array.from(group.products.values())
  brandEntries.push({
    info: {
      name,
      slug: slugify(name),
      logo: curatedLogoByName.get(key),
      productCount: products.length,
    },
    products,
  })
}

brandEntries.sort((a, b) => a.info.name.localeCompare(b.info.name))

export const brandList: BrandInfo[] = brandEntries.map((e) => e.info)

const productsBySlug = new Map(brandEntries.map((e) => [e.info.slug, e.products]))
const infoBySlug = new Map(brandEntries.map((e) => [e.info.slug, e.info]))

export function getBrandInfo(slug: string): BrandInfo | undefined {
  return infoBySlug.get(slug)
}

export function getBrandProducts(slug: string): SearchProduct[] {
  return productsBySlug.get(slug) ?? []
}
