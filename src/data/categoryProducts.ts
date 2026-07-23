import * as desktops from './categoryData/desktops'
import * as laptop from './categoryData/laptop'
import * as component from './categoryData/component'
import * as monitor from './categoryData/monitor'
import * as upsIps from './categoryData/ups-ips'
import * as officeEquipments from './categoryData/office-equipments'
import * as mobileAccessories from './categoryData/mobile-accessories'
import * as airConditioner from './categoryData/air-conditioner'
import * as security from './categoryData/security'
import * as networking from './categoryData/networking'
import * as accessories from './categoryData/accessories'
import * as serverAndStorage from './categoryData/server-and-storage'
import * as gadget from './categoryData/gadget'
import * as gaming from './categoryData/gaming'

export type CategoryProduct = {
  id: string
  slug: string
  name: string
  image: string
  rating: number
  reviews: number
  priceNew: number
  priceOld: number
  discountPct: number
}

export type CategoryCatalog = {
  products: CategoryProduct[]
  priceMin: number
  priceMax: number
}

// Real product listings are only wired up for categories we've scraped so far.
// Any slug not present here falls back to an empty catalog in the category page.
export const categoryProductsMap: Record<string, CategoryCatalog> = {
  desktops,
  laptop,
  component,
  monitor,
  'ups-ips': upsIps,
  'office-equipments': officeEquipments,
  'mobile-accessories': mobileAccessories,
  'air-conditioner': airConditioner,
  security,
  networking,
  accessories,
  'server-and-storage': serverAndStorage,
  gadget,
  gaming,
}
