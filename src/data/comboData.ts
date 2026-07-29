export type DiscountType = 'percent' | 'fixed'

export type ComboProduct = {
  id: string
  name: string
  image: string
  brand: string
  priceOld: number
  discountType: DiscountType
  discountValue: number
  specs?: string[]
}

export type ComboGroup = {
  key: string
  label: string
  required: boolean
  maxQuantity: number
  products: ComboProduct[]
}

export type ComboBonusTier = {
  minGroups: number
  bonusAmount: number
}

export type ComboCampaign = {
  id: string
  name: string
  active: boolean
  startDate?: string
  endDate?: string
  themeColor?: string
  bannerImage?: string
  groups: ComboGroup[]
  bonusTiers: ComboBonusTier[]
  createdAt: string
  updatedAt: string
}

export function priceNewOf(product: ComboProduct): number {
  const raw =
    product.discountType === 'percent'
      ? product.priceOld * (1 - product.discountValue / 100)
      : product.priceOld - product.discountValue
  return Math.max(0, Math.round(raw))
}

export function discountAmountOf(product: ComboProduct): number {
  return product.priceOld - priceNewOf(product)
}

const PLACEHOLDER_IMG = '/images/pc-builder/icons/storage-active.svg'

export const DEFAULT_CAMPAIGNS: ComboCampaign[] = [
  {
    id: 'nas-combo-builder',
    name: 'NAS Combo Builder',
    active: true,
    themeColor: '#c3272b',
    bannerImage: undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    bonusTiers: [
      { minGroups: 2, bonusAmount: 1500 },
      { minGroups: 3, bonusAmount: 3000 },
      { minGroups: 4, bonusAmount: 5000 },
    ],
    groups: [
      {
        key: 'nas',
        label: 'NAS',
        required: true,
        maxQuantity: 1,
        products: [
          {
            id: 'nas-ugreen-dxp4800-pro',
            name: 'Ugreen DXP4800 PRO NAS',
            image: PLACEHOLDER_IMG,
            brand: 'Ugreen',
            priceOld: 79900,
            discountType: 'fixed',
            discountValue: 3400,
            specs: ['4-Bay', 'Intel Pentium Gold', 'Up to 32GB RAM'],
          },
          {
            id: 'nas-ugreen-dh2300',
            name: 'Ugreen DH2300 NASync Storage Hub',
            image: PLACEHOLDER_IMG,
            brand: 'Ugreen',
            priceOld: 22900,
            discountType: 'fixed',
            discountValue: 1000,
            specs: ['2-Bay', 'HDMI Cable Included'],
          },
          {
            id: 'nas-ugreen-dh4300plus',
            name: 'Ugreen DH4300Plus Network Storage',
            image: PLACEHOLDER_IMG,
            brand: 'Ugreen',
            priceOld: 44900,
            discountType: 'fixed',
            discountValue: 2000,
            specs: ['4-Bay'],
          },
          {
            id: 'nas-ugreen-dxp2800',
            name: 'Ugreen NASync DXP2800, 2-Bay NAS with Intel N100',
            image: PLACEHOLDER_IMG,
            brand: 'Ugreen',
            priceOld: 40900,
            discountType: 'fixed',
            discountValue: 1800,
            specs: ['2-Bay', 'Intel N100 Quad-Core'],
          },
        ],
      },
      {
        key: 'hdd',
        label: 'HDD',
        required: false,
        maxQuantity: 2,
        products: [
          {
            id: 'hdd-seagate-ironwolf-4tb',
            name: 'Seagate IronWolf 4TB NAS HDD',
            image: PLACEHOLDER_IMG,
            brand: 'Seagate',
            priceOld: 13900,
            discountType: 'percent',
            discountValue: 8,
            specs: ['4TB', '5900RPM', 'NAS Rated'],
          },
          {
            id: 'hdd-wd-red-6tb',
            name: 'WD Red Plus 6TB NAS HDD',
            image: PLACEHOLDER_IMG,
            brand: 'WD',
            priceOld: 19900,
            discountType: 'percent',
            discountValue: 10,
            specs: ['6TB', '5400RPM', 'NAS Rated'],
          },
        ],
      },
      {
        key: 'ssd',
        label: 'SSD',
        required: false,
        maxQuantity: 2,
        products: [
          {
            id: 'ssd-samsung-980pro-1tb',
            name: 'Samsung 980 PRO 1TB NVMe SSD',
            image: PLACEHOLDER_IMG,
            brand: 'Samsung',
            priceOld: 11900,
            discountType: 'percent',
            discountValue: 12,
            specs: ['1TB', 'NVMe Gen4'],
          },
        ],
      },
      {
        key: 'memory',
        label: 'Memory',
        required: false,
        maxQuantity: 2,
        products: [
          {
            id: 'memory-kingston-16gb',
            name: 'Kingston 16GB DDR4 SODIMM',
            image: PLACEHOLDER_IMG,
            brand: 'Kingston',
            priceOld: 5900,
            discountType: 'fixed',
            discountValue: 300,
            specs: ['16GB', 'DDR4 3200MHz'],
          },
        ],
      },
    ],
  },
]
