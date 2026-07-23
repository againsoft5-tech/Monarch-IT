import type { CategoryProduct } from '../categoryProducts'
import type { ProductDetail } from '../productDetail'

export const products: CategoryProduct[] = [
  {
    id: 'yuanxin-x-5505-usb-wifi-adapter',
    slug: 'yuanxin-x-5505-usb-wifi-adapter',
    name: 'Yuanxin X-5505 1300Mbps Dual Band USB Wi-Fi Adapter',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Yuanxin-/x-5505-01-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 1500,
    priceOld: 1500,
    discountPct: 0,
  },
  {
    id: 'cudy-wu1300s-wifi-usb-adapter',
    slug: 'cudy-wu1300s-wifi-usb-adapter',
    name: 'Cudy WU1300S AC1300 High Gain Dual Band USB WiFi Adapter',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu1300s-02-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 1380,
    priceOld: 1380,
    discountPct: 0,
  },
  {
    id: 'yuanxin-x-5503-dual-band-wifi-adapter',
    slug: 'yuanxin-x-5503-dual-band-wifi-adapter',
    name: 'Yuanxin X-5503 650Mbps Dual Band USB Wi-Fi Adapter',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Yuanxin-/x-5503-01-500x500-(1)-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 1180,
    priceOld: 1180,
    discountPct: 0,
  },
  {
    id: 'tenda-u2-ax300-usb-wi-fi-adapter',
    slug: 'tenda-u2-ax300-usb-wi-fi-adapter',
    name: 'Tenda U2 AX300 USB High Gain Wi-Fi Adapter',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Tenda/u2-01-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 1100,
    priceOld: 1100,
    discountPct: 0,
  },
  {
    id: 'cudy-wu650-650mbps-wi-fi-dual-band-usb-adapter',
    slug: 'cudy-wu650-650mbps-wi-fi-dual-band-usb-adapter',
    name: 'Cudy WU650 AC650 Dual Band Nano USB WiFi Adapter',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu650-01-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 980,
    priceOld: 980,
    discountPct: 0,
  },
  {
    id: 'tp-link-archer-t2u-plus-ac600-600mbps-usb-adapter',
    slug: 'tp-link-archer-t2u-plus-ac600-600mbps-usb-adapter',
    name: 'TP-Link Archer T2U Plus AC600 Dual Band USB WiFi Adapter',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/TP-Link/archer-t2u-plus-02-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 1639,
    priceOld: 1639,
    discountPct: 0,
  },
  {
    id: 'tp-link-archer-tx20u-nano-ax1800-wi-fi-6-usb-adapter',
    slug: 'tp-link-archer-tx20u-nano-ax1800-wi-fi-6-usb-adapter',
    name: 'TP-Link Archer TX20U Nano AX1800 Dual Band USB WiFi Adapter',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/TP-Link/archer-tx20u-nano-01-500x500-250x250.jpg',
    rating: 0,
    reviews: 0,
    priceNew: 1830,
    priceOld: 1830,
    discountPct: 0,
  },
  {
    id: 'cudy-we9300-wifi-7-pci-e-adapter',
    slug: 'cudy-we9300-wifi-7-pci-e-adapter',
    name: 'Cudy WE9300 BE9300 9300Mbps Tri-Band WiFi 7 PCI-E Adapter',
    image: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/we9300-01-500x500-removebg-preview-250x250.png',
    rating: 0,
    reviews: 0,
    priceNew: 6300,
    priceOld: 6300,
    discountPct: 0,
  },
]

export const priceMin = Math.min(...products.map((p) => p.priceNew))
export const priceMax = Math.max(...products.map((p) => p.priceNew))

export const details: ProductDetail[] = [
  {
    slug: 'yuanxin-x-5505-usb-wifi-adapter',
    name: 'Yuanxin X-5505 1300Mbps Dual Band USB Wi-Fi Adapter',
    brand: 'Yuanxin',
    model: 'X-5505',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Networking', href: '/networking' },
      { label: 'Yuanxin X-5505 1300Mbps Dual Band USB Wi-Fi Adapter', href: '/yuanxin-x-5505-usb-wifi-adapter' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Yuanxin-/x-5505-01-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Yuanxin-/x-5505-01-500x500-250x250.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 1500,
    priceOld: 1500,
    discountPct: 0,
    keyFeatures: [
      'Dual Band (2.4GHz, 5GHz) connectivity for flexible networking',
      '1300 Mbps combined data transfer rate across both bands',
      'USB Type-A interface for direct connection to computers',
      'Compatible with Windows XP/Vista/7/8/10/11',
      '650 Mbps per band for stable dual-frequency performance',
    ],
    specGroups: [
      {
        label: 'Network Specs',
        lines: ['Frequency: Dual Band (2.4GHz, 5GHz)', 'Transfer Rate: 1300 Mbps combined, 650 Mbps per band'],
      },
      {
        label: 'Ports',
        lines: ['Interface: USB Type-A'],
      },
      {
        label: 'Compatibility & Warranty',
        lines: ['Operating Systems: Windows XP/Vista/7/8/10/11', 'Warranty: 1 Year'],
      },
    ],
    descriptionTitle: 'Yuanxin X-5505 1300Mbps Dual Band USB Wi-Fi Adapter',
    descriptionParagraph:
      'A dual-band USB Wi-Fi adapter delivering combined speeds of up to 1300 Mbps across 2.4GHz and 5GHz bands, offering a simple plug-and-play way to add or upgrade wireless connectivity on a desktop or laptop.',
  },
  {
    slug: 'cudy-wu1300s-wifi-usb-adapter',
    name: 'Cudy WU1300S AC1300 High Gain Dual Band USB WiFi Adapter',
    brand: 'Cudy',
    model: 'WU1300S',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Networking', href: '/networking' },
      { label: 'Cudy WU1300S AC1300 High Gain Dual Band USB WiFi Adapter', href: '/cudy-wu1300s-wifi-usb-adapter' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu1300s-02-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu1300s-02-500x500-250x250.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu1300s-03-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu1300s-03-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 1380,
    priceOld: 1380,
    discountPct: 0,
    keyFeatures: [
      'Internal PIFA high-gain antenna with 2dBi capability',
      'Dual-band operation on 2.4GHz and 5GHz frequencies',
      'Maximum data rates of 400Mbps (2.4GHz) and 867Mbps (5GHz)',
      'USB 3.0 hi-speed connector interface',
      'Compatible with Windows 7, 8, 8.1, 10 and Macintosh systems',
    ],
    specGroups: [
      {
        label: 'Network Specs',
        lines: [
          'WiFi Frequency: Dual Band (2.4GHz & 5GHz)',
          'Data Rate: 400Mbps (2.4GHz), 867Mbps (5GHz)',
          '802.11b/g/n/ac supported',
        ],
      },
      {
        label: 'Ports',
        lines: ['Interface: USB 3.0 Hi-Speed Connector'],
      },
      {
        label: 'Physical',
        lines: ['Antenna: Internal PIFA High Gain 2dBi Antenna'],
      },
      {
        label: 'Compatibility & Warranty',
        lines: ['Operating Systems: Windows 7/8/8.1/10, Macintosh', 'Warranty: 1 Year'],
      },
    ],
    descriptionTitle: 'Cudy WU1300S AC1300 High Gain Dual Band USB WiFi Adapter',
    descriptionParagraph:
      'A high-gain dual-band USB adapter with an internal PIFA antenna, supporting AC1300 speeds over USB 3.0 for a fast, stable wireless connection on Windows and Mac systems.',
  },
  {
    slug: 'yuanxin-x-5503-dual-band-wifi-adapter',
    name: 'Yuanxin X-5503 650Mbps Dual Band USB Wi-Fi Adapter',
    brand: 'Yuanxin',
    model: 'X-5503',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Networking', href: '/networking' },
      { label: 'Yuanxin X-5503 650Mbps Dual Band USB Wi-Fi Adapter', href: '/yuanxin-x-5503-dual-band-wifi-adapter' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Yuanxin-/x-5503-01-500x500-(1)-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Yuanxin-/x-5503-01-500x500-(1)-250x250.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 1180,
    priceOld: 1180,
    discountPct: 0,
    keyFeatures: [
      'Dual-band wireless connectivity supporting both 2.4GHz and 5GHz',
      'USB Type-A interface for direct connection to compatible devices',
      'Data transfer rates up to 650 Mbps',
      'Compatible with Windows XP through Windows 11',
      '1-year manufacturer warranty included',
    ],
    specGroups: [
      {
        label: 'Network Specs',
        lines: ['Frequency Bands: Dual Band (2.4GHz, 5GHz)', 'Data Transfer Rates: 650 Mbps'],
      },
      {
        label: 'Ports',
        lines: ['Interface: USB Type-A'],
      },
      {
        label: 'Compatibility & Warranty',
        lines: ['OS Compatibility: Windows XP/Vista/7/8/10/11', 'Warranty: 1 Year'],
      },
    ],
    descriptionTitle: 'Yuanxin X-5503 650Mbps Dual Band USB Wi-Fi Adapter',
    descriptionParagraph:
      'This wireless adapter delivers connectivity through dual-band frequencies and moderate data transfer speeds, designed for desktop and laptop integration via standard USB ports across multiple Windows platforms.',
  },
  {
    slug: 'tenda-u2-ax300-usb-wi-fi-adapter',
    name: 'Tenda U2 AX300 USB High Gain Wi-Fi Adapter',
    brand: 'Tenda',
    model: 'U2',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Networking', href: '/networking' },
      { label: 'Tenda U2 AX300 USB High Gain Wi-Fi Adapter', href: '/tenda-u2-ax300-usb-wi-fi-adapter' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Tenda/u2-01-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Tenda/u2-01-500x500-250x250.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 1100,
    priceOld: 1100,
    discountPct: 0,
    keyFeatures: [
      '1x6dBi antenna with enhanced wireless reception',
      'USB 2.0 interface for straightforward connectivity',
      '2.4GHz speeds up to 286Mbps',
      'Station Mode and SoftAP Mode for flexible configurations',
      'Compatible with Windows 7/10/11 and Linux 3.2+',
      'Compact dimensions of 48mm x 20mm x 8mm',
    ],
    specGroups: [
      {
        label: 'Network Specs',
        lines: ['Modes: Station Mode, SoftAP Mode', 'Frequency: 2.4GHz', 'Data Rate: Up to 286Mbps', 'Antenna: 1x6dBi'],
      },
      {
        label: 'Ports',
        lines: ['Interface: USB 2.0'],
      },
      {
        label: 'Physical',
        lines: ['Dimensions: 48mm x 20mm x 8mm (L x W x H)'],
      },
      {
        label: 'Compatibility & Warranty',
        lines: ['Operating Systems: Windows 7/10/11, Linux 3.2+, UOS', 'Warranty: 1 Year'],
      },
    ],
    descriptionTitle: 'Tenda U2 AX300 USB High Gain Wi-Fi Adapter',
    descriptionParagraph:
      'This compact USB adapter delivers wireless connectivity with dual operational modes supporting both client and access point functions, making it suitable for desktop computers requiring WiFi capability.',
  },
  {
    slug: 'cudy-wu650-650mbps-wi-fi-dual-band-usb-adapter',
    name: 'Cudy WU650 AC650 Dual Band Nano USB WiFi Adapter',
    brand: 'Cudy',
    model: 'WU650',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Networking', href: '/networking' },
      { label: 'Cudy WU650 AC650 Dual Band Nano USB WiFi Adapter', href: '/cudy-wu650-650mbps-wi-fi-dual-band-usb-adapter' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu650-01-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu650-01-500x500-250x250.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu650-02-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu650-02-500x500-550x550.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu650-03-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/wu650-03-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 980,
    priceOld: 980,
    discountPct: 0,
    keyFeatures: [
      '650 (433+200) Mbps wireless speed',
      'Compatible with 802.11ac/n/b/g standard',
      'Selectable dual-band connections',
      'Built-in 2dBi antenna',
      'Compact nano USB form factor (20x15x8mm), 3 grams',
    ],
    specGroups: [
      {
        label: 'Network Specs',
        lines: [
          'Data Rate: 11b 1/2/5.5/11Mbps; 11g 6/9/12/18/24/36/48/54Mbps; 11n 200Mbps; 11ac 433Mbps',
          'Frequency: 2.412-2.4835GHz, 5.180-5.825GHz',
          'Antenna: Built-in 2dBi Antenna',
        ],
      },
      {
        label: 'Ports',
        lines: ['Interface: USB 2.0'],
      },
      {
        label: 'Physical',
        lines: ['Dimensions: 20x15x8mm', 'Weight: 3g'],
      },
      {
        label: 'Compatibility & Warranty',
        lines: ['Operating Systems: Windows XP/Vista/7/8/8.1/10, MacOS 10.6-10.15', 'Warranty: 1 Year'],
      },
    ],
    descriptionTitle: 'Cudy WU650 AC650 Dual Band Nano USB WiFi Adapter',
    descriptionParagraph:
      'An ultra-compact nano USB adapter offering AC650 dual-band speeds with a built-in antenna, weighing just 3 grams for an unobtrusive plug-in Wi-Fi upgrade.',
  },
  {
    slug: 'tp-link-archer-t2u-plus-ac600-600mbps-usb-adapter',
    name: 'TP-Link Archer T2U Plus AC600 Dual Band USB WiFi Adapter',
    brand: 'TP-Link',
    model: 'Archer T2U Plus',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Networking', href: '/networking' },
      { label: 'TP-Link Archer T2U Plus AC600 Dual Band USB WiFi Adapter', href: '/tp-link-archer-t2u-plus-ac600-600mbps-usb-adapter' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/TP-Link/archer-t2u-plus-02-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/TP-Link/archer-t2u-plus-02-500x500-250x250.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/TP-Link/archer-t2u-plus-03-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/TP-Link/archer-t2u-plus-03-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 1639,
    priceOld: 1639,
    discountPct: 0,
    keyFeatures: [
      '600 Mbps wireless speeds across dual bands',
      '1 external high-gain 5dBi antenna',
      'USB 2.0 interface connection',
      'Compatible with Windows 11/10/8.1/8/7/XP, Mac OS 10.15 and earlier',
      '1-year warranty',
    ],
    specGroups: [
      {
        label: 'Network Specs',
        lines: ['Frequency: 2.4 GHz, 5 GHz', 'Wireless Security: WEP, WPA/WPA2, WPA-PSK/WPA2-PSK'],
      },
      {
        label: 'Ports',
        lines: ['Interface: USB 2.0', 'Antenna: 1 External High Gain 5dBi Antenna'],
      },
      {
        label: 'Physical',
        lines: ['Dimensions: 57.8 x 18 x 173.4 mm'],
      },
      {
        label: 'Compatibility & Warranty',
        lines: ['System Requirements: Windows 11/10/8.1/8/7/XP, Mac OS 10.15 and earlier', 'Warranty: 1 Year'],
      },
    ],
    descriptionTitle: 'TP-Link Archer T2U Plus AC600 Dual Band USB WiFi Adapter',
    descriptionParagraph:
      'A dual-band AC600 USB adapter with a high-gain external antenna, giving desktops and laptops reliable 2.4GHz and 5GHz wireless connectivity over a simple USB 2.0 connection.',
  },
  {
    slug: 'tp-link-archer-tx20u-nano-ax1800-wi-fi-6-usb-adapter',
    name: 'TP-Link Archer TX20U Nano AX1800 Dual Band USB WiFi Adapter',
    brand: 'TP-Link',
    model: 'Archer TX20U Nano',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Networking', href: '/networking' },
      { label: 'TP-Link Archer TX20U Nano AX1800 Dual Band USB WiFi Adapter', href: '/tp-link-archer-tx20u-nano-ax1800-wi-fi-6-usb-adapter' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/TP-Link/archer-tx20u-nano-01-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/TP-Link/archer-tx20u-nano-01-500x500-250x250.jpg' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/TP-Link/archer-tx20u-nano-02-500x500-550x550.jpg', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/TP-Link/archer-tx20u-nano-02-500x500-550x550.jpg' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 1830,
    priceOld: 1830,
    discountPct: 0,
    keyFeatures: [
      'USB 3.0 interface for enhanced connectivity speeds',
      'IEEE 802.11a/b/g/n/ac/ax wireless standards supporting WiFi 6',
      'Operates on 2.4 GHz and 5 GHz dual-band frequencies',
      '2x dual-band antennas for improved signal reception',
      'Compact nano design measuring 26.8 x 15.7 x 7.5 mm',
      'Supports WEP, WPA/WPA2/WPA3 security protocols',
    ],
    specGroups: [
      {
        label: 'Network Specs',
        lines: [
          'Wireless Standards: IEEE 802.11a/b/g/n/ac/ax',
          'Frequency Bands: 2.4 GHz, 5 GHz',
          'Wireless Mode: Infrastructure mode',
          'Security: WEP, WPA/WPA2/WPA3, WPA-PSK/WPA2-PSK',
        ],
      },
      {
        label: 'Ports',
        lines: ['Interface: USB 3.0', 'Antenna: 2x Dual-Band Antennas'],
      },
      {
        label: 'Physical',
        lines: ['Dimensions: 26.8 x 15.7 x 7.5 mm'],
      },
      {
        label: 'Compatibility & Warranty',
        lines: ['System Requirements: Windows 11/10/8.1/8/7/XP, Mac OS 10.15 and earlier', 'Warranty: 1 Year'],
      },
    ],
    descriptionTitle: 'TP-Link Archer TX20U Nano AX1800 Dual Band USB WiFi Adapter',
    descriptionParagraph:
      'A compact WiFi 6 adapter designed for dual-band connectivity with modern security standards and backward compatibility across multiple operating systems.',
  },
  {
    slug: 'cudy-we9300-wifi-7-pci-e-adapter',
    name: 'Cudy WE9300 BE9300 9300Mbps Tri-Band WiFi 7 PCI-E Adapter',
    brand: 'Cudy',
    model: 'WE9300',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Networking', href: '/networking' },
      { label: 'Cudy WE9300 BE9300 9300Mbps Tri-Band WiFi 7 PCI-E Adapter', href: '/cudy-we9300-wifi-7-pci-e-adapter' },
    ],
    images: [
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/we9300-01-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/we9300-01-500x500-removebg-preview-250x250.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/we9300-02-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/we9300-02-500x500-removebg-preview-550x550.png' },
      { large: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/we9300-03-500x500-removebg-preview-550x550.png', thumb: 'https://www.monarchit.com.bd/image/cache/catalog/Cudy-/we9300-03-500x500-removebg-preview-550x550.png' },
    ],
    rating: 0,
    reviewCount: 0,
    priceNew: 6300,
    priceOld: 6300,
    discountPct: 0,
    keyFeatures: [
      'Wi-Fi 7 Tri-Band (2.4GHz, 5GHz, & 6GHz) connectivity with combined speeds',
      'Data Rate: 5.7 Gbps + 2.8 Gbps + 688 Mbps across frequency bands',
      '2x detachable antennas with Bluetooth 5.4 support',
      'Requires PCI-E 1x or higher slot or USB 9-PIN slot on motherboard',
      'Windows 11 64-Bit compatible with Intel CPU systems',
      '1-year warranty included',
    ],
    specGroups: [
      {
        label: 'Network Specs',
        lines: [
          '6 GHz speed: 5760 Mbps | 5 GHz: 2882 Mbps | 2.4 GHz: 688 Mbps',
          'Security: WPA/WPA2/WPA3',
          'Antenna: Internal PIFA 2dBi, 2x Detachable',
        ],
      },
      {
        label: 'Ports',
        lines: ['Interface: PCI-E 1x+ or USB 9-PIN slot required'],
      },
      {
        label: 'Physical',
        lines: ['Device Dimensions: 70x45.5x20 mm', 'Antenna Dimensions: 15x221.5 mm', 'Weight: 114.5 g'],
      },
      {
        label: 'Compatibility & Warranty',
        lines: ['System Requirements: Windows 11 64-Bit, Intel CPU systems', 'Warranty: 1 Year'],
      },
    ],
    descriptionTitle: 'Cudy WE9300 BE9300 9300Mbps Tri-Band WiFi 7 PCI-E Adapter',
    descriptionParagraph:
      'A high-end tri-band WiFi 7 PCI-E adapter combining speeds of up to 9300 Mbps across 2.4GHz, 5GHz and 6GHz bands with detachable antennas and Bluetooth 5.4, built for desktop PCs that need the fastest available wireless connection.',
  },
]
