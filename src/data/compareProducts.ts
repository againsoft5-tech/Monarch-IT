export type CompareSpecRow = [label: string, value: string]

export type CompareSection = {
  title: string
  rows: CompareSpecRow[]
}

export type CompareProduct = {
  slug: string
  name: string
  model: string
  accent: string
  rating: number
  reviews: number
  priceNew: number
  priceOld: number | null
  discountPct: number | null
  sections: CompareSection[]
}

export const compareProducts: CompareProduct[] = [
  {
    slug: 'oscoo-m200-warrior-8gb-ddr4-3200mhz-desktop-ram',
    name: 'OSCOO M200 Warrior 8GB DDR4 3200MHz Desktop RAM',
    model: 'M200 Warrior',
    accent: '#d32f2f',
    rating: 4.9,
    reviews: 80,
    priceNew: 14800,
    priceOld: 16280,
    discountPct: 10,
    sections: [
      {
        title: 'Key Features',
        rows: [
          ['Type', 'DDR4'],
          ['Capacity', '8GB'],
          ['Frequency', '3200MHz'],
          ['Operating voltage', '1.20V'],
          ['Latency', 'CL15-17-19-22'],
          ['PMIC', 'On-die-ECC'],
        ],
      },
      {
        title: 'Physical dimension',
        rows: [
          ['Length', '133.35 mm'],
          ['Width', '31.25 mm'],
          ['Height', '7.30 mm'],
          ['Weight', '16 g'],
        ],
      },
      {
        title: 'Warranty Information',
        rows: [
          ['Warranty Period', 'Lifetime Limited Warranty'],
          ['Warranty Type', 'Manufacturer Warranty'],
          ['After Sales Support', 'Local Service Center'],
        ],
      },
    ],
  },
  {
    slug: 'oscoo-m200-warrior-16gb-ddr4-3200mhz-desktop-ram',
    name: 'OSCOO M200 Warrior 16GB DDR4 3200MHz Desktop RAM',
    model: 'M200 Warrior',
    accent: '#d32f2f',
    rating: 4.9,
    reviews: 42,
    priceNew: 27500,
    priceOld: 30500,
    discountPct: 10,
    sections: [
      {
        title: 'Key Features',
        rows: [
          ['Type', 'DDR4'],
          ['Capacity', '16GB'],
          ['Frequency', '3200MHz'],
          ['Operating voltage', '1.20V'],
          ['Latency', 'CL15-17-19-22'],
          ['PMIC', 'On-die-ECC'],
        ],
      },
      {
        title: 'Physical dimension',
        rows: [
          ['Length', '133.35 mm'],
          ['Width', '31.25 mm'],
          ['Height', '7.30 mm'],
          ['Weight', '18 g'],
        ],
      },
      {
        title: 'Warranty Information',
        rows: [
          ['Warranty Period', 'Lifetime Limited Warranty'],
          ['Warranty Type', 'Manufacturer Warranty'],
          ['After Sales Support', 'Local Service Center'],
        ],
      },
    ],
  },
  {
    slug: 'oscoo-x1-pro-16gb-ddr5-6000mhz-desktop-ram',
    name: 'OSCOO X1 Pro 16GB DDR5 6000MHz Desktop RAM',
    model: 'X1 Pro',
    accent: '#3749bb',
    rating: 4.8,
    reviews: 45,
    priceNew: 42000,
    priceOld: 46500,
    discountPct: 10,
    sections: [
      {
        title: 'Key Features',
        rows: [
          ['Type', 'DDR5'],
          ['Capacity', '16GB'],
          ['Frequency', '6000MHz'],
          ['Operating voltage', '1.10V'],
          ['Latency', 'CL30-36-36-76'],
          ['PMIC', 'On-die-ECC (Dual Rank)'],
        ],
      },
      {
        title: 'Physical dimension',
        rows: [
          ['Length', '133.35 mm'],
          ['Width', '31.25 mm'],
          ['Height', '8.20 mm'],
          ['Weight', '20 g'],
        ],
      },
      {
        title: 'Warranty Information',
        rows: [
          ['Warranty Period', 'Lifetime Limited Warranty'],
          ['Warranty Type', 'Manufacturer Warranty'],
          ['After Sales Support', 'Local Service Center'],
        ],
      },
    ],
  },
  {
    slug: 'kingston-fury-beast-8gb-ddr4-3200mhz-desktop-ram',
    name: 'Kingston Fury Beast 8GB DDR4 3200MHz Desktop RAM',
    model: 'Fury Beast',
    accent: '#111318',
    rating: 4.7,
    reviews: 63,
    priceNew: 15500,
    priceOld: null,
    discountPct: null,
    sections: [
      {
        title: 'Key Features',
        rows: [
          ['Type', 'DDR4'],
          ['Capacity', '8GB'],
          ['Frequency', '3200MHz'],
          ['Operating voltage', '1.35V'],
          ['Latency', 'CL16-18-18-38'],
          ['PMIC', 'On-die-ECC'],
        ],
      },
      {
        title: 'Physical dimension',
        rows: [
          ['Length', '133.35 mm'],
          ['Width', '34.90 mm'],
          ['Height', '7.20 mm'],
          ['Weight', '17 g'],
        ],
      },
      {
        title: 'Warranty Information',
        rows: [
          ['Warranty Period', 'Limited Lifetime Warranty'],
          ['Warranty Type', 'Manufacturer Warranty'],
          ['After Sales Support', 'Local Service Center'],
        ],
      },
    ],
  },
]
