import type { CategoryProduct } from '../categoryProducts'
import type { ProductDetail } from '../productDetail'

export const products: CategoryProduct[] = [
  {
    id: 'MX2H3',
    slug: 'apple-macbook-pro-m4-pro-14-inch',
    name: 'MacBook Pro M4 Pro Chip 14-inch',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-001-500x-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 245000,
    priceOld: 262150,
    discountPct: 7,
  },
  {
    id: 'MDE04',
    slug: 'apple-macbook-pro-m5',
    name: 'MacBook Pro M5 Chip 14-inch',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-pro-m5-silver-01-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 213000,
    priceOld: 227910,
    discountPct: 7,
  },
  {
    id: 'MW1L3',
    slug: 'apple-macbook-air-m4-15-inch',
    name: 'MacBook Air M4 Chip 15-inch',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/macbook-air-15-m4-midnight-01-50-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 140000,
    priceOld: 149800,
    discountPct: 7,
  },
  {
    id: 'MC6U4',
    slug: 'macbook-air-m4-13-inch-10-core-gpu',
    name: 'MacBook Air M4 Chip 13-inch (10-core CPU, 10 core GPU)',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-midnight-01-50-(1)-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 149000,
    priceOld: 159430,
    discountPct: 7,
  },
  {
    id: 'MW123',
    slug: 'apple-macbook-air-m4-13-inch',
    name: 'MacBook Air M4 Chip 13-inch (10-core CPU, 8 core GPU)',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-midnight-01-50-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 128000,
    priceOld: 136960,
    discountPct: 7,
  },
  {
    id: 'M3407HA-LY048W',
    slug: 'asus-vivobook-s14-m3407ha-ryzen-5-laptop',
    name: 'ASUS Vivobook S14 M3407HA Ryzen 5 220 14" WUXGA Laptop',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-01-500x500-removebg-preview-250x250.png',
    rating: 0,
    reviews: 0,
    priceNew: 109000,
    priceOld: 116630,
    discountPct: 7,
  },
  {
    id: 'L1504FA-BQ2548W',
    slug: 'asus-vivobook-go-15-l1504fa-bq2548w-ryzen-5-laptop',
    name: 'ASUS Vivobook Go 15 L1504FA-BQ2548W Ryzen 5 7520U',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/cover-1761370105_cache_optimize-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 77900,
    priceOld: 83353,
    discountPct: 7,
  },
  {
    id: 'HP-ENVY-x360-16-ad0013dx',
    slug: 'hp-envy-x360-ryzen-5-8gb-ram-512gb-ssd-16-touch-laptop',
    name: 'HP ENVY x360 Ryzen 5 8GB RAM 512GB SSD 16" Touch',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/HP/HP_ENVY_x360_Ryzen_5_8GB_RAM_512__1_-removebg-preview-250x250.png',
    rating: 0,
    reviews: 0,
    priceNew: 95000,
    priceOld: 101650,
    discountPct: 7,
  },
]

export const priceMin = Math.min(...products.map((p) => p.priceNew))
export const priceMax = Math.max(...products.map((p) => p.priceNew))

export const details: ProductDetail[] = [
  {
    slug: 'apple-macbook-pro-m4-pro-14-inch',
    name: 'MacBook Pro M4 Pro Chip 14-inch',
    brand: 'Apple',
    model: 'MX2H3',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Laptop', href: '/laptop' },
      { label: 'MacBook Pro M4 Pro Chip 14-inch', href: '/apple-macbook-pro-m4-pro-14-inch' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-001-500x-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-001-500x-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-002-500x-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-002-500x-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-003-500x-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-003-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-silver-0-(2)-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-silver-0-(2)-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-silver-0-(1)-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-silver-0-(1)-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-silver-0-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/apple-macbook-pro-14-m4-silver-0-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 245000,
    priceOld: 262150,
    discountPct: 7,
    keyFeatures: [
      '12-core CPU, 16-core GPU, 16-core Neural Engine with unified 24GB memory',
      '14.2-inch Liquid Retina XDR display with 3024x1964 resolution and 120Hz ProMotion',
      '512GB SSD storage capacity with rapid data access',
      'Three Thunderbolt 5 ports supporting up to 120Gb/s connectivity speeds',
      '72.4 Wh battery with extended usage capability',
      'Touch ID fingerprint sensor integrated into keyboard',
    ],
    specGroups: [
      {
        label: 'Processor & Graphics',
        lines: [
          'Apple M4 Pro; 12-core CPU (8 performance + 4 efficiency cores)',
          '16-core GPU with hardware-accelerated ray tracing, 16-core Neural Engine',
          '273GB/s memory bandwidth',
        ],
      },
      {
        label: 'Display',
        lines: [
          '14.2-inch Liquid Retina XDR; 3024x1964 resolution',
          '1,000,000:1 contrast; 1000 nits sustained (SDR), 1600 nits peak (HDR)',
          'ProMotion adaptive refresh rate up to 120Hz',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: ['24GB unified memory', '512GB SSD'],
      },
      {
        label: 'Connectivity',
        lines: [
          'Wi-Fi 6E (802.11ax); Bluetooth 5.3',
          '3x Thunderbolt 5/USB 4 ports (120Gb/s); 1x HDMI; 1x SDXC card slot; 3.5mm headphone jack',
        ],
      },
      {
        label: 'Battery, Camera & Warranty',
        lines: [
          '72.4 Wh lithium-polymer battery; 70W USB-C Power Adapter (MagSafe 3)',
          '12MP Center Stage webcam with Desk View; six-speaker system; three-mic array',
          'Backlit Magic Keyboard with Touch ID; Force Touch trackpad',
          'Weight: 1.60 kg; Warranty: 1-year international',
        ],
      },
    ],
    descriptionTitle: 'MacBook Pro M4 Pro Chip 14-inch',
    descriptionParagraph:
      'A 14.2-inch MacBook Pro built on the Apple M4 Pro chip with a 12-core CPU and 16-core GPU, pairing a 120Hz Liquid Retina XDR display with 24GB unified memory and a 512GB SSD for demanding professional workflows.',
  },
  {
    slug: 'apple-macbook-pro-m5',
    name: 'MacBook Pro M5 Chip 14-inch',
    brand: 'Apple',
    model: 'MDE04',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Laptop', href: '/laptop' },
      { label: 'MacBook Pro M5 Chip 14-inch', href: '/apple-macbook-pro-m5' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-pro-m5-silver-01-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-pro-m5-silver-01-500x500-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-pro-m5-space-black-02-50-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-pro-m5-space-black-02-50-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-pro-m5-space-black-04-50-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-pro-m5-space-black-04-50-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-pro-m5-silver-03-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-pro-m5-silver-03-500x500-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-pro-m5-silver-04-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-pro-m5-silver-04-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 213000,
    priceOld: 227910,
    discountPct: 7,
    keyFeatures: [
      'Apple M5 chip featuring 10-core CPU, 10-core GPU, and 16-core Neural Engine',
      '14.2" Liquid Retina XDR display (3024x1964) with 1,000,000:1 contrast ratio',
      'Up to 24GB unified memory and 1TB SSD storage options',
      'Backlit Magic Keyboard with Touch ID',
      'Wi-Fi 6E and Bluetooth 5.3 connectivity',
    ],
    specGroups: [
      {
        label: 'Processor & Graphics',
        lines: [
          'Apple M5; 10-core CPU (4 performance + 6 efficiency cores)',
          '10-core GPU with hardware-accelerated ray tracing, 16-core Neural Engine',
          '153GB/s memory bandwidth',
        ],
      },
      {
        label: 'Display',
        lines: [
          '14.2-inch Liquid Retina XDR; 3024x1964 resolution',
          '1,000,000:1 contrast; 1000 nits sustained / 1600 nits peak',
          'ProMotion adaptive refresh rate up to 120Hz',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: ['16GB or 24GB unified memory', '512GB or 1TB SSD'],
      },
      {
        label: 'Connectivity',
        lines: [
          'Wi-Fi 6E (802.11ax); Bluetooth 5.3',
          '3x Thunderbolt 4/USB 4 ports; HDMI; SD card slot',
        ],
      },
      {
        label: 'Camera, Audio & Warranty',
        lines: [
          '12MP Center Stage camera; 1080p HD video; six-speaker system with spatial audio',
          '78-key backlit Magic Keyboard with Touch ID; Force Touch trackpad',
          '70W USB-C Power Adapter (MagSafe 3); Weight: 3.4 lbs',
          'Warranty: 1-year international',
        ],
      },
    ],
    descriptionTitle: 'MacBook Pro M5 Chip 14-inch',
    descriptionParagraph:
      'The next-generation MacBook Pro powered by the Apple M5 chip, combining a 10-core CPU and GPU with a 120Hz Liquid Retina XDR display, up to 24GB unified memory, and configurations up to 1TB SSD.',
  },
  {
    slug: 'apple-macbook-air-m4-15-inch',
    name: 'MacBook Air M4 Chip 15-inch',
    brand: 'Apple',
    model: 'MW1L3',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Laptop', href: '/laptop' },
      { label: 'MacBook Air M4 Chip 15-inch', href: '/apple-macbook-air-m4-15-inch' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/macbook-air-15-m4-midnight-01-50-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/macbook-air-15-m4-midnight-01-50-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/macbook-air-15-m4-midnight-02-50-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/macbook-air-15-m4-midnight-02-50-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/apple-macbook-air-15-m4-starligh-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/apple-macbook-air-15-m4-starligh-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/apple-macbook-air-15-m4-starligh-(1)-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/apple-macbook-air-15-m4-starligh-(1)-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/macbook-air-15-m4-sky-blue-01-50-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/macbook-air-15-m4-sky-blue-01-50-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/macbook-air-15-m4-sky-blue-05-50-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/APOLLO/macbook-air-15-m4-sky-blue-05-50-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 140000,
    priceOld: 149800,
    discountPct: 7,
    keyFeatures: [
      'M4 chip featuring 10-core CPU, 10-core GPU, and 16-core Neural Engine',
      '16GB unified memory with 256GB/512GB SSD storage options',
      '15.3-inch Liquid Retina display (2880x1864) with True Tone',
      'Backlit Magic Keyboard with Touch ID fingerprint authentication',
      'Four-speaker audio system with spatial audio support',
      '1080p FaceTime HD camera with three-mic array',
    ],
    specGroups: [
      {
        label: 'Processor & Graphics',
        lines: [
          'Apple M4; 10-core CPU (4 performance + 6 efficiency cores)',
          '10-core GPU with hardware-accelerated ray tracing, 16-core Neural Engine',
        ],
      },
      {
        label: 'Display',
        lines: [
          '15.3-inch Liquid Retina; 2880x1864 resolution; 224 ppi',
          '500 nits brightness; 1 billion colors; P3 wide color; True Tone',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: ['16GB unified memory', '256GB or 512GB SSD'],
      },
      {
        label: 'Connectivity',
        lines: [
          'Wi-Fi 6E (802.11ax); Bluetooth 5.3',
          '2x Thunderbolt 4 (USB-C); 3.5mm headphone jack',
        ],
      },
      {
        label: 'Battery, Audio & Warranty',
        lines: [
          '66.5 Wh lithium-polymer battery; 35W USB-C power adapter',
          '1080p FaceTime HD camera; four-speaker system with Dolby Atmos support',
          'Backlit Magic Keyboard (78/79 keys) with Touch ID; Weight: 3.3 lbs (1.51 kg)',
          'Warranty: 1-year international',
        ],
      },
    ],
    descriptionTitle: 'MacBook Air M4 Chip 15-inch',
    descriptionParagraph:
      'A 15.3-inch MacBook Air powered by the Apple M4 chip, offering a large Liquid Retina display, 16GB unified memory, and a four-speaker audio system in a thin, fanless design.',
  },
  {
    slug: 'macbook-air-m4-13-inch-10-core-gpu',
    name: 'MacBook Air M4 Chip 13-inch (10-core CPU, 10 core GPU)',
    brand: 'Apple',
    model: 'MC6U4',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Laptop', href: '/laptop' },
      { label: 'MacBook Air M4 Chip 13-inch (10-core CPU, 10 core GPU)', href: '/macbook-air-m4-13-inch-10-core-gpu' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-midnight-01-50-(1)-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-midnight-01-50-(1)-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-starlight-01-5-(1)-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-starlight-01-5-(1)-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-sky-blue-01-50-(1)-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-sky-blue-01-50-(1)-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 149000,
    priceOld: 159430,
    discountPct: 7,
    keyFeatures: [
      'Apple M4 chip with 10-core CPU, 10-core GPU, 16-core Neural Engine',
      '13.6-inch Liquid Retina display (2560x1664) with True Tone',
      'Available RAM configurations of 16GB or 24GB with 512GB SSD storage',
      'Backlit Magic Keyboard with Touch ID',
      'Four-speaker sound system with spatial audio support',
      'Lightweight at 2.7 pounds with 0.44-inch profile',
    ],
    specGroups: [
      {
        label: 'Processor & Graphics',
        lines: [
          'Apple M4 chip with 10-core CPU (4 performance + 6 efficiency cores)',
          '10-core GPU with hardware-accelerated ray tracing, 16-core Neural Engine',
        ],
      },
      {
        label: 'Display',
        lines: [
          '13.6-inch Liquid Retina; 2560x1664 resolution; 224 ppi',
          '500 nits brightness; 1 billion colors; P3 wide color; True Tone; 60Hz',
        ],
      },
      {
        label: 'Memory & Storage',
        lines: ['16GB or 24GB unified memory', '256GB or 512GB SSD'],
      },
      {
        label: 'Connectivity',
        lines: [
          'Wi-Fi 6E (802.11ax); Bluetooth 5.3',
          '2x Thunderbolt 4 ports; 3.5mm headphone jack',
        ],
      },
      {
        label: 'Battery, Audio & Warranty',
        lines: [
          '53.8 Wh lithium-polymer battery; 35W Dual USB-C Port Power Adapter',
          '1080p FaceTime HD camera; four-speaker sound system; Voice Isolation microphone modes',
          '78/79-key backlit Magic Keyboard with Touch ID; Force Touch trackpad; Weight: 2.7 lbs (1.24 kg)',
          'Warranty: 1-year international',
        ],
      },
    ],
    descriptionTitle: 'MacBook Air M4 Chip 13-inch (10-core CPU, 10 core GPU)',
    descriptionParagraph:
      'The higher-configured 13-inch MacBook Air with the Apple M4 chip and a 10-core GPU, pairing a 13.6-inch Liquid Retina display with up to 24GB unified memory in an ultra-portable, fanless chassis.',
  },
  {
    slug: 'apple-macbook-air-m4-13-inch',
    name: 'MacBook Air M4 Chip 13-inch (10-core CPU, 8 core GPU)',
    brand: 'Apple',
    model: 'MW123',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Laptop', href: '/laptop' },
      { label: 'MacBook Air M4 Chip 13-inch (10-core CPU, 8 core GPU)', href: '/apple-macbook-air-m4-13-inch' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-midnight-01-50-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-midnight-01-50-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-silver-01-500x-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-silver-01-500x-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-sky-blue-01-50-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-sky-blue-01-50-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-starlight-01-5-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Apple/macbook-air-13-m4-starlight-01-5-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 128000,
    priceOld: 136960,
    discountPct: 7,
    keyFeatures: [
      'Apple M4 chip with 10-core CPU, 8-core GPU, 16-core Neural Engine',
      '13.6-inch Liquid Retina display (2560x1664) with True Tone',
      '16GB unified memory with 256GB SSD storage',
      'Backlit Magic Keyboard with Touch ID',
      'Wi-Fi 6E connectivity with Bluetooth 5.3',
      'All-day battery with 53.8 Wh capacity',
    ],
    specGroups: [
      {
        label: 'Processor & Graphics',
        lines: [
          'Apple M4 chip with 10-core CPU, 8-core GPU (shared memory)',
          '16-core Neural Engine',
        ],
      },
      {
        label: 'Display',
        lines: ['13.6" Liquid Retina; 2560x1664 resolution; 500 nits; True Tone'],
      },
      {
        label: 'Memory & Storage',
        lines: ['16GB unified memory', '256GB/512GB SSD'],
      },
      {
        label: 'Connectivity',
        lines: [
          'Wi-Fi 6E (802.11ax); Bluetooth 5.3',
          '2x Thunderbolt 4 USB-C ports; 3.5mm headphone jack',
        ],
      },
      {
        label: 'Battery, Audio & Warranty',
        lines: [
          '53.8 Wh lithium-polymer battery; 30W USB-C power adapter',
          '1080p FaceTime HD camera; 4-speaker system; 3-mic array with spatial audio support',
          '78/79-key backlit Magic Keyboard with Touch ID; Weight: 1.24 kg',
          'Warranty: 1-year international',
        ],
      },
    ],
    descriptionTitle: 'MacBook Air M4 Chip 13-inch (10-core CPU, 8 core GPU)',
    descriptionParagraph:
      'The entry configuration of the 13-inch MacBook Air with the Apple M4 chip and 8-core GPU, featuring 16GB unified memory and a 256GB SSD in a lightweight, all-day-battery-life design.',
  },
  {
    slug: 'asus-vivobook-s14-m3407ha-ryzen-5-laptop',
    name: 'ASUS Vivobook S14 M3407HA Ryzen 5 220 14" WUXGA Laptop',
    brand: 'ASUS',
    model: 'M3407HA-LY048W',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Laptop', href: '/laptop' },
      { label: 'ASUS Vivobook S14 M3407HA Ryzen 5 220 14" WUXGA Laptop', href: '/asus-vivobook-s14-m3407ha-ryzen-5-laptop' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-01-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-01-500x500-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-02-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-02-500x500-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-03-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-03-500x500-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-04-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-04-500x500-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-05-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-05-500x500-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-06-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/vivobook-s14-m3407ha-06-500x500-removebg-preview-550x550.png' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 109000,
    priceOld: 116630,
    discountPct: 7,
    keyFeatures: [
      'AMD Ryzen 5 220 (22MB Cache, up to 4.9GHz, 6 cores, 12 Threads)',
      '16GB DDR5 memory with 1TB M.2 NVMe PCIe 4.0 SSD storage',
      '14.0" IPS WUXGA (1920x1200), 300nits Brightness display',
      'Backlit Keyboard with CoPilot Key, Type-C connections',
      'FHD camera with IR function to support Windows Hello',
      'Military-grade durability meeting US MIL-STD 810H standards',
    ],
    specGroups: [
      {
        label: 'Processor',
        lines: [
          'AMD Ryzen 5 220; 6 cores/12 threads; 22MB cache',
          'P-core 2.1/4.6GHz, E-core 1.5/3.4GHz',
        ],
      },
      {
        label: 'Display',
        lines: ['14" IPS panel; WUXGA 1920x1200; 60Hz; 300 nits brightness'],
      },
      {
        label: 'Memory & Storage',
        lines: ['16GB DDR5 onboard memory', '1TB M.2 2280 PCIe 4.0x4 SSD'],
      },
      {
        label: 'Connectivity',
        lines: [
          '2x USB 3.2 Gen 1 Type-A; 2x USB 3.2 Gen 1 Type-C (display/power delivery); 1x HDMI 2.1; 3.5mm combo audio jack',
          'Bluetooth 5.3; no Ethernet',
        ],
      },
      {
        label: 'Battery, Camera & Warranty',
        lines: [
          '70WHrs 4-cell Li-ion battery; USB Type-C 65W (20V/3.25A) adapter',
          'FHD IR camera supporting Windows Hello; array microphone',
          'Firmware TPM; BIOS password protection; Windows 11 Home',
          'Weight: 1.40 kg; Warranty: 2 years (battery & adapter: 1 year)',
        ],
      },
    ],
    descriptionTitle: 'ASUS Vivobook S14 M3407HA Ryzen 5 220 14" WUXGA Laptop',
    descriptionParagraph:
      'A 14-inch productivity laptop built around the AMD Ryzen 5 220 processor with 16GB DDR5 memory and a 1TB PCIe 4.0 SSD, featuring a WUXGA IPS display, IR camera for Windows Hello, and MIL-STD 810H durability testing.',
  },
  {
    slug: 'asus-vivobook-go-15-l1504fa-bq2548w-ryzen-5-laptop',
    name: 'ASUS Vivobook Go 15 L1504FA-BQ2548W Ryzen 5 7520U',
    brand: 'ASUS',
    model: 'L1504FA-BQ2548W',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Laptop', href: '/laptop' },
      { label: 'ASUS Vivobook Go 15 L1504FA-BQ2548W Ryzen 5 7520U', href: '/asus-vivobook-go-15-l1504fa-bq2548w-ryzen-5-laptop' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/cover-1761370105_cache_optimize-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/cover-1761370105_cache_optimize-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/picture-1-1761370106_cache_optim-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/picture-1-1761370106_cache_optim-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/picture-2-1761370106_cache_optim-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/picture-2-1761370106_cache_optim-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/picture-3-1761370106_cache_optim-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/ASUS/picture-3-1761370106_cache_optim-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 77900,
    priceOld: 83353,
    discountPct: 7,
    keyFeatures: [
      'AMD Ryzen 5 7520U processor with up to 4.3GHz boost',
      '16GB LPDDR5 RAM with 512GB M.2 NVMe PCIe 3.0 SSD',
      '15.6-inch FHD Display',
      'AMD Radeon Graphics',
      'Wi-Fi 6E connectivity',
      'AI Noise Canceling technology',
    ],
    specGroups: [
      {
        label: 'Processor',
        lines: ['AMD Ryzen 5 7520U; 4 cores/8 threads; up to 4.3GHz; 6MB cache'],
      },
      {
        label: 'Display',
        lines: ['15.6-inch FHD (1920x1080); 60Hz; 250 nits brightness'],
      },
      {
        label: 'Memory & Storage',
        lines: ['16GB LPDDR5 RAM', '512GB M.2 NVMe PCIe 3.0 SSD'],
      },
      {
        label: 'Graphics & Connectivity',
        lines: [
          'AMD Radeon Graphics',
          'Wi-Fi 6E; Bluetooth 5.3',
          '1x HDMI 1.4; 1x USB 2.0 Type-A (480Mbps); 1x USB 3.2 Gen 1 Type-A (5Gbps)',
        ],
      },
      {
        label: 'Battery, Camera & Warranty',
        lines: [
          '45W AC Adapter; 720p HD camera; SonicMaster audio',
          'Chiclet keyboard; System diagnosis, Battery health charging, AI Noise Canceling',
          'Weight: 1.63kg; Color: Green Gray; Windows 11 Home',
          'Warranty: 2 Year (Battery, Adapter 1 Year)',
        ],
      },
    ],
    descriptionTitle: 'ASUS Vivobook Go 15 L1504FA-BQ2548W Ryzen 5 7520U',
    descriptionParagraph:
      'A 15.6-inch everyday laptop powered by the AMD Ryzen 5 7520U with 16GB LPDDR5 RAM and a 512GB NVMe SSD, featuring Wi-Fi 6E connectivity and AI noise-canceling for calls.',
  },
  {
    slug: 'hp-envy-x360-ryzen-5-8gb-ram-512gb-ssd-16-touch-laptop',
    name: 'HP ENVY x360 Ryzen 5 8GB RAM 512GB SSD 16" Touch',
    brand: 'HP',
    model: 'HP ENVY x360 16-ad0013dx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Laptop', href: '/laptop' },
      { label: 'HP ENVY x360 Ryzen 5 8GB RAM 512GB SSD 16" Touch', href: '/hp-envy-x360-ryzen-5-8gb-ram-512gb-ssd-16-touch-laptop' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/HP_ENVY_x360_Ryzen_5_8GB_RAM_512__1_-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/HP_ENVY_x360_Ryzen_5_8GB_RAM_512__1_-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/HP/HP_ENVY_x360_Ryzen_5_8GB_RAM_512-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/HP/HP_ENVY_x360_Ryzen_5_8GB_RAM_512-removebg-preview-550x550.png' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 95000,
    priceOld: 101650,
    discountPct: 7,
    keyFeatures: [
      'AMD Ryzen 5 8640HS processor with up to 4.9 GHz boost',
      '8GB LPDDR5 RAM with 512GB M.2 NVMe SSD storage',
      '16" WUXGA IPS LED touch display with 300 nits brightness',
      'AMD Radeon Graphics with backlit keyboard',
      'Convertible x360 design for versatile use',
      'Windows 11 with MS Office 365 one-year subscription included',
    ],
    specGroups: [
      {
        label: 'Processor',
        lines: ['AMD Ryzen 5 8640HS; 3.5 GHz base, up to 4.9 GHz boost; 16MB cache'],
      },
      {
        label: 'Display',
        lines: ['16" WUXGA IPS LED; 300 nits brightness; multi-touch'],
      },
      {
        label: 'Memory & Storage',
        lines: ['8GB LPDDR5 RAM (onboard, 6400 MHz)', '512GB M.2 NVMe PCIe Gen 4 SSD'],
      },
      {
        label: 'Graphics & Connectivity',
        lines: [
          'AMD Radeon Graphics',
          '2x USB Type-A (10Gbps), 2x USB Type-C (10Gbps)',
          '1x HDMI 2.1, DisplayPort 1.4a, 1x headphone/microphone combo jack',
        ],
      },
      {
        label: 'Battery, Software & Warranty',
        lines: [
          '68 Wh battery; 65W USB Type-C power adapter',
          'Backlit keyboard; Windows 11 with MS Office 365 (1-year subscription)',
          'Dimensions: 14.04 x 9.68 x 0.72 inches; Weight: 1.9 kg',
          'Warranty: 1 Year Parts & 2 Years Service',
        ],
      },
    ],
    descriptionTitle: 'HP ENVY x360 Ryzen 5 8GB RAM 512GB SSD 16" Touch',
    descriptionParagraph:
      'This convertible laptop blends portability with performance, featuring the AMD Ryzen 5 8640HS processor and a spacious 16-inch touchscreen for versatile computing and multimedia tasks.',
  },
]
