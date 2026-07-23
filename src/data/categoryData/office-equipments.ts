import type { CategoryProduct } from '../categoryProducts'
import type { ProductDetail } from '../productDetail'

export const products: CategoryProduct[] = [
  {
    id: 'htdz-ht-88b-uhf-wireless-microphone',
    slug: 'htdz-ht-88b-uhf-wireless-microphone',
    name: 'HTDZ HT-88B UHF Wireless Microphone',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-88b-01-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 24200,
    priceOld: 25894,
    discountPct: 7,
  },
  {
    id: 'htdz-ht-66b-wireless-microphone-system',
    slug: 'htdz-ht-66b-wireless-microphone-system',
    name: 'HTDZ HT-66B UHF Wireless Microphone System',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-66b-01-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 26300,
    priceOld: 28141,
    discountPct: 7,
  },
  {
    id: 'htdz-ht-f12-2-mixing-console',
    slug: 'htdz-ht-f12-2-mixing-console',
    name: 'HTDZ HT-F12/2 12 Channel Professional Mixing Console',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-f12-2-001-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 29400,
    priceOld: 31458,
    discountPct: 7,
  },
  {
    id: 'htdz-ht-580-microphone-system',
    slug: 'htdz-ht-580-microphone-system',
    name: 'HTDZ HT-580 UHF Wireless Microphone System',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-580-01-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 15600,
    priceOld: 16692,
    discountPct: 7,
  },
  {
    id: 'htdz-ht-7500c-conference-system',
    slug: 'htdz-ht-7500c-conference-system',
    name: 'HTDZ HT-7500C Table Top Chairman Unit Conference System',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-7500c-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 15550,
    priceOld: 16639,
    discountPct: 7,
  },
  {
    id: 'htdz-ht-d48-cardioid-microphone',
    slug: 'htdz-ht-d48-cardioid-microphone',
    name: 'HTDZ HT-D48 Wired Cardioid Gooseneck Meeting Microphone',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-d48-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 10200,
    priceOld: 10914,
    discountPct: 7,
  },
  {
    id: 'htdz-ht-808-gooseneck-conference-microphone',
    slug: 'htdz-ht-808-gooseneck-conference-microphone',
    name: 'HTDZ HT-808 Professional Gooseneck Conference Microphone',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-808-01-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 7500,
    priceOld: 8025,
    discountPct: 7,
  },
  {
    id: 'htdz-ht-81a-professional-shotgun-microphone',
    slug: 'htdz-ht-81a-professional-shotgun-microphone',
    name: 'HTDZ HT-81A Professional Shotgun Microphone',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-81a-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 5000,
    priceOld: 5350,
    discountPct: 7,
  },
]

export const priceMin = Math.min(...products.map((p) => p.priceNew))
export const priceMax = Math.max(...products.map((p) => p.priceNew))

export const details: ProductDetail[] = [
  {
    slug: 'htdz-ht-88b-uhf-wireless-microphone',
    name: 'HTDZ HT-88B UHF Wireless Microphone',
    brand: 'HTDZ',
    model: 'HT-88B',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Office Equipment', href: '/office-equipments' },
      { label: 'HTDZ HT-88B UHF Wireless Microphone', href: '/htdz-ht-88b-uhf-wireless-microphone' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-88b-01-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-88b-01-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 24200,
    priceOld: 25894,
    discountPct: 7,
    keyFeatures: [
      'Frequency range spanning 80Hz-18kHz (3dB)',
      'Built-in antenna design',
      'Signal noise ratio exceeding 105dB',
      'Battery endurance up to 10 hours at normal power, 12 hours at low power',
      'UHF wireless transmission capability',
    ],
    specGroups: [
      {
        label: 'Audio Specifications',
        lines: ['Frequency: 80Hz-18kHz (3dB)', 'Signal Noise Ratio: > 105dB'],
      },
      {
        label: 'Connectivity',
        lines: ['Antenna: Built-in', 'Transmission: UHF Wireless'],
      },
      {
        label: 'Power',
        lines: ['Battery Life: 10 hours (normal power), 12 hours (low power)'],
      },
    ],
    descriptionTitle: 'HTDZ HT-88B UHF Wireless Microphone',
    descriptionParagraph:
      'The HTDZ HT-88B is a UHF wireless microphone system with a built-in antenna, wide frequency response, and long battery endurance, suited for presentations, events, and conference use.',
  },
  {
    slug: 'htdz-ht-66b-wireless-microphone-system',
    name: 'HTDZ HT-66B UHF Wireless Microphone System',
    brand: 'HTDZ',
    model: 'HT-66B',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Office Equipment', href: '/office-equipments' },
      { label: 'HTDZ HT-66B UHF Wireless Microphone System', href: '/htdz-ht-66b-wireless-microphone-system' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-66b-01-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-66b-01-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 26300,
    priceOld: 28141,
    discountPct: 7,
    keyFeatures: [
      'Working frequency: 610MHz - 790MHz',
      'Broad Band FM modulation',
      '200 frequency channels available',
      'Signal noise ratio greater than 105dB',
      'Configurable as 1 Hand + 1 Tie or 2 Hand microphone setup',
    ],
    specGroups: [
      {
        label: 'Audio Specifications',
        lines: ['Working Frequency: 610MHz - 790MHz', 'Modulation: Broad Band FM', 'Signal Noise Ratio: > 105dB'],
      },
      {
        label: 'Connectivity',
        lines: ['Frequency Channels: 200', 'Configuration: 1 Hand + 1 Tie or 2 Hand microphone'],
      },
    ],
    descriptionTitle: 'HTDZ HT-66B UHF Wireless Microphone System',
    descriptionParagraph:
      'A UHF wireless microphone system suitable for presentations and conferences, offering 200 selectable frequency channels and flexible handheld/lavalier microphone configurations.',
  },
  {
    slug: 'htdz-ht-f12-2-mixing-console',
    name: 'HTDZ HT-F12/2 12 Channel Professional Mixing Console',
    brand: 'HTDZ',
    model: 'HT-F12/2',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Office Equipment', href: '/office-equipments' },
      { label: 'HTDZ HT-F12/2 12 Channel Professional Mixing Console', href: '/htdz-ht-f12-2-mixing-console' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-f12-2-001-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-f12-2-001-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 29400,
    priceOld: 31458,
    discountPct: 7,
    keyFeatures: [
      '12 channel professional mixing console',
      'Phones output: 40mW (1KHz, THD-0.5%, 200 Ohm)',
      'Max output level 19dBm (1kHz, THD=0.5%)',
      'S/N ratio: 71dB',
      'Power consumption: 35W',
      'Residual noise SNR: -75dB',
    ],
    specGroups: [
      {
        label: 'Audio Specifications',
        lines: [
          'Channels: 12',
          'Phones Output: 40mW (1KHz, THD-0.5%, 200 Ohm)',
          'Max Output Level: 19dBm (1kHz, THD=0.5%)',
          'S/N Ratio: 71dB',
          'Residual Noise: SNR -75dB',
        ],
      },
      {
        label: 'Power',
        lines: ['Power Consumption: 35W'],
      },
    ],
    descriptionTitle: 'HTDZ HT-F12/2 12 Channel Professional Mixing Console',
    descriptionParagraph:
      'The HTDZ HT-F12/2 is a professional mixing console designed for audio mixing applications, featuring 12 channels with low noise output and quality signal processing for conference and event audio setups.',
  },
  {
    slug: 'htdz-ht-580-microphone-system',
    name: 'HTDZ HT-580 UHF Wireless Microphone System',
    brand: 'HTDZ',
    model: 'HT-580',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Office Equipment', href: '/office-equipments' },
      { label: 'HTDZ HT-580 UHF Wireless Microphone System', href: '/htdz-ht-580-microphone-system' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-580-01-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-580-01-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 15600,
    priceOld: 16692,
    discountPct: 7,
    keyFeatures: [
      'Carrier frequency spans 470-960MHz for broad compatibility',
      'Frequency response: 60-16KHz with reliable signal stability',
      'Frequency stability: 20ppm ensures consistent performance',
      'Supports single handheld, lavalier, or dual handheld configurations',
      'Current consumption: 100mA for efficient battery usage',
      'One-year manufacturer warranty coverage',
    ],
    specGroups: [
      {
        label: 'Audio Specifications',
        lines: ['Frequency Response: 60-16KHz', 'Sensitivity: -70~-98 dBM pressure limit'],
      },
      {
        label: 'System',
        lines: ['Carrier Frequency: 470-960MHz', 'Frequency Stability: 20ppm', 'Current Consumption: 100mA'],
      },
      {
        label: 'Warranty',
        lines: ['Coverage: 1 year warranty'],
      },
    ],
    descriptionTitle: 'HTDZ HT-580 UHF Wireless Microphone System',
    descriptionParagraph:
      'A UHF wireless microphone system with a wide carrier frequency range and stable performance, offering flexible single or dual handheld/lavalier microphone configurations for conference and event use.',
  },
  {
    slug: 'htdz-ht-7500c-conference-system',
    name: 'HTDZ HT-7500C Table Top Chairman Unit Conference System',
    brand: 'HTDZ',
    model: 'HT-7500C',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Office Equipment', href: '/office-equipments' },
      { label: 'HTDZ HT-7500C Table Top Chairman Unit Conference System', href: '/htdz-ht-7500c-conference-system' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-7500c-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-7500c-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 15550,
    priceOld: 16639,
    discountPct: 7,
    keyFeatures: [
      'Frequency response: 40Hz~16kHz',
      'Sensitivity: -42dB ±2dB',
      'Operating distance: 15-50cm',
      'Table-top chairman unit design for conference systems',
      'Professional audio specifications for meetings',
    ],
    specGroups: [
      {
        label: 'Audio Specifications',
        lines: ['Frequency Response: 40Hz~16kHz', 'Sensitivity: -42dB ±2dB', 'Operating Distance: 15-50cm'],
      },
      {
        label: 'Physical',
        lines: ['Unit Type: Table-top chairman unit'],
      },
    ],
    descriptionTitle: 'HTDZ HT-7500C Table Top Chairman Unit Conference System',
    descriptionParagraph:
      'This HTDZ table-top chairman unit serves as a conference system for professional meeting environments, featuring reliable audio specifications designed for clear communication in boardroom and conference settings.',
  },
  {
    slug: 'htdz-ht-d48-cardioid-microphone',
    name: 'HTDZ HT-D48 Wired Cardioid Gooseneck Meeting Microphone',
    brand: 'HTDZ',
    model: 'HT-D48',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Office Equipment', href: '/office-equipments' },
      { label: 'HTDZ HT-D48 Wired Cardioid Gooseneck Meeting Microphone', href: '/htdz-ht-d48-cardioid-microphone' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-d48-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-d48-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 10200,
    priceOld: 10914,
    discountPct: 7,
    keyFeatures: [
      'Cardioid polar pattern for focused audio capture',
      'Wired signal transmission for reliable connectivity',
      'Phantom 48V/DC3V power requirements',
      'Frequency response spanning 20Hz-18kHz',
      'Gooseneck design for flexible positioning',
      'Professional meeting microphone configuration',
    ],
    specGroups: [
      {
        label: 'Audio Specifications',
        lines: ['Polar Pattern: Cardioid', 'Frequency Response: 20Hz-18kHz'],
      },
      {
        label: 'Connectivity',
        lines: ['Signal Transmission: Wired', 'Power Requirements: Phantom 48V/DC3V'],
      },
      {
        label: 'Physical',
        lines: ['Design: Gooseneck'],
      },
    ],
    descriptionTitle: 'HTDZ HT-D48 Wired Cardioid Gooseneck Meeting Microphone',
    descriptionParagraph:
      'The HTDZ HT-D48 is a professional-grade wired gooseneck microphone designed for conference and meeting environments, featuring a cardioid pickup pattern and comprehensive frequency response for clear audio capture.',
  },
  {
    slug: 'htdz-ht-808-gooseneck-conference-microphone',
    name: 'HTDZ HT-808 Professional Gooseneck Conference Microphone',
    brand: 'HTDZ',
    model: 'HT-808',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Office Equipment', href: '/office-equipments' },
      { label: 'HTDZ HT-808 Professional Gooseneck Conference Microphone', href: '/htdz-ht-808-gooseneck-conference-microphone' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-808-01-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-808-01-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 7500,
    priceOld: 8025,
    discountPct: 7,
    keyFeatures: [
      'Output impedance: 200 Ohms (Unbalanced)',
      'Sensitivity: -38dB with XLR 3-PIN interface',
      'Frequency response spanning 40Hz to 16kHz',
      'Hypercardioid polar pattern for directional pickup',
      'Professional gooseneck design for conference settings',
      'Suitable for meeting rooms and audio conferencing applications',
    ],
    specGroups: [
      {
        label: 'Audio Specifications',
        lines: ['Output Impedance: 200 Ohms (Unbalanced)', 'Sensitivity: -38dB', 'Frequency Response: 40Hz-16kHz', 'Polar Pattern: Hypercardioid'],
      },
      {
        label: 'Connectivity',
        lines: ['Interface: XLR 3-PIN'],
      },
    ],
    descriptionTitle: 'HTDZ HT-808 Professional Gooseneck Conference Microphone',
    descriptionParagraph:
      'This conference microphone features a professional gooseneck design intended for boardroom and meeting environments, using a hypercardioid pattern to isolate speech from ambient noise.',
  },
  {
    slug: 'htdz-ht-81a-professional-shotgun-microphone',
    name: 'HTDZ HT-81A Professional Shotgun Microphone',
    brand: 'HTDZ',
    model: 'HT-81A',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Office Equipment', href: '/office-equipments' },
      { label: 'HTDZ HT-81A Professional Shotgun Microphone', href: '/htdz-ht-81a-professional-shotgun-microphone' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-81a-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-81a-500x500-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-81a-01-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HTDZ/ht-81a-01-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 5000,
    priceOld: 5350,
    discountPct: 7,
    keyFeatures: [
      'Polar pattern: Unidirectional / Ultra Unidirectional',
      'Output impedance: 75 Ohm (Balanced)',
      'Sensitivity (±2dB): NORMAL -45dB, TELE -38dB',
      'Mic length: 360mm',
    ],
    specGroups: [
      {
        label: 'Audio Specifications',
        lines: ['Polar Pattern: Unidirectional / Ultra Unidirectional', 'Output Impedance: 75 Ohm (Balanced)', 'Sensitivity (±2dB): NORMAL -45dB, TELE -38dB'],
      },
      {
        label: 'Physical',
        lines: ['Mic Length: 360mm'],
      },
    ],
    descriptionTitle: 'HTDZ HT-81A Professional Shotgun Microphone',
    descriptionParagraph:
      'A professional shotgun microphone designed for balanced audio capture with switchable polar patterns between normal and ultra-directional modes, suited for presentation and recording setups.',
  },
]
