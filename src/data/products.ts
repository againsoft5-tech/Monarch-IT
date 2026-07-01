export type Product = {
  name: string
  slug: string
  image: string
  rating: number
  reviews: number
  priceNew: number
  priceOld: number | null
  discountPct: number | null
}

export const monitorProducts: Product[] = [
  {
    name: 'THL TH2400B 24 INCH DK4 BASIC LED HD TV',
    slug: 'thl-th2400b-24-inch-dk4-basic-led-hd-tv',
    image:
      '/images/image/cache/catalog/tv-/thl/th2400b/thl-th2400b-24-inch-dk4-basic-led-hd-tv-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 9900,
    priceOld: 12900,
    discountPct: 23,
  },
  {
    name: 'THL 32 Inch TH3200BB BASIC LED HD TV',
    slug: 'thl-32-inch-th3200bb-basic-led-hd-tv',
    image:
      '/images/image/cache/catalog/tv-/thl/th2400b/thl-th2400b-24-inch-dk4-basic-led-hd-tv-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 12900,
    priceOld: 13900,
    discountPct: 7,
  },
  {
    name: 'THL TH3200S 32 INCH SMART ANDROID LED HD TV',
    slug: 'thl-th3200s-32-inch-dk4-smart-android-led-hd-tv',
    image:
      '/images/image/cache/catalog/tv-/thl/th3200s/thl-th3200s-32-inch-dk4-smart-android-led-hd-tv-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 14900,
    priceOld: 16990,
    discountPct: 12,
  },
  {
    name: 'THL 32 Inch -TH3200SDG-DUAL GLASS SMART LED HD TV',
    slug: 'thl-32-th3200sdg-dual-glass-smart-led-hd-tv',
    image: '/images/image/cache/catalog/tv-/thl/th3200sdg/thl-tv-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 17900,
    priceOld: 19900,
    discountPct: 10,
  },
  {
    name: 'THL TH4300S 43 Inch SMART ANDROID LED FHD TV',
    slug: 'thl-th4300s-dk4l-smart-android-led-hd-tv',
    image: '/images/image/cache/catalog/tv-/thl/th4300s/th4300s-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 23900,
    priceOld: 29900,
    discountPct: 20,
  },
  {
    name: 'THL TH5000S 50 Inch SMART ANDROID LED FHD TV',
    slug: 'thl-th5000s-50inch-smart-android-led-hd-tv',
    image:
      '/images/image/cache/catalog/tv-/thl/thl-smart-android-led-hd-tv/thl-smart-android-led-hd-tv-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 36900,
    priceOld: 44900,
    discountPct: 18,
  },
  {
    name: 'THL TH5500S 55 Inch SMART ANDROID LED 4K TV',
    slug: 'thl-th5500s-55inch-smart-android-led-4k-tv',
    image:
      '/images/image/cache/catalog/tv-/thl/thl-smart-android-led-hd-tv/thl-smart-android-led-hd-tv-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 46900,
    priceOld: 55900,
    discountPct: 16,
  },
  {
    name: 'THL TH6500S 65 Inch Smart Android LED 4K TV',
    slug: 'thl-th6500s-65inch-smart-android-led-4k-tv',
    image:
      '/images/image/cache/catalog/tv-/thl/thl-smart-android-led-hd-tv/thl-smart-android-led-hd-tv-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 67900,
    priceOld: 79900,
    discountPct: 15,
  },
]

export const componentProducts: Product[] = [
  {
    name: 'Dahua DHI-LM24-B201E 23.8 inch 100hz IPS FHD Monitor',
    slug: 'dahua-dhi-lm24-b201e-23.8-100hz-ips-fhd-monitor',
    image:
      '/images/image/cache/catalog/DHI-LM24-B201E/imgi_2_dhi-lm24-b201e-01-500x500-228x228.png',
    rating: 4.9,
    reviews: 80,
    priceNew: 16500,
    priceOld: null,
    discountPct: null,
  },
  {
    name: 'Dahua DHI-LM27-B221 27 inch FHD 144Hz IPS Gaming Monitor',
    slug: 'dahua-dhi-lm27-b221-27-inch-fhd-144hz-ips-gaming-monitor',
    image:
      '/images/image/cache/catalog/DHI-LM27-B221/imgi_2_dhi-lm24-b221-01-500x500-228x228.png',
    rating: 4.9,
    reviews: 80,
    priceNew: 19500,
    priceOld: null,
    discountPct: null,
  },
  {
    name: 'Dahua DHI-LM25-E231 25 inch IPS FHD 180Hz Gaming Monitor',
    slug: 'dahua-dhi-lm25-e231-25-inch-ips-fhd-180hz-gaming-monitor',
    image:
      '/images/image/cache/catalog/DHI-LM25-E231/imgi_2_dhi-lm25-e231-01-500x500-228x228.png',
    rating: 4.9,
    reviews: 80,
    priceNew: 19500,
    priceOld: null,
    discountPct: null,
  },
  {
    name: 'Dahua DHI-LM24-P301A-A5 24 inch 2K QHD IPS Monitor',
    slug: 'dahua-dhi-lm24-p301a-a5-24-inch-2k-qhd-ips-monitor',
    image:
      '/images/image/cache/catalog/DHI-LM24-P301A-A5/imgi_2_dhi-lm24-p301a-a5-01-500x500-228x228.png',
    rating: 4.9,
    reviews: 80,
    priceNew: 34500,
    priceOld: null,
    discountPct: null,
  },
  {
    name: 'Dahua DHI-LM27-P301A-A5 24 inch 2K QHD IPS Monitor',
    slug: 'dahua-dhi-lm27-p301a-a5-24-inch-2k-qhd-ips-monitor',
    image:
      '/images/image/cache/catalog/DHI-LM27-P301A-A5/imgi_2_dhi-lm24-p301a-a5-01-500x500-228x228.png',
    rating: 4.9,
    reviews: 80,
    priceNew: 36500,
    priceOld: null,
    discountPct: null,
  },
  {
    name: 'Dahua DHI-LM32-P301A 31.5 inch IPS Professional Monitor',
    slug: 'dahua-dhi-lm32-p301a-31.5-inch-ips-professional-monitor',
    image:
      '/images/image/cache/catalog/DHI-LM32-P301A/imgi_2_dhi-lm32-p301a-01-500x500-228x228.png',
    rating: 4.9,
    reviews: 80,
    priceNew: 42000,
    priceOld: 45570,
    discountPct: 8,
  },
  {
    name: 'Dahua DHI-LM27-E341A 27 inch QHD IPS 240Hz Gaming Monitor',
    slug: 'dahua-dhi-lm27-e341a-27-inch-qhd-ips-240hz-gaming-monitor',
    image:
      '/images/image/cache/catalog/DHI-LM27-E341A/imgi_2_dhi-lm27-e341a-02-500x500-228x228.png',
    rating: 4.9,
    reviews: 80,
    priceNew: 37500,
    priceOld: 40700,
    discountPct: 8,
  },
  {
    name: 'Dahua DHI-LM34-E330C 34 inch UltraWide WQHD Gaming Curved Monitor',
    slug: 'dahua-lm34-e330c-34-inch-ultrawide-wqhd-gaming-curved-monitor',
    image:
      '/images/image/cache/catalog/DHI-LM34-E330C/imgi_2_lm34-e330c-01-500x500-228x228.png',
    rating: 4.9,
    reviews: 80,
    priceNew: 52200,
    priceOld: null,
    discountPct: null,
  },
]

export const refrigeratorProducts: Product[] = [
  {
    name: 'Haier HRF-622IBG 600L Side-by-Side No Frost Refrigerator',
    slug: 'haier-hrf-622ibg-600l-sbs-no-frost-refrigerator',
    image:
      '/images/image/cache/catalog/refrigerators/Haier-Ref/HRF-622IBG/W020210420755310380614_1200-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 134900,
    priceOld: 145900,
    discountPct: 8,
  },
  {
    name: 'Haier HRF-578TBG 522Ltr Black French T-Door No Frost Refrigerator',
    slug: 'haier-522l-no-frost-refrigerator-hrf-578tbg',
    image:
      '/images/image/cache/catalog/refrigerators/Haier-Ref/578BG/haier-hrf-578tbg-522l-refrigerat-(2)-228x228.png',
    rating: 5,
    reviews: 1,
    priceNew: 134900,
    priceOld: 139900,
    discountPct: 4,
  },
  {
    name: 'Samsung RS72R5011B4/D3 700 Liters Side by Side Refrigerator',
    slug: 'samsung-rs72r5011b4d3-700-liters-side-by-side-refrigerator',
    image:
      '/images/image/cache/catalog/samsung-refrigerator/rs72r5011b4/samsung-rs72r5011b4d3-700-liters-side-by-side-refrigerator-(3)-228x228.png',
    rating: 4.9,
    reviews: 80,
    priceNew: 164900,
    priceOld: 192900,
    discountPct: 15,
  },
  {
    name: 'Haier HCF-230SGM 200 Liter Chest Freezer',
    slug: 'haier-hcf-230sg-200-liter-chest-freezer',
    image:
      '/images/image/cache/catalog/haier/fridge/hcf-230sg/e7070404-1720-4d33-b3d4-30819386-228x228.png',
    rating: 4,
    reviews: 4,
    priceNew: 37900,
    priceOld: 48400,
    discountPct: 22,
  },
  {
    name: 'Haier HCF-340SM 301L Chest Freezer',
    slug: 'haier-hcf-340n-301l-chest-freezer',
    image:
      '/images/image/cache/catalog/refrigerators/Haier-Deep-Freezer/HCF-340N/HCF-340N-228x228.png',
    rating: 4.9,
    reviews: 80,
    priceNew: 49900,
    priceOld: 59400,
    discountPct: 16,
  },
  {
    name: 'Haier HCF-230SGE 200L Chest Freezer',
    slug: 'haier-hcf-230ge-chest-freezer',
    image:
      '/images/image/cache/catalog/refrigerators/Haier-Deep-Freezer/HCF-230GE/W020240515762114902662_1200-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 43690,
    priceOld: 51400,
    discountPct: 15,
  },
  {
    name: 'Haier HCF-175SGE 142 Liter Chest Freezer',
    slug: 'haier-hcf-175ge-chest-freezer',
    image:
      '/images/image/cache/catalog/refrigerators/Haier-Deep-Freezer/HCF-230GE/W020240515759342082853_1200-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 36900,
    priceOld: 43900,
    discountPct: 16,
  },
  {
    name: 'Samsung 10.8 cu.ft. Bespoke Refrigerator TMF AI Energy Cotta Charcoal',
    slug: 'samsung-305-l.-bespoke-refrigerator',
    image:
      '/images/image/cache/catalog/Refrigerator/Samsung/RT31CB5624C2TC/RT31CB5624C2TC-228x228.jpg',
    rating: 4.9,
    reviews: 80,
    priceNew: 91900,
    priceOld: 96900,
    discountPct: 5,
  },
]

export const featuredTabs = [
  { label: 'Monitor', products: monitorProducts },
  { label: 'Components', products: componentProducts },
  { label: 'Refrigerator', products: refrigeratorProducts },
]
