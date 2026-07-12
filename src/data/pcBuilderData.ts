export type BuildCategory = {
  key: string
  label: string
  icon: string
  iconSvg?: string
  iconSvgActive?: string
  required?: boolean
  accent?: boolean
  /** Allows more than one different product to be added under this category (e.g. two different RAM sticks). */
  multi?: boolean
}

const ICON_BASE = '/images/pc-builder/icons'

export const buildCategories: BuildCategory[] = [
  { key: 'cpu', label: 'CPU', icon: 'memory', required: true },
  { key: 'motherboard', label: 'Motherboard', icon: 'developer_board', required: true },
  {
    key: 'cpu-cooler',
    label: 'CPU Cooler',
    icon: 'ac_unit',
    iconSvg: `${ICON_BASE}/cpu-cooler-gray.svg`,
    iconSvgActive: `${ICON_BASE}/cpu-cooler.svg`,
  },
  {
    key: 'memory',
    label: 'Memory',
    icon: 'sd_card',
    iconSvg: `${ICON_BASE}/memory.svg`,
    iconSvgActive: `${ICON_BASE}/memory-active.svg`,
    required: true,
    multi: true,
  },
  {
    key: 'storage',
    label: 'Storage',
    icon: 'storage',
    iconSvg: `${ICON_BASE}/storage.svg`,
    iconSvgActive: `${ICON_BASE}/storage-active.svg`,
    multi: true,
  },
  {
    key: 'graphics-card',
    label: 'Garphics Card',
    icon: 'widgets',
    iconSvg: `${ICON_BASE}/graphics-card.svg`,
    iconSvgActive: `${ICON_BASE}/graphics-card-active.svg`,
  },
  {
    key: 'power-supply',
    label: 'Power Supply',
    icon: 'bolt',
    iconSvg: `${ICON_BASE}/power-supply.svg`,
    iconSvgActive: `${ICON_BASE}/power-supply-active.svg`,
    required: true,
  },
  {
    key: 'casing',
    label: 'Casing',
    icon: 'computer',
    iconSvg: `${ICON_BASE}/casing.svg`,
    iconSvgActive: `${ICON_BASE}/casing-active.svg`,
    required: true,
  },
  {
    key: 'casing-cooler',
    label: 'Casing Cooler',
    icon: 'air',
    iconSvg: `${ICON_BASE}/casing-cooler.svg`,
    iconSvgActive: `${ICON_BASE}/casing-cooler-active.svg`,
    multi: true,
  },
  {
    key: 'monitor',
    label: 'Monitor',
    icon: 'desktop_windows',
    iconSvg: `${ICON_BASE}/monitor.svg`,
    iconSvgActive: `${ICON_BASE}/monitor-active.svg`,
  },
  {
    key: 'keyboard',
    label: 'Keyboard',
    icon: 'keyboard',
    iconSvg: `${ICON_BASE}/keyboard.svg`,
    iconSvgActive: `${ICON_BASE}/keyboard-active.svg`,
  },
  {
    key: 'mouse',
    label: 'Mouse',
    icon: 'mouse',
    iconSvg: `${ICON_BASE}/mouse.svg`,
    iconSvgActive: `${ICON_BASE}/mouse-active.svg`,
  },
  {
    key: 'headphone',
    label: 'Headphone',
    icon: 'headphones',
    iconSvg: `${ICON_BASE}/headphone.svg`,
    iconSvgActive: `${ICON_BASE}/headphone-active.svg`,
  },
  {
    key: 'ups',
    label: 'UPS',
    icon: 'battery_charging_full',
    iconSvg: `${ICON_BASE}/ups.svg`,
    iconSvgActive: `${ICON_BASE}/ups-active.svg`,
  },
]

export type BuildProduct = {
  id: string
  categoryKey: string
  name: string
  priceNew: number
  priceOld: number
  discountPct: number
  platform?: 'AMD' | 'Intel'
  image?: string
}

function pct(oldP: number, newP: number) {
  return Math.round(((oldP - newP) / oldP) * 100)
}

function makeItems(
  categoryKey: string,
  rows: [string, number, number, ('AMD' | 'Intel')?][]
): BuildProduct[] {
  return rows.map(([name, priceNew, priceOld, platform], i) => ({
    id: `${categoryKey}-${i + 1}`,
    categoryKey,
    name,
    priceNew,
    priceOld,
    discountPct: pct(priceOld, priceNew),
    platform,
  }))
}

const CPU_IMAGE = '/images/pc-builder/products/processor.jpg'
const MOTHERBOARD_IMAGE = '/images/pc-builder/products/motherboard.jpg'

export const productsByCategory: Record<string, BuildProduct[]> = {
  cpu: makeItems('cpu', [
    ['AMD Ryzen 3 4100 Desktop Processor', 8900, 9900, 'AMD'],
    ['AMD Ryzen 5 5500 Desktop Processor', 12900, 14500, 'AMD'],
    ['AMD Ryzen 5 5600 Desktop Processor', 14800, 16800, 'AMD'],
    ['AMD Ryzen 5 5600G Desktop Processor', 15800, 17500, 'AMD'],
    ['AMD Ryzen 5 5600X Desktop Processor', 17900, 19900, 'AMD'],
    ['AMD Ryzen 7 5700G Desktop Processor', 20900, 23000, 'AMD'],
    ['AMD Ryzen 7 5700X Desktop Processor', 22500, 25000, 'AMD'],
    ['AMD Ryzen 7 5800X Desktop Processor', 26900, 29900, 'AMD'],
    ['AMD Ryzen 9 5900X Desktop Processor', 39900, 44000, 'AMD'],
    ['AMD Ryzen 9 5950X Desktop Processor', 52900, 58000, 'AMD'],
    ['Intel Core i3-12100F Processor', 10900, 12000, 'Intel'],
    ['Intel Core i5-12400F Processor', 16900, 18500, 'Intel'],
    ['Intel Core i5-13400F Processor', 21900, 24000, 'Intel'],
    ['Intel Core i7-12700F Processor', 32900, 36000, 'Intel'],
    ['Intel Core i9-13900F Processor', 59900, 65000, 'Intel'],
  ]).map((p) => ({ ...p, image: CPU_IMAGE })),
  motherboard: makeItems('motherboard', [
    ['MSI B450-A PRO MAX AM4 Motherboard', 12500, 14000, 'AMD'],
    ['Gigabyte B550M DS3H AC Motherboard', 13900, 15500, 'AMD'],
    ['ASUS Prime A520M-K Motherboard', 8900, 9900, 'AMD'],
    ['MSI PRO B660M-A DDR4 Motherboard', 15900, 17500, 'Intel'],
    ['Gigabyte H610M H DDR4 Motherboard', 9500, 10500, 'Intel'],
    ['ASUS Prime H610M-K D4 Motherboard', 10900, 12000, 'Intel'],
  ]).map((p) => ({ ...p, image: MOTHERBOARD_IMAGE })),
  'cpu-cooler': makeItems('cpu-cooler', [
    ['Deepcool AG400 ARGB CPU Cooler', 2450, 2800],
    ['Cooler Master Hyper 212 ARGB Black Edition', 3450, 3900],
    ['ID-Cooling SE-224-XT ARGB CPU Cooler', 2650, 3000],
    ['Thermalright Assassin X120 ARGB Cooler', 2950, 3300],
    ['DeepCool AK400 Digital CPU Cooler', 3150, 3500],
    ['Cooler Master MasterLiquid ML240L V2 ARGB AIO', 7900, 8900],
  ]),
  memory: makeItems('memory', [
    ['G.Skill Ripjaws V 8GB DDR4 3200MHz', 2100, 2400],
    ['Corsair Vengeance LPX 16GB DDR4 3200MHz', 4200, 4700],
    ['Kingston Fury Beast 8GB DDR4 3200MHz', 2050, 2300],
    ['TEAM T-Force Vulcan Z 16GB DDR4 3200MHz', 4100, 4600],
    ['Corsair Vengeance RGB Pro 16GB DDR4 3600MHz', 5200, 5800],
  ]),
  storage: makeItems('storage', [
    ['WD Green 480GB SATA SSD', 2650, 3000],
    ['Samsung 980 500GB NVMe SSD', 5200, 5900],
    ['Seagate Barracuda 1TB HDD', 3450, 3800],
    ['Crucial MX500 500GB SATA SSD', 4650, 5200],
    ['WD Blue SN570 1TB NVMe SSD', 7900, 8900],
  ]),
  'graphics-card': makeItems('graphics-card', [
    ['MSI GeForce GTX 1650 4GB D6 Ventus', 16900, 18500],
    ['Gigabyte Radeon RX 6600 8GB Eagle', 28900, 32000],
    ['ASUS Dual GeForce RTX 3050 8GB', 26900, 29900],
    ['Palit GeForce RTX 4060 8GB Dual', 34900, 38900],
    ['Sapphire Pulse Radeon RX 7600 8GB', 33900, 37900],
  ]),
  'power-supply': makeItems('power-supply', [
    ['Deepcool PF500 500W PSU', 3450, 3900],
    ['Cooler Master MWE 550 Bronze V2 PSU', 5200, 5800],
    ['Corsair CV550 550W 80+ Bronze PSU', 5900, 6600],
    ['Antec NeoECO 650W Gold PSU', 8900, 9900],
    ['Thermaltake Smart 500W PSU', 3650, 4100],
  ]),
  casing: makeItems('casing', [
    ['Xigmatek Aquarius Pro ARGB Casing', 4650, 5200],
    ['DeepCool CC560 ARGB Mid Tower Casing', 6900, 7700],
    ['Value-Top X2 Gaming Casing', 3450, 3900],
    ['Montech Air 100 ARGB Casing', 5900, 6600],
    ['Cooler Master MasterBox TD500 Mesh ARGB', 9900, 10900],
  ]),
  'casing-cooler': makeItems('casing-cooler', [
    ['12cm ARGB Casing Fan (Single Pack)', 650, 800],
    ['3-in-1 ARGB Casing Fan Combo Pack', 1850, 2200],
    ['14cm High Airflow Casing Fan', 850, 1000],
    ['Deepcool RF120 ARGB Fan (3-Pack)', 2450, 2800],
  ]),
  monitor: makeItems('monitor', [
    ['Dahua 19.5 Inch HD LED Monitor', 6900, 7700],
    ['HP V24ie G5 24 Inch FHD Monitor', 10900, 12000],
    ['Dell E2216HV 22 Inch LED Monitor', 9500, 10500],
    ['Xiaomi Redmi 27 Inch FHD Monitor', 13900, 15500],
    ['LG 24MP400 24 Inch IPS Monitor', 11900, 13200],
  ]),
  keyboard: makeItems('keyboard', [
    ['A4Tech Fstyler FK10 Wired Keyboard', 650, 800],
    ['Redragon Kumara K552 Mechanical Keyboard', 2450, 2800],
    ['Logitech K120 Wired Keyboard', 750, 900],
    ['Fantech MK853 RGB Mechanical Keyboard', 3450, 3900],
  ]),
  mouse: makeItems('mouse', [
    ['A4Tech OP-720 Wired Mouse', 350, 450],
    ['Logitech B100 Wired Mouse', 450, 550],
    ['Fantech Blake X17 RGB Gaming Mouse', 950, 1150],
    ['Redragon Cobra M711 RGB Gaming Mouse', 1450, 1700],
  ]),
  headphone: makeItems('headphone', [
    ['A4Tech HS-50 Wired Headphone', 650, 800],
    ['Fantech MH85 Gaming Headphone', 1850, 2200],
    ['Havit H2002d Wired Headphone', 950, 1150],
    ['Boat Rockerz 450 Wireless Headphone', 2450, 2800],
  ]),
  ups: makeItems('ups', [
    ['Pro Power 650VA UPS', 3450, 3900],
    ['Ehome 1200VA UPS', 6900, 7700],
    ['Rahimafrooz Easy Power 650VA UPS', 4650, 5200],
    ['Apex 1000VA UPS', 5900, 6600],
  ]),
}
