import type { CategoryProduct } from '../categoryProducts'
import type { ProductDetail } from '../productDetail'

export const products: CategoryProduct[] = [
  {
    id: 'dahua-650va-offline-ups',
    slug: 'dahua-650va-offline-ups',
    name: 'Dahua 650VA Offline UPS',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Dahua/Dahua-650VA-Offline-UPS-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 3600,
    priceOld: 3600,
    discountPct: 0,
  },
  {
    id: 'hikvision-650va-offline-ups',
    slug: 'hikvision-650va-offline-ups',
    name: 'Hikvision 650VA Offline UPS',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Hikvision/Hikvision-650VA-Offline-UPS-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 3700,
    priceOld: 3700,
    discountPct: 0,
  },
  {
    id: 'power-pac-2000va-offline-ups',
    slug: 'power-pac-2000va-offline-ups',
    name: 'Power Pac 2000VA Offline UPS',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Power-Pac/Power-Pac-2000VA-Offline-UPS-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 14800,
    priceOld: 15836,
    discountPct: 7,
  },
  {
    id: 'power-pac-1500va-offline-ups',
    slug: 'power-pac-1500va-offline-ups',
    name: 'Power Pac 1500VA Offline UPS',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Power-Pac/Power-Pac-1500VA-Offline-UPS-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 11000,
    priceOld: 11770,
    discountPct: 7,
  },
  {
    id: 'marsriva-mr-uf3000-3000va-smart-line-interactive-ups',
    slug: 'marsriva-mr-uf3000-3000va-smart-line-interactive-ups',
    name: 'Marsriva MR-UF3000 3000VA Smart Line-Interactive UPS',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF3000-3000VA-Smart-Line-Interactive-UPS-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 23000,
    priceOld: 24610,
    discountPct: 7,
  },
  {
    id: 'marsriva-mr-uf2000-2000va-smart-line-interactive-ups',
    slug: 'marsriva-mr-uf2000-2000va-smart-line-interactive-ups',
    name: 'Marsriva MR-UF2000 2000VA Smart Line-Interactive UPS',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF2000-2000VA-Smart-Line-Interactive-UPS-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 13400,
    priceOld: 14338,
    discountPct: 7,
  },
  {
    id: 'kstar-3000va-line-interactive-offline-ups',
    slug: 'kstar-3000va-line-interactive-offline-ups',
    name: 'KSTAR 3000VA Line Interactive Offline UPS',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/KSTAR/KSTAR-3000VA-Line-Interactive-Offline-UPS-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 21500,
    priceOld: 23005,
    discountPct: 7,
  },
  {
    id: 'kstar-2000va-offline-ups',
    slug: 'kstar-2000va-offline-ups',
    name: 'KSTAR 2000VA Offline UPS',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/KSTAR/KSTAR-2000VA-Offline-UPS-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 12900,
    priceOld: 13803,
    discountPct: 7,
  },
]

export const priceMin = Math.min(...products.map((p) => p.priceNew))
export const priceMax = Math.max(...products.map((p) => p.priceNew))

export const details: ProductDetail[] = [
  {
    slug: 'dahua-650va-offline-ups',
    name: 'Dahua 650VA Offline UPS',
    brand: 'Dahua',
    model: '650VA',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'UPS', href: '/ups-ips' },
      { label: 'Dahua 650VA Offline UPS', href: '/dahua-650va-offline-ups' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Dahua/Dahua-650VA-Offline-UPS-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Dahua/Dahua-650VA-Offline-UPS-80x80.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Dahua/Dahua-650VA-Offline-UPS1-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Dahua/Dahua-650VA-Offline-UPS1-80x80.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 3600,
    priceOld: 3600,
    discountPct: 0,
    keyFeatures: [
      'Output capacity of 650VA with 360W load support',
      'Input voltage range 150-275 VAC with automatic switchover under 10ms',
      'Lead-acid battery (12V, 7Ah) charges to 90% within six hours',
      'Built-in protection against overload, heavy discharge, and overcharging',
      'Status indicator lights for real-time operational monitoring',
    ],
    specGroups: [
      {
        label: 'Power & Battery',
        lines: [
          'Capacity: 650 VA',
          'Load Capacity: 360 W',
          'Input Voltage: 150-275 VAC',
          'Battery Type: Lead-acid (12V, 7Ah)',
          'Transfer Time: <10 ms',
        ],
      },
      {
        label: 'Output',
        lines: ['Output Voltage: 220 VAC ± 10%', 'Frequency: 50/60 Hz', 'Power Factor: 0.85'],
      },
      {
        label: 'Physical',
        lines: ['Weight: 4.4 kg', 'Protection: Overload, heavy discharge, overcharge', 'Warranty: 1 year'],
      },
    ],
    descriptionTitle: 'Dahua 650VA Offline UPS',
    descriptionParagraph:
      'This unit delivers reliable backup power with seamless mains-to-battery transitions, offering 220 VAC ± 10% output and supporting both mains and battery operation modes with visual status indicators and circuit protection.',
  },
  {
    slug: 'hikvision-650va-offline-ups',
    name: 'Hikvision 650VA Offline UPS',
    brand: 'Hikvision',
    model: 'DS-UPS650',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'UPS', href: '/ups-ips' },
      { label: 'Hikvision 650VA Offline UPS', href: '/hikvision-650va-offline-ups' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Hikvision/Hikvision-650VA-Offline-UPS-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Hikvision/Hikvision-650VA-Offline-UPS-80x80.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Hikvision/Hikvision-650VA-Offline-UPS1-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Hikvision/Hikvision-650VA-Offline-UPS1-80x80.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 3700,
    priceOld: 3700,
    discountPct: 0,
    keyFeatures: [
      '650VA / 360W capacity with 12V/7Ah battery',
      'Input voltage range of 140-290 VAC at 50/60 Hz frequency',
      'Compact and lightweight design (approximately 4.2 kg)',
      'Multiple alarm modes for charging, low battery, overload, and fault conditions',
      'Operating range of 0°C to 40°C with humidity tolerance of 30-90%',
      'Comprehensive protection including overload and surge defense',
    ],
    specGroups: [
      {
        label: 'Power & Battery',
        lines: [
          'Capacity: 650 VA',
          'Load Capacity: 360 W',
          'Battery: 12V/7Ah x1',
          'Input Voltage: 140-290 VAC',
          'Operating Conditions: 0-40°C; 30-90% humidity',
        ],
      },
      {
        label: 'Output',
        lines: [
          'Wave Type: PWM (Charging Mode)',
          'Alarm: Charging 10s interval; Low Battery 1s; Overload 0.5s; Fault continuous',
        ],
      },
      {
        label: 'Physical',
        lines: ['Dimensions: 274 x 95 x 139 mm', 'Weight: ~4.2 kg', 'Warranty: 1 year'],
      },
    ],
    descriptionTitle: 'Hikvision 650VA Offline UPS',
    descriptionParagraph:
      'A dependable offline UPS providing stable power delivery, preventing damage to equipment during power failures and voltage fluctuations, suitable for desktops, networking devices, and office environments with LED indicators and audible alarm notifications.',
  },
  {
    slug: 'power-pac-2000va-offline-ups',
    name: 'Power Pac 2000VA Offline UPS',
    brand: 'Power Pac',
    model: '2000VA',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'UPS', href: '/ups-ips' },
      { label: 'Power Pac 2000VA Offline UPS', href: '/power-pac-2000va-offline-ups' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Power-Pac/Power-Pac-2000VA-Offline-UPS-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Power-Pac/Power-Pac-2000VA-Offline-UPS-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 14800,
    priceOld: 15836,
    discountPct: 7,
    keyFeatures: [
      'Capacity of 2000VA with 1200W load capacity',
      'Input voltage range of 175-275 VAC for stable power regulation',
      'Backup time up to 45-50 minutes for standard desktop PC setups',
      'Frequency operation at 50-60Hz with ±5% precision',
      'Output voltage maintained at 220/230 VAC with ±10% tolerance',
      'Suitable for home offices, small businesses, and entertainment systems',
    ],
    specGroups: [
      {
        label: 'Power & Battery',
        lines: ['Capacity: 2000VA', 'Load Capacity: 1200W', 'Input Voltage: 175-275 VAC'],
      },
      {
        label: 'Output',
        lines: ['Frequency (Battery Mode): 50/60Hz ±5%'],
      },
      {
        label: 'Physical',
        lines: ['Warranty: 1 Year'],
      },
    ],
    descriptionTitle: 'Power Pac 2000VA Offline UPS',
    descriptionParagraph:
      'A dependable power backup solution designed to protect electronics from power failures and voltage fluctuations, featuring extended backup time and wide voltage compatibility for workstations and home electronics.',
  },
  {
    slug: 'power-pac-1500va-offline-ups',
    name: 'Power Pac 1500VA Offline UPS',
    brand: 'Power Pac',
    model: '1500VA',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'UPS', href: '/ups-ips' },
      { label: 'Power Pac 1500VA Offline UPS', href: '/power-pac-1500va-offline-ups' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Power-Pac/Power-Pac-1500VA-Offline-UPS-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Power-Pac/Power-Pac-1500VA-Offline-UPS-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 11000,
    priceOld: 11770,
    discountPct: 7,
    keyFeatures: [
      '1500VA capacity with 900W load capability',
      'Backup duration of 15-30 minutes at full load',
      'Fast automatic transfer within 2-5 milliseconds during power failure',
      'Compatible with 50/60Hz frequency ranges',
      'Supports input voltage range of 100-240VAC (±25%)',
      'Suitable for PCs, networking devices, and home entertainment systems',
    ],
    specGroups: [
      {
        label: 'Power & Battery',
        lines: [
          'Battery: 12V & 7Ah',
          'Load Capacity: 900W',
          'Input Voltage: 100/110/120/220/230/240VAC ±25%',
          'Backup Time: 15-30 minutes (full load)',
        ],
      },
      {
        label: 'Output',
        lines: ['Frequency: 50Hz or 60Hz ±1Hz'],
      },
      {
        label: 'Physical',
        lines: ['Dimensions: 360 x 115 x 160mm', 'Warranty: 1 year'],
      },
    ],
    descriptionTitle: 'Power Pac 1500VA Offline UPS',
    descriptionParagraph:
      'This offline UPS delivers reliable and efficient power backup for protecting electronics during outages, with adaptability across multiple voltage regions and fast switching capability for minimal disruption.',
  },
  {
    slug: 'marsriva-mr-uf3000-3000va-smart-line-interactive-ups',
    name: 'Marsriva MR-UF3000 3000VA Smart Line-Interactive UPS',
    brand: 'Marsriva',
    model: 'MR-UF3000',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'UPS', href: '/ups-ips' },
      { label: 'Marsriva MR-UF3000 3000VA Smart Line-Interactive UPS', href: '/marsriva-mr-uf3000-3000va-smart-line-interactive-ups' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF3000-3000VA-Smart-Line-Interactive-UPS-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF3000-3000VA-Smart-Line-Interactive-UPS-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF3000-3000VA-Smart-Line-Interactive-UPS1-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF3000-3000VA-Smart-Line-Interactive-UPS1-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF3000-3000VA-Smart-Line-Interactive-UPS2-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF3000-3000VA-Smart-Line-Interactive-UPS2-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 23000,
    priceOld: 24610,
    discountPct: 7,
    keyFeatures: [
      'Line-Interactive topology with automatic voltage regulation (AVR)',
      'Short circuit and overcharge protection',
      'Silent mute function for disabling alarm via power button press',
      'Cold Start capability to power on without utility supply',
      'Intelligent off-mode battery charging functionality',
      'High-capacity lead-acid battery system',
    ],
    specGroups: [
      {
        label: 'Power & Battery',
        lines: ['Capacity: 3000VA / 1800W', 'Input Voltage: 220V - 240V', 'Battery: 12V / 9Ah x 4'],
      },
      {
        label: 'Output',
        lines: ['Output Voltage: 220V ~ 240V', 'Display: LED', 'Noise Level: Less than 40dB at 1 meter'],
      },
      {
        label: 'Physical',
        lines: ['Dimensions: 398 x 145 x 215 mm', 'Weight: 20kg', 'Warranty: 1 year'],
      },
    ],
    descriptionTitle: 'Marsriva MR-UF3000 3000VA Smart Line-Interactive UPS',
    descriptionParagraph:
      'This device functions as a reliable power backup solution designed to protect essential electronics from power fluctuations, surges, and outages, combining automatic voltage stabilization with durable battery technology for home or business use.',
  },
  {
    slug: 'marsriva-mr-uf2000-2000va-smart-line-interactive-ups',
    name: 'Marsriva MR-UF2000 2000VA Smart Line-Interactive UPS',
    brand: 'Marsriva',
    model: 'MR-UF2000',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'UPS', href: '/ups-ips' },
      { label: 'Marsriva MR-UF2000 2000VA Smart Line-Interactive UPS', href: '/marsriva-mr-uf2000-2000va-smart-line-interactive-ups' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF2000-2000VA-Smart-Line-Interactive-UPS-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF2000-2000VA-Smart-Line-Interactive-UPS-80x80.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF2000-2000VA-Smart-Line-Interactive-UPS1-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/MARSRIVA/Marsriva-MR-UF2000-2000VA-Smart-Line-Interactive-UPS1-80x80.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 13400,
    priceOld: 14338,
    discountPct: 7,
    keyFeatures: [
      '2000VA / 1200W capacity with 220V ~ 240V output voltage',
      'Automatic Voltage Regulation (AVR) corrects voltage fluctuations without draining battery',
      'Silent Mode Activation to reduce operational noise during battery use',
      'Cold Start Function enables operation without utility power',
      'Intelligent Off-Mode Charging maintains battery readiness when powered down',
      'Short circuit and overcharge protection safeguards connected devices',
    ],
    specGroups: [
      {
        label: 'Power & Battery',
        lines: ['Capacity: 2000VA / 1200W', 'Topology: Line-Interactive', 'Transfer Time: 2-6ms typical, 10ms max'],
      },
      {
        label: 'Output',
        lines: ['Output Voltage: 220V ~ 240V', 'Frequency: 50Hz/60Hz', 'Display: LED Indicator (4 LEDs)'],
      },
      {
        label: 'Physical',
        lines: ['Dimensions: 345 x 122 x 192mm', 'Weight: 10.9 kg', 'Warranty: 1 year'],
      },
    ],
    descriptionTitle: 'Marsriva MR-UF2000 2000VA Smart Line-Interactive UPS',
    descriptionParagraph:
      'This line-interactive UPS with AVR technology stabilizes voltage fluctuations to protect devices during outages while extending backup duration, featuring silent operation mode, cold-start capability, and continuous off-mode battery charging.',
  },
  {
    slug: 'kstar-3000va-line-interactive-offline-ups',
    name: 'KSTAR 3000VA Line Interactive Offline UPS',
    brand: 'KSTAR',
    model: '3000VA',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'UPS', href: '/ups-ips' },
      { label: 'KSTAR 3000VA Line Interactive Offline UPS', href: '/kstar-3000va-line-interactive-offline-ups' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/KSTAR/KSTAR-3000VA-Line-Interactive-Offline-UPS-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/KSTAR/KSTAR-3000VA-Line-Interactive-Offline-UPS-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 21500,
    priceOld: 23005,
    discountPct: 7,
    keyFeatures: [
      'Capacity of 3000VA with 2400-watt load capability',
      'Pure sine wave output for protection of sensitive devices',
      'Input voltage range spanning 115-300 VAC for flexible power conditions',
      'LCD display providing real-time monitoring of voltage, load, and battery status',
      'Backup power duration of 15-30 minutes with integrated 4x 12V 9Ah battery',
      'Multiple outlet configuration for comprehensive device connectivity',
    ],
    specGroups: [
      {
        label: 'Power & Battery',
        lines: ['Capacity: 3000VA', 'Load Capacity: 2400 Watt', 'Input Voltage: 115-300VAC ±5VAC', 'Backup Time: 15-30 minutes (varies with load)'],
      },
      {
        label: 'Output',
        lines: ['Output Voltage: 220/230/240VAC ±2%', 'Output Type: Pure Sine Wave', 'Frequency (Battery Mode): 50±2%', 'Power Factor: 0.8'],
      },
      {
        label: 'Physical',
        lines: ['Warranty: 1 Year'],
      },
    ],
    descriptionTitle: 'KSTAR 3000VA Line Interactive Offline UPS',
    descriptionParagraph:
      'The KSTAR 3000VA provides an essential power backup solution for both home and office environments, featuring pure sine wave output for sensitive equipment protection, an intelligent LCD display, and audible alarm notifications for low battery/overload conditions.',
  },
  {
    slug: 'kstar-2000va-offline-ups',
    name: 'KSTAR 2000VA Offline UPS',
    brand: 'KSTAR',
    model: '2000VA',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'UPS', href: '/ups-ips' },
      { label: 'KSTAR 2000VA Offline UPS', href: '/kstar-2000va-offline-ups' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/KSTAR/KSTAR-2000VA-Offline-UPS-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/KSTAR/KSTAR-2000VA-Offline-UPS-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 12900,
    priceOld: 13803,
    discountPct: 7,
    keyFeatures: [
      '2000VA capacity with 1200W load handling capability',
      'Input voltage range of 140-300V, output at 230V',
      'Backup time of 7-20 minutes at full load',
      'Fast 4-8ms transfer time during power transitions',
      'Compact dimensions (380 x 158 x 198mm) with lightweight plastic construction',
      'Compatible with 50Hz-60Hz frequency ranges',
    ],
    specGroups: [
      {
        label: 'Power & Battery',
        lines: ['Capacity: 2000VA', 'Load Capacity: 1200W', 'Input Voltage: 140-300V', 'Backup Duration: 7-20 minutes (full load)', 'Transfer Time: 4-8ms'],
      },
      {
        label: 'Output',
        lines: ['Output Voltage: 230V', 'Frequency: 50Hz-60Hz', 'Wave Type: Sine (mains), Square (inverter)', 'Noise Level: <45dB'],
      },
      {
        label: 'Physical',
        lines: ['Dimensions: 380 x 158 x 198mm', 'Warranty: 1 year'],
      },
    ],
    descriptionTitle: 'KSTAR 2000VA Offline UPS',
    descriptionParagraph:
      'The unit provides reliable backup power and protection during outages, switching to battery mode automatically. It supports devices up to 1200 watts and maintains compatibility across regional power standards.',
  },
]
