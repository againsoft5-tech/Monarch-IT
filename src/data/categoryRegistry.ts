import { drawerCategories, featuredCategories, shopTopCategories } from './categories'

export type Crumb = { label: string; href: string }

export type CategoryInfo = {
  slug: string
  name: string
  breadcrumb: Crumb[]
}

function stripSlash(href: string) {
  return href.replace(/^\//, '')
}

const registry = new Map<string, CategoryInfo>()

for (const cat of drawerCategories) {
  const topSlug = stripSlash(cat.href)
  if (!registry.has(topSlug)) {
    registry.set(topSlug, {
      slug: topSlug,
      name: cat.name,
      breadcrumb: [
        { label: 'Home', href: '/' },
        { label: cat.name, href: cat.href },
      ],
    })
  }

  for (const sub of cat.sub) {
    const subSlug = stripSlash(sub.href)
    registry.set(subSlug, {
      slug: subSlug,
      name: sub.name,
      breadcrumb: [
        { label: 'Home', href: '/' },
        { label: cat.name, href: cat.href },
        { label: sub.name, href: sub.href },
      ],
    })
  }
}

for (const cat of shopTopCategories) {
  const slug = stripSlash(cat.href)
  if (!registry.has(slug)) {
    registry.set(slug, {
      slug,
      name: cat.name,
      breadcrumb: [
        { label: 'Home', href: '/' },
        { label: cat.name, href: cat.href },
      ],
    })
  }
}

for (const cat of featuredCategories) {
  const slug = stripSlash(cat.href)
  if (!registry.has(slug)) {
    registry.set(slug, {
      slug,
      name: cat.name,
      breadcrumb: [
        { label: 'Home', href: '/' },
        { label: cat.name, href: cat.href },
      ],
    })
  }
}

export function getCategoryInfo(slug: string): CategoryInfo | undefined {
  return registry.get(slug)
}

export function getAllCategorySlugs(): string[] {
  return Array.from(registry.keys())
}
