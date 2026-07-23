import type { CategoryProduct } from '../categoryProducts'
import type { ProductDetail } from '../productDetail'

export const products: CategoryProduct[] = [
  {
    id: 'safenet-6u-wall-mount-network-cabinet-with-pdu',
    slug: 'safenet-6u-wall-mount-network-cabinet-with-pdu',
    name: 'Safenet 6U Wall Mount Network Cabinet with PDU',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/Safenet1of1-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 13400,
    priceOld: 13400,
    discountPct: 0,
  },
  {
    id: 'cote-6u-600x450-mm-server-rack',
    slug: 'cote-6u-600%20x%20450-mm-server-rack',
    name: 'Cote 6U 600 x 450mm Server Rack',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/cote-server-rack-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 13000,
    priceOld: 13000,
    discountPct: 0,
  },
  {
    id: 'dateup-9u-server-rack',
    slug: 'dateup-9u-server-rack',
    name: 'DATEUP 9U Server Rack (600x450x501)',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/6u-01-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 12500,
    priceOld: 12500,
    discountPct: 0,
  },
  {
    id: 'toten-9u-server-rack',
    slug: 'toten-9u-server-rack',
    name: 'Toten 9U 600 x 450mm Server Rack',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/Toten-9U-600-x-450mm-Server-Rack-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 12500,
    priceOld: 12500,
    discountPct: 0,
  },
  {
    id: 'toten-6u-server-rack',
    slug: 'toten-6u-server-rack',
    name: 'Toten 6U 600 x 450mm Server Rack',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/Tonet-6U.jpg-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 11500,
    priceOld: 11500,
    discountPct: 0,
  },
]

export const priceMin = Math.min(...products.map((p) => p.priceNew))
export const priceMax = Math.max(...products.map((p) => p.priceNew))

export const details: ProductDetail[] = [
  {
    slug: 'safenet-6u-wall-mount-network-cabinet-with-pdu',
    name: 'Safenet 6U Wall Mount Network Cabinet with PDU',
    brand: 'Safenet',
    model: '6U',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Server & Storage', href: '/server-and-storage' },
      { label: 'Safenet 6U Wall Mount Network Cabinet with PDU', href: '/safenet-6u-wall-mount-network-cabinet-with-pdu' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/Safenet1of1-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/Safenet1of1-250x250.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/safenet-1of2-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/safenet-1of2-80x80.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 13400,
    priceOld: 13400,
    discountPct: 0,
    keyFeatures: [
      'Tempered glass side panel with advanced swivel lock',
      'Adjustable front and rear vertical rails',
      'Preinstalled 2 fans on top plus a brush panel',
      'White transparent tempered glass front door with blue trim',
      'Welded frame construction for structural reliability',
      'Top panel cable brush for organization and dust protection',
    ],
    specGroups: [
      {
        label: 'Storage Specs',
        lines: ['Model: 6U', 'Dimensions: 600 x 450 x 380 mm', 'Weight: 18 kg'],
      },
      {
        label: 'Performance',
        lines: ['Cooling: 2 pre-installed top fans for airflow management'],
      },
      {
        label: 'Compatibility',
        lines: [
          'Construction: Welded frame with white transparent tempered glass front door and blue glass strip accents',
          'Cable Management: Top panel with cable brush',
          'Warranty: No warranty',
        ],
      },
    ],
    descriptionTitle: 'Safenet 6U Wall Mount Network Cabinet with PDU',
    descriptionParagraph:
      'This cabinet provides network infrastructure housing with tempered glass visibility, adjustable rail mounting systems, integrated cooling capacity, and built-in cable management solutions suitable for telecommunications environments.',
  },
  {
    slug: 'cote-6u-600%20x%20450-mm-server-rack',
    name: 'Cote 6U 600 x 450mm Server Rack',
    brand: 'Cote',
    model: '6U',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Server & Storage', href: '/server-and-storage' },
      { label: 'Cote 6U 600 x 450mm Server Rack', href: '/cote-6u-600%20x%20450-mm-server-rack' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/cote-server-rack-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/cote-server-rack-250x250.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 13000,
    priceOld: 13000,
    discountPct: 0,
    keyFeatures: [
      '6U rack with 600 x 450mm dimensions',
      'Equipped with 2 low-noise fans for the cooling system',
      'Single glass front door with vented holes and MS818 handle lock',
      '6-port PDU included for power distribution',
      'Cable entry positions on top and bottom to protect from dust',
      'Side panels with round lock security features',
    ],
    specGroups: [
      {
        label: 'Storage Specs',
        lines: ['Model: 6U Cote', 'Mount thickness: 1.5mm (main), 1.2mm (others)'],
      },
      {
        label: 'Performance',
        lines: ['Cooling System: 2 pcs fan', 'Power Distribution: 6-port PDU included'],
      },
      {
        label: 'Compatibility',
        lines: [
          'Accessories Included: Rear panel hanging plate (1), decorated orange strip (2), side panels with round lock (2), Philip screws and nuts (20 sets), glass front door with handle lock (1)',
          'Cable Entry: Top/bottom for dust protection',
          'Warranty: No warranty',
        ],
      },
    ],
    descriptionTitle: 'Cote 6U 600 x 450mm Server Rack',
    descriptionParagraph:
      'A server rack designed for equipment mounting with a single glass front door with vented holes and a dual-fan cooling system, suitable for small to medium infrastructure needs.',
  },
  {
    slug: 'dateup-9u-server-rack',
    name: 'DATEUP 9U Server Rack (600x450x501)',
    brand: 'DateUp',
    model: '9U',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Server & Storage', href: '/server-and-storage' },
      { label: 'DATEUP 9U Server Rack (600x450x501)', href: '/dateup-9u-server-rack' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/6u-01-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/6u-01-500x500-250x250.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 12500,
    priceOld: 12500,
    discountPct: 0,
    keyFeatures: [
      '2 low-noise fans cooling system',
      '6-port universal socket PDU',
      'Glass door with round lock mechanism',
      'Dimensions: 600x450x501mm',
      'Professional-grade construction for data center applications',
    ],
    specGroups: [
      {
        label: 'Storage Specs',
        lines: ['Model: 9U', 'Dimensions: 600 x 450 x 501 mm'],
      },
      {
        label: 'Performance',
        lines: ['Cooling: 2 Fans (Low noise)', 'Power Distribution: 6-port universal socket PDU'],
      },
      {
        label: 'Compatibility',
        lines: ['Door Type: Glass door with round lock'],
      },
    ],
    descriptionTitle: 'DATEUP 9U Server Rack (600x450x501)',
    descriptionParagraph:
      'The DATEUP 9U Server Rack offers 600x450x501mm dimensions designed for server and network equipment storage. It features integrated cooling with dual low-noise fans and includes a 6-port universal socket PDU for power management, while the glass door with round lock provides security along with equipment visibility.',
  },
  {
    slug: 'toten-9u-server-rack',
    name: 'Toten 9U 600 x 450mm Server Rack',
    brand: 'Toten',
    model: '9U',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Server & Storage', href: '/server-and-storage' },
      { label: 'Toten 9U 600 x 450mm Server Rack', href: '/toten-9u-server-rack' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/Toten-9U-600-x-450mm-Server-Rack-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/Toten-9U-600-x-450mm-Server-Rack-250x250.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 12500,
    priceOld: 12500,
    discountPct: 0,
    keyFeatures: [
      '9U rack unit configuration with 600 x 450mm dimensions',
      'Equipped with 2 low-noise cooling fans for thermal management',
      'Toughened glass front door for visibility and equipment protection',
      'Includes 1 x 6-port Power Distribution Unit (PDU)',
      'Comes with 1 fixed mounting tray for equipment installation',
      'Round lock mechanism',
    ],
    specGroups: [
      {
        label: 'Storage Specs',
        lines: ['Type: Server Cabinet', 'Rack Unit: 9U', 'Dimensions: 600 x 450mm', 'Fixed Tray: 1'],
      },
      {
        label: 'Performance',
        lines: ['Cooling System: 2 Fans (Low noise)', 'Power Distribution: 1 x 6 Port PDU'],
      },
      {
        label: 'Compatibility',
        lines: ['Color: Black', 'Front Door: Toughened Glass', 'Lock Type: Round, DU: 6 ports', 'Warranty: No Warranty'],
      },
    ],
    descriptionTitle: 'Toten 9U 600 x 450mm Server Rack',
    descriptionParagraph:
      'The Toten server rack provides a compact 9U solution designed for organizing networking and server equipment in data center or server room environments, featuring integrated cooling and power management capabilities.',
  },
  {
    slug: 'toten-6u-server-rack',
    name: 'Toten 6U 600 x 450mm Server Rack',
    brand: 'Toten',
    model: '6U',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Server & Storage', href: '/server-and-storage' },
      { label: 'Toten 6U 600 x 450mm Server Rack', href: '/toten-6u-server-rack' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/Tonet-6U.jpg-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/products_2025/Tonet-6U.jpg-250x250.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 11500,
    priceOld: 11500,
    discountPct: 0,
    keyFeatures: [
      '6U rack unit with 600 x 450mm dimensions',
      'Equipped with 2 low-noise cooling fans and 1 fan module',
      '6-port PDU (Power Distribution Unit)',
      'Glass front door with rotation angle exceeding 180 degrees',
      'Supports both standing and wall-mounted installation',
      '19" standard mounting compatibility',
    ],
    specGroups: [
      {
        label: 'Storage Specs',
        lines: ['Model: 6U', 'Size: 600 x 450mm', 'Materials: SPCC cold rolled steel, mounting profile 2.0mm, mounting angle 1.5mm, others 1.2mm'],
      },
      {
        label: 'Performance',
        lines: ['Cooling System: 2 Fans (Low noise) + 1 Fan module', 'Power Distribution: 6-port PDU'],
      },
      {
        label: 'Compatibility',
        lines: [
          'Construction: Welded frame, reliable structure',
          'Installation: Standing or wall mounting, 19" standard installation',
          'Physical: Removable side panels, sidelocks optional, cable entry on top cover and bottom panel, front door rotation exceeds 180 degrees',
          'Warranty: No warranty',
        ],
      },
    ],
    descriptionTitle: 'Toten 6U 600 x 450mm Server Rack',
    descriptionParagraph:
      'A 6U server rack built from SPCC cold rolled steel with a welded frame, supporting both standing and wall-mounted installation, dual cooling fans, a 6-port PDU, and a glass front door that opens beyond 180 degrees for easy equipment access.',
  },
]
