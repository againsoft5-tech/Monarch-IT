import type { CategoryProduct } from '../categoryProducts'
import type { ProductDetail } from '../productDetail'

export const products: CategoryProduct[] = [
  {
    id: 'B7NY9PT',
    slug: 'hp-280-pro-g9-mt-core-i5-14th-gen-desktop-pc',
    name: 'HP 280 Pro G9 MT Core i5 14th Gen Brand PC',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-02-500x500__1_-removebg-preview-250x250.png',
    rating: 0,
    reviews: 0,
    priceNew: 90000,
    priceOld: 96300,
    discountPct: 7,
  },
  {
    id: 'B7NY6PT',
    slug: 'hp-280-pro-g9-mt-core-i3-14th-gen-desktop-pc',
    name: 'HP 280 Pro G9 MT Core i3 14th Gen Brand PC',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-01-500x500-removebg-preview-250x250.png',
    rating: 0,
    reviews: 0,
    priceNew: 77000,
    priceOld: 82390,
    discountPct: 7,
  },
  {
    id: 'lenovo-thinkcentre-neo-50s-gen-4-core-i3-brand-pc',
    slug: 'lenovo-thinkcentre-neo-50s-gen-4-core-i3-brand-pc',
    name: 'Lenovo ThinkCentre Neo 50s Gen 4 Core i3 13th Gen 1TB HDD Brand PC',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-1TB-HDD-Brand-PC-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 52500,
    priceOld: 56175,
    discountPct: 7,
  },
  {
    id: 'lenovo-thinkcentre-neo-50t-gen-4-core-i5-brand-pc',
    slug: 'lenovo-thinkcentre-neo-50t-gen-4-core-i5-brand-pc',
    name: 'Lenovo ThinkCentre Neo 50t Gen 4 Core i5 13th Gen Brand PC',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 65500,
    priceOld: 70085,
    discountPct: 7,
  },
  {
    id: 'lenovo-thinkcentre-neo-50s-gen-4-core-i3-13th-gen-brand-pc',
    slug: 'lenovo-thinkcentre-neo-50s-gen-4-core-i3-13th-gen-brand-pc',
    name: 'Lenovo ThinkCentre Neo 50s Gen 4 Core i3 13th Gen 512GB SSD Brand PC',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 52500,
    priceOld: 56175,
    discountPct: 7,
  },
  {
    id: 'lenovo-thinkcentre-neo-50t-core-i3-12th-gen-tower-brand-pc',
    slug: 'lenovo-thinkcentre-neo-50t-core-i3-12th-gen-tower-brand-pc',
    name: 'Lenovo ThinkCentre neo 50t Core i3 12th Gen Tower Business Brand PC',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-neo-50t-Core-i3-12th-Gen-Tower-Business-Brand-PC-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 52000,
    priceOld: 55640,
    discountPct: 7,
  },
  {
    id: '11SWS0NB00',
    slug: 'lenovo-thinkcentre-neo-50s-core-i7-1tb-ssd-brand-pc',
    name: 'Lenovo ThinkCentre Neo 50s Core i7 12th Gen 1TB SSD Brand PC',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-1TB-SSD-Brand-PC-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 72500,
    priceOld: 77575,
    discountPct: 7,
  },
  {
    id: '11SYS2FQ00',
    slug: 'lenovo-thinkcentre-neo-50s-core-i7-brand-pc',
    name: 'Lenovo ThinkCentre Neo 50s Core i7 12th Gen Brand PC',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-Brand-PC-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 82000,
    priceOld: 87740,
    discountPct: 7,
  },
]

export const priceMin = Math.min(...products.map((p) => p.priceNew))
export const priceMax = Math.max(...products.map((p) => p.priceNew))

export const details: ProductDetail[] = [
  {
    slug: 'hp-280-pro-g9-mt-core-i5-14th-gen-desktop-pc',
    name: 'HP 280 Pro G9 MT Core i5 14th Gen Brand PC',
    brand: 'HP',
    model: '280 Pro G9 MT',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Desktop', href: '/desktops' },
      { label: 'HP 280 Pro G9 MT Core i5 14th Gen Brand PC', href: '/hp-280-pro-g9-mt-core-i5-14th-gen-desktop-pc' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-02-500x500__1_-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-02-500x500__1_-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-03-500x500__1_-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-03-500x500__1_-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-07-500x500-(1)-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-07-500x500-(1)-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-05-500x500-(1)-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-05-500x500-(1)-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-06-500x500-(1)-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-06-500x500-(1)-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 90000,
    priceOld: 96300,
    discountPct: 7,
    keyFeatures: [
      'Intel Core i5-14500 (24 MB cache, up to 5.00 GHz turbo)',
      '8GB DDR4 RAM with 512GB NVMe PCIe SSD storage',
      'Integrated Intel UHD Graphics 770',
      'Includes HP USB Keyboard & Mouse',
      'Multiple connectivity ports including USB 3.0, HDMI, and VGA',
      '3 years manufacturer warranty',
    ],
    specGroups: [
      {
        label: 'Processor & Graphics',
        lines: [
          '14th Gen Intel Core i5-14500 (14 cores, 20 threads, 65W, up to 5.00 GHz)',
          'Integrated Intel UHD Graphics 770',
          'Motherboard: Intel H670 Chipset',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: ['8GB DDR4 RAM', '512GB NVMe PCIe SSD'],
      },
      {
        label: 'Connectivity',
        lines: [
          '2x USB 2.0, 4x USB 3.0 Type-A, 2x USB 3.0 Type-C',
          '1x HDMI, 1x VGA/D-Sub',
          '1x RJ-45, Wi-Fi 802.11ac, Bluetooth 4.2',
          '1x full-height PCI, 2x M.2, 1x PCIe 3x1, 1x PCIe 4x16 expansion',
        ],
      },
      {
        label: 'Audio & Accessories',
        lines: [
          'Realtek ALC3867 codec with combo microphone/headphone jack',
          'HP USB Keyboard and HP USB Mouse included',
        ],
      },
      {
        label: 'Power, Physical & Warranty',
        lines: [
          '180W power supply',
          'FreeDOS operating system',
          'Dimensions: 55 x 305 x 337mm, Weight: 4.7 kg',
          'Color: Black',
          'Warranty: 3 years',
        ],
      },
    ],
    descriptionTitle: 'HP 280 Pro G9 MT Core i5 14th Gen Brand PC',
    descriptionParagraph:
      'A 14th Gen Intel Core i5 business desktop with 8GB DDR4 RAM and a 512GB NVMe PCIe SSD, built on the Intel H670 chipset with integrated UHD Graphics 770 for everyday office computing.',
  },
  {
    slug: 'hp-280-pro-g9-mt-core-i3-14th-gen-desktop-pc',
    name: 'HP 280 Pro G9 MT Core i3 14th Gen Brand PC',
    brand: 'HP',
    model: '280 Pro G9 MT',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Desktop', href: '/desktops' },
      { label: 'HP 280 Pro G9 MT Core i3 14th Gen Brand PC', href: '/hp-280-pro-g9-mt-core-i3-14th-gen-desktop-pc' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-01-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-01-500x500-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-02-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-02-500x500-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-03-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-03-500x500-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-07-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-07-500x500-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-05-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-05-500x500-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-06-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/280-pro-g9-06-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 77000,
    priceOld: 82390,
    discountPct: 7,
    keyFeatures: [
      '14th Generation Intel Core i3-14100 (3.50 up to 4.70GHz, 12MB cache)',
      '8GB DDR4 RAM with 512GB NVMe PCIe SSD storage',
      'Intel UHD Graphics 770',
      'Includes HP USB Keyboard & Mouse',
      'Multiple connectivity ports including USB 3.0, HDMI, and VGA',
      '3-year manufacturer warranty',
    ],
    specGroups: [
      {
        label: 'Processor & Graphics',
        lines: [
          'Intel Core i3-14100 (12M Cache, up to 4.70 GHz)',
          'Integrated Intel UHD Graphics 770',
          'Motherboard: Intel H670 Chipset',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: ['8GB DDR4 RAM', '512GB NVMe PCIe SSD'],
      },
      {
        label: 'Connectivity',
        lines: [
          '2x USB 2.0, 4x USB 3.0 Type-A, 2x USB 3.0 Type-C',
          '1x HDMI, 1x VGA/D-Sub',
          '1x RJ-45, Wi-Fi 802.11a/b/g/n/ac (2x2), Bluetooth 4.2',
          '1x full-height PCI, 2x M.2, 1x PCIe 3x1, 1x PCIe 4x16 expansion',
        ],
      },
      {
        label: 'Audio & Accessories',
        lines: [
          'Realtek ALC3867 codec, combo microphone/headphone jack',
          'HP USB Keyboard & Mouse included',
        ],
      },
      {
        label: 'Power, Physical & Warranty',
        lines: [
          '180W power supply',
          'FreeDOS operating system',
          'Dimensions: 55 x 305 x 337mm, Weight: 4.7 kg',
          'Color: Black',
          'Warranty: 3 years',
        ],
      },
    ],
    descriptionTitle: 'HP 280 Pro G9 MT Core i3 14th Gen Brand PC',
    descriptionParagraph:
      'An entry-level 14th Gen Intel Core i3 business desktop with 8GB DDR4 RAM and a 512GB NVMe PCIe SSD, offering dependable everyday performance backed by a 3-year warranty.',
  },
  {
    slug: 'lenovo-thinkcentre-neo-50s-gen-4-core-i3-brand-pc',
    name: 'Lenovo ThinkCentre Neo 50s Gen 4 Core i3 13th Gen 1TB HDD Brand PC',
    brand: 'Lenovo',
    model: 'ThinkCentre Neo 50s Gen 4',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Desktop', href: '/desktops' },
      { label: 'Lenovo ThinkCentre Neo 50s Gen 4 Core i3 13th Gen 1TB HDD Brand PC', href: '/lenovo-thinkcentre-neo-50s-gen-4-core-i3-brand-pc' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-1TB-HDD-Brand-PC-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-1TB-HDD-Brand-PC-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-1TB-HDD-Brand-PC1-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-1TB-HDD-Brand-PC1-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-1TB-HDD-Brand-PC2-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-1TB-HDD-Brand-PC2-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-1TB-HDD-Brand-PC3-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-1TB-HDD-Brand-PC3-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 52500,
    priceOld: 56175,
    discountPct: 7,
    keyFeatures: [
      'Intel Core i3-13100 processor, base 3.6 GHz turbo to 4.2 GHz',
      '8GB DDR4 RAM, 1TB HDD, and 256GB SSD for storage and performance',
      'Intel UHD Graphics 730 for daily computing and light multimedia',
      'Diverse ports: USB 3.2 Gen 1 & 2, USB-C, HDMI, DisplayPort, Ethernet',
      'TPM 2.0 security with 3-year manufacturer warranty',
      'Compact black design with high-definition audio system',
    ],
    specGroups: [
      {
        label: 'Processor & Graphics',
        lines: [
          'Intel Core i3-13100 (12M Cache, up to 4.50 GHz)',
          'Integrated Intel UHD Graphics 730',
          'Motherboard: Intel B760 Chipset',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: ['8GB DDR4-3200MHz RAM, expandable to 32GB', '1TB HDD + 256GB NVMe SSD'],
      },
      {
        label: 'Connectivity',
        lines: [
          'Front: 2x USB 3.2 Gen 1, 2x USB 3.2 Gen 2, 1x USB-C 3.2 Gen 1',
          'Rear: 4x USB 2.0',
          '1x VGA, 1x HDMI 1.4b, 1x DisplayPort 1.4',
          '1x Serial (9-pin), 1x Ethernet (RJ-45)',
          'Expansion: 1x PCIe 4.0 x16, 2x PCIe 3.0 x1, 2x M.2 slots',
        ],
      },
      {
        label: 'Security & Accessories',
        lines: [
          'Discrete TPM 2.0, TCG certified',
          'HD Audio, Realtek ALC222-CG codec',
          'USB Calliope Keyboard & Mouse included',
        ],
      },
      {
        label: 'Power, Physical & Warranty',
        lines: [
          '180W power supply',
          'FreeDOS operating system',
          'Color: Black, Weight: ~5.5 kg',
          'Warranty: 3 years',
        ],
      },
    ],
    descriptionTitle: 'Lenovo ThinkCentre Neo 50s Gen 4 Core i3 13th Gen 1TB HDD Brand PC',
    descriptionParagraph:
      'This desktop delivers exceptional performance for professional and personal computing. The i3-13100 processor enables smooth and efficient performance across business applications and multimedia tasks, while the combined 1TB HDD and 256GB SSD storage facilitates fast data access.',
  },
  {
    slug: 'lenovo-thinkcentre-neo-50t-gen-4-core-i5-brand-pc',
    name: 'Lenovo ThinkCentre Neo 50t Gen 4 Core i5 13th Gen Brand PC',
    brand: 'Lenovo',
    model: 'ThinkCentre Neo 50t Gen 4',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Desktop', href: '/desktops' },
      { label: 'Lenovo ThinkCentre Neo 50t Gen 4 Core i5 13th Gen Brand PC', href: '/lenovo-thinkcentre-neo-50t-gen-4-core-i5-brand-pc' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC1-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC1-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC2-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC2-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC3-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC3-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 65500,
    priceOld: 70085,
    discountPct: 7,
    keyFeatures: [
      'Intel Core i5-13500 (24M Cache, up to 4.80 GHz)',
      '8GB DDR4-3200MHz memory with expandable capacity',
      '256GB NVMe SSD for rapid data access',
      'Integrated Intel UHD Graphics 770 for everyday computing',
      'Multiple connectivity: USB 3.2, USB-C, HDMI, DisplayPort, Ethernet',
      '3 years warranty included',
    ],
    specGroups: [
      {
        label: 'Processor & Graphics',
        lines: [
          'Intel Core i5-13500 (12M Cache, P-core 4.8GHz / E-core 3.5GHz)',
          'Integrated Intel UHD Graphics 770',
          'Motherboard: Intel B760 Chipset',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: [
          '8GB DDR4-3200MHz RAM, upgradeable to 32GB, two DDR4 UDIMM slots',
          '256GB NVMe SSD; two M.2 slots (one for WLAN, one for SSD)',
        ],
      },
      {
        label: 'Connectivity',
        lines: [
          'Front: 2x USB 3.2 Gen 1, 2x USB 3.2 Gen 2, 1x USB-C 3.2 Gen 1, headphone/mic jacks',
          'Rear: 4x USB 2.0, 1x VGA, 1x HDMI 1.4b, 1x DisplayPort 1.4, 1x serial (9-pin), 1x Ethernet (RJ-45)',
          'Input: USB Calliope Keyboard and Mouse',
        ],
      },
      {
        label: 'Security',
        lines: ['Discrete TPM 2.0, TCG certified'],
      },
      {
        label: 'Power, Physical & Warranty',
        lines: [
          '260W power supply',
          'One PCIe 4.0 x16 slot, two PCIe 3.0 x1 slots',
          'FreeDOS operating system',
          'Dimensions: 145 x 294 x 340 mm, Weight: ~5.5 kg',
          'Warranty: 3 years',
        ],
      },
    ],
    descriptionTitle: 'Lenovo ThinkCentre Neo 50t Gen 4 Core i5 13th Gen Brand PC',
    descriptionParagraph:
      'This desktop merges professional-grade capabilities with user-friendly design. The Intel Core i5-13500 processor delivers consistent multitasking performance suitable for office environments, with integrated audio and abundant ports for peripheral connectivity.',
  },
  {
    slug: 'lenovo-thinkcentre-neo-50s-gen-4-core-i3-13th-gen-brand-pc',
    name: 'Lenovo ThinkCentre Neo 50s Gen 4 Core i3 13th Gen 512GB SSD Brand PC',
    brand: 'Lenovo',
    model: 'ThinkCentre Neo 50s Gen 4',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Desktop', href: '/desktops' },
      { label: 'Lenovo ThinkCentre Neo 50s Gen 4 Core i3 13th Gen 512GB SSD Brand PC', href: '/lenovo-thinkcentre-neo-50s-gen-4-core-i3-13th-gen-brand-pc' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC1-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC1-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC2-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC2-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC3-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Gen-4-Core-i3-13th-Gen-512GB-SSD-Brand-PC3-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 52500,
    priceOld: 56175,
    discountPct: 7,
    keyFeatures: [
      'Intel Core i3-13100 (12M Cache, up to 4.50 GHz), 4 cores/8 threads',
      '8GB DDR4-3200MHz RAM expandable to 64GB for seamless multitasking',
      '512GB NVMe SSD ensuring faster boot times and responsive performance',
      'Intel UHD Graphics 730 eliminating need for dedicated GPU',
      'Compact small form factor chassis weighing approximately 4.5 kg',
      'Intel Wi-Fi 6E AX211 wireless connectivity with Discrete TPM 2.0 security',
    ],
    specGroups: [
      {
        label: 'Processor & Graphics',
        lines: [
          'Intel Core i3-13100 (12M Cache, up to 4.50 GHz)',
          'Integrated Intel UHD Graphics 730',
          'Motherboard: Intel B660 Chipset',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: ['8GB DDR4-3200MHz RAM, expandable up to 64GB', '512GB NVMe SSD'],
      },
      {
        label: 'Connectivity',
        lines: [
          'Intel Wi-Fi 6E AX211 (802.11ax 2x2) + BT5.1, Ethernet (RJ-45)',
          'Front: 1x USB-C 3.2 Gen 1, 2x USB 3.2 Gen 1, headphone/mic jack, microphone jack',
          'Rear: 2x USB 2.0, 2x USB 3.2 Gen 1',
          '1x HDMI 2.1 TMDS, 1x DisplayPort 1.4, 1x VGA',
          'Expansion: one PCIe 4.0 x16, one PCIe 3.0 x1, two M.2 slots',
        ],
      },
      {
        label: 'Security & Accessories',
        lines: [
          'Discrete TPM 2.0, Kensington Security Slot',
          'HD Audio, Realtek ALC623-CG codec',
          'USB Calliope Keyboard & Mouse included',
        ],
      },
      {
        label: 'Power, Physical & Warranty',
        lines: [
          '180W power supply',
          'FreeDOS operating system',
          'Dimensions: 100 x 308 x 274.8 mm, Weight: ~4.5 kg, Color: Black',
          'ENERGY STAR 8.0, EPEAT Silver, ErP Lot 3, RoHS, TCO Certified',
          'Warranty: 3 years',
        ],
      },
    ],
    descriptionTitle: 'Lenovo ThinkCentre Neo 50s Gen 4 Core i3 13th Gen 512GB SSD Brand PC',
    descriptionParagraph:
      'A high-performance, compact desktop designed for efficient computing, suitable for both home and office environments. Advanced connectivity including Wi-Fi 6E, multiple USB ports and dual display outputs facilitate flexible device integration, with a 3-year warranty for extended peace of mind.',
  },
  {
    slug: 'lenovo-thinkcentre-neo-50t-core-i3-12th-gen-tower-brand-pc',
    name: 'Lenovo ThinkCentre neo 50t Core i3 12th Gen Tower Business Brand PC',
    brand: 'Lenovo',
    model: 'ThinkCentre neo 50t',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Desktop', href: '/desktops' },
      { label: 'Lenovo ThinkCentre neo 50t Core i3 12th Gen Tower Business Brand PC', href: '/lenovo-thinkcentre-neo-50t-core-i3-12th-gen-tower-brand-pc' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-neo-50t-Core-i3-12th-Gen-Tower-Business-Brand-PC-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-neo-50t-Core-i3-12th-Gen-Tower-Business-Brand-PC-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-neo-50t-Core-i3-12th-Gen-Tower-Business-Brand-PC1-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-neo-50t-Core-i3-12th-Gen-Tower-Business-Brand-PC1-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-neo-50t-Core-i3-12th-Gen-Tower-Business-Brand-PC2-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-neo-50t-Core-i3-12th-Gen-Tower-Business-Brand-PC2-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-neo-50t-Core-i3-12th-Gen-Tower-Business-Brand-PC3-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-neo-50t-Core-i3-12th-Gen-Tower-Business-Brand-PC3-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 52000,
    priceOld: 55640,
    discountPct: 7,
    keyFeatures: [
      'Intel Core i3-12100 (12M Cache, 3.30 GHz to 4.30 GHz)',
      '4GB DDR4-3200MHz memory',
      '1TB 7200rpm HDD 3.5" SATA storage',
      'Intel UHD Graphics 730 integrated graphics',
      'Discrete TPM 2.0 security with TCG certification',
      'Multiple expansion slots including PCIe 4.0 x16 and M.2 options',
    ],
    specGroups: [
      {
        label: 'Processor & Graphics',
        lines: [
          'Intel Core i3-12100 (12M Cache, 3.30 GHz to 4.30 GHz)',
          'Integrated Intel UHD Graphics 730',
          'Chipset: Intel B660',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: ['4GB DDR4-3200MHz RAM (two DDR4 UDIMM slots)', '1TB 7200rpm HDD 3.5" SATA', 'Slim DVD Writer 9.0mm optical drive'],
      },
      {
        label: 'Connectivity',
        lines: [
          'Front: 2x USB 3.2 Gen 1, 2x USB 3.2 Gen 2, 1x USB-C 3.2 Gen 1, audio jacks',
          'Rear: 4x USB 2.0, VGA, HDMI 1.4b, DisplayPort 1.4, serial port, Ethernet',
          'RealTek RTL8822CE Wi-Fi 2x2 AC & Bluetooth 5.0',
          'Expansion: one PCIe 4.0 x16 slot, two PCIe 3.0 x1 slots, two M.2 slots',
        ],
      },
      {
        label: 'Security & Power',
        lines: ['Discrete TPM 2.0, TCG certified', '260W Adapter'],
      },
      {
        label: 'Warranty',
        lines: ['FreeDOS operating system', 'Warranty: 3 years'],
      },
    ],
    descriptionTitle: 'Lenovo ThinkCentre neo 50t Core i3 12th Gen Tower Business Brand PC',
    descriptionParagraph:
      'This tower desktop delivers seamless multitasking and efficient performance for professional environments. The compact form factor accommodates office spaces while offering expandable memory capacity up to 64GB and multiple connectivity options.',
  },
  {
    slug: 'lenovo-thinkcentre-neo-50s-core-i7-1tb-ssd-brand-pc',
    name: 'Lenovo ThinkCentre Neo 50s Core i7 12th Gen 1TB SSD Brand PC',
    brand: 'Lenovo',
    model: '11SWS0NB00',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Desktop', href: '/desktops' },
      { label: 'Lenovo ThinkCentre Neo 50s Core i7 12th Gen 1TB SSD Brand PC', href: '/lenovo-thinkcentre-neo-50s-core-i7-1tb-ssd-brand-pc' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-1TB-SSD-Brand-PC-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-1TB-SSD-Brand-PC-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-1TB-SSD-Brand-PC1-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-1TB-SSD-Brand-PC1-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-1TB-SSD-Brand-PC2-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-1TB-SSD-Brand-PC2-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-1TB-SSD-Brand-PC3-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-1TB-SSD-Brand-PC3-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 72500,
    priceOld: 77575,
    discountPct: 7,
    keyFeatures: [
      '12th Gen Intel Core i7-12700 (12 cores, 20 threads, up to 4.90 GHz)',
      '8GB DDR4 RAM (expandable up to 64GB via 2 slots)',
      '1TB NVMe PCIe SSD for fast boot times and ample storage',
      'Integrated Intel UHD Graphics 770',
      'Discrete Trusted Platform Module (dTPM) 2.0 for enhanced data protection',
      '3 years warranty',
    ],
    specGroups: [
      {
        label: 'Processor',
        lines: [
          'Intel Core i7-12700 12th Generation, 12 cores (8P+4E), 20 threads',
          'P-core 2.1GHz / E-core 1.6GHz; Max Turbo up to 4.9GHz, 25MB cache',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: ['8GB DDR4 3200 MHz, 2 slots, supports up to 64GB', '1TB SSD storage'],
      },
      {
        label: 'Graphics & Display',
        lines: ['Integrated Intel UHD Graphics 770', 'Display outputs: HDMI 2.1, DisplayPort 1.4, VGA'],
      },
      {
        label: 'Connectivity',
        lines: [
          'Front: 1x USB-C 3.2 Gen 1, 2x USB 3.2 Gen 1, headphone/microphone jack, microphone jack',
          'Rear: 2x USB 2.0, 2x USB 3.2 Gen 1, HDMI, DisplayPort, VGA, Ethernet (RJ-45), line-out',
          'Lenovo Original USB Keyboard & Mouse',
        ],
      },
      {
        label: 'Security, Power & Warranty',
        lines: [
          'Discrete TPM 2.0, Kensington Security Slot, BIOS security features',
          '260W power supply, FreeDOS operating system',
          'Dimensions: 100 x 308 x 274.8 mm, Weight: ~4.5 kg, Color: Black',
          'Warranty: 3 years',
        ],
      },
    ],
    descriptionTitle: 'Lenovo ThinkCentre Neo 50s Core i7 12th Gen 1TB SSD Brand PC',
    descriptionParagraph:
      'A high-performance desktop PC designed for professionals and tech enthusiasts, combining multi-core processing power with expandable memory and fast solid-state storage plus comprehensive connectivity for dual-monitor configurations.',
  },
  {
    slug: 'lenovo-thinkcentre-neo-50s-core-i7-brand-pc',
    name: 'Lenovo ThinkCentre Neo 50s Core i7 12th Gen Brand PC',
    brand: 'Lenovo',
    model: '11SYS2FQ00',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Desktop', href: '/desktops' },
      { label: 'Lenovo ThinkCentre Neo 50s Core i7 12th Gen Brand PC', href: '/lenovo-thinkcentre-neo-50s-core-i7-brand-pc' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-Brand-PC-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-Brand-PC-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-Brand-PC1-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-Brand-PC1-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-Brand-PC2-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-Brand-PC2-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-Brand-PC3-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/LENOVO/Lenovo-ThinkCentre-Neo-50s-Core-i7-12th-Gen-Brand-PC3-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 82000,
    priceOld: 87740,
    discountPct: 7,
    keyFeatures: [
      'Intel Core i7-12700 12th Generation processor with 12 cores for high multitasking performance',
      'Expandable memory configuration supporting up to 64GB via dual slots',
      '512GB SSD for rapid data access and application loading',
      'Integrated Intel UHD Graphics 770 suitable for business and multimedia work',
      'Multiple connectivity ports including USB 3.2, HDMI, DisplayPort, and VGA',
      '3 Years comprehensive warranty included',
    ],
    specGroups: [
      {
        label: 'Processor',
        lines: [
          'Intel Core i7-12700 12th Generation, 12 cores (8P+4E), 20 threads',
          'P-core 2.1GHz / E-core 1.6GHz; Max Turbo 4.9GHz, 25MB cache',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: ['8GB DDR4 3200 MHz, expandable up to 64GB (2 slots)', '512GB SSD storage'],
      },
      {
        label: 'Graphics & Audio',
        lines: ['Integrated Intel UHD Graphics 770', 'Built-in speakers with Realtek ALC623-CG codec'],
      },
      {
        label: 'Connectivity',
        lines: [
          'Front: 1x USB-C 3.2 Gen 1, 2x USB 3.2 Gen 1, 3.5mm audio jacks',
          'Rear: 2x USB 2.0, 2x USB 3.2 Gen 1, HDMI 2.1, DisplayPort 1.4, VGA, Ethernet (RJ-45)',
          'Built-in Wi-Fi and Bluetooth',
        ],
      },
      {
        label: 'Security, Power & Warranty',
        lines: [
          'Discrete TPM 2.0, Kensington Security Slot, BIOS protections',
          '260W power supply, FreeDOS operating system',
          'Dimensions: 100 x 308 x 274.8 mm, Weight: ~4.5 kg, Color: Black',
          'Warranty: 3 Years',
        ],
      },
    ],
    descriptionTitle: 'Lenovo ThinkCentre Neo 50s Core i7 12th Gen Brand PC',
    descriptionParagraph:
      'This desktop delivers exceptional speed and seamless multitasking through its 12th generation processor architecture, combining fast SSD data access with expandable memory capacity, making it a reliable choice for business environments requiring stable performance.',
  },
]
