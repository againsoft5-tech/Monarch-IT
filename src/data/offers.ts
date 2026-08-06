import { categoryProductsMap, type CategoryProduct } from './categoryProducts'
import { getCategoryInfo } from './categoryRegistry'

export type OfferSection = {
  key: string
  label: string
  products: CategoryProduct[]
}

export type OfferInfo = {
  slug: string
  title: string
  description: string
  /** Longer promotional text shown in place of the date/outlet row when set. */
  richDescription?: string
  image: string
  startDate: string
  endDate: string
  endDateISO: string
  outletLabel: string
  /** When set, the "View Details" button on the offers list page goes here instead of the built-in offer info page. */
  link?: string
  maxDiscountPct: number
  productCount: number
  sections: OfferSection[]
  terms: string[]
}

const START_DATE = '05 Aug 2026'
const END_DATE = '31 Aug 2026'
const END_DATE_ISO = '2026-08-31T23:59:59'

const DEFAULT_TERMS = [
  'Offer valid while stocks last.',
  'Prices shown are inclusive of VAT.',
  'Images are for illustration purposes only; actual product may vary.',
  'Delivery charges may apply outside Dhaka city.',
  'Monarch IT reserves the right to modify, extend, or withdraw this offer at any time without prior notice.',
  'This offer cannot be combined with any other ongoing promotion.',
]

function discountedProducts(categorySlug: string): CategoryProduct[] {
  return (categoryProductsMap[categorySlug]?.products ?? []).filter((p) => p.discountPct > 0)
}

function buildSections(categorySlugs: string[]): OfferSection[] {
  const sections: OfferSection[] = []
  for (const slug of categorySlugs) {
    const products = discountedProducts(slug)
    if (products.length === 0) continue
    sections.push({ key: slug, label: getCategoryInfo(slug)?.name ?? slug, products })
  }
  return sections
}

function buildOffer(input: {
  slug: string
  title: string
  description: string
  richDescription?: string
  image: string
  categorySlugs: string[]
  link?: string
}): OfferInfo | null {
  const sections = buildSections(input.categorySlugs)
  if (sections.length === 0) return null

  const allProducts = sections.flatMap((s) => s.products)

  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    richDescription: input.richDescription,
    image: input.image,
    startDate: START_DATE,
    endDate: END_DATE,
    endDateISO: END_DATE_ISO,
    outletLabel: 'All Outlet',
    link: input.link,
    maxDiscountPct: Math.max(...allProducts.map((p) => p.discountPct)),
    productCount: allProducts.length,
    sections,
    terms: DEFAULT_TERMS,
  }
}

export const offerList: OfferInfo[] = (
  [
    buildOffer({
      slug: 'computer-gaming-deal',
      title: 'Computer & Gaming Deal',
      description: 'Buy Desktop, Laptop & Gaming Gear and enjoy exciting discounts with free delivery!',
      richDescription:
        'বিশ্বসেরা ব্র্যান্ডের যেকোনো Desktop, Laptop & Gaming Gear কিনলেই পাচ্ছেন আকর্ষণীয় মূল্যছাড় এবং ফ্রি ডেলিভারি! সাথে "FREEDELIVERY" (অথবা আপনার নির্দিষ্ট প্রমোকোড) ব্যবহার করে উপভোগ করুন Free Delivery। আরও রয়েছে বিকাশ-এ যেকোনো পেমেন্ট করলে ক্যাশব্যাক সুবিধা এবং ০% ইএমআই (0% EMI) সুবিধা তো থাকছেই। অর্ডার করুন এখনই!',
      image: '/images/offers/computer-and-gaming-deals.png',
      categorySlugs: ['desktops', 'laptop', 'component', 'monitor', 'gaming'],
    }),
    buildOffer({
      slug: 'home-office-deal',
      title: 'Home & Office Deal',
      description: 'Buy AC, UPS & Office Equipment and enjoy exciting discounts with free delivery!',
      image: '/images/offers/home-and-office-deals.png',
      categorySlugs: ['air-conditioner', 'ups-ips', 'office-equipments', 'security'],
    }),
  ] as (OfferInfo | null)[]
).filter((o): o is OfferInfo => o !== null)

const infoBySlug = new Map(offerList.map((o) => [o.slug, o]))

export function getOfferInfo(slug: string): OfferInfo | undefined {
  return infoBySlug.get(slug)
}
