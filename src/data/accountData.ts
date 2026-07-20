export type AccountOrderRow = {
  id: string
  date: string
  productLabel: string
  total: number
  paid: number
  due: number
  status: string
}

export type AccountOrderVariantLine = {
  label: string
  qty: number
  unitPrice: number
}

export type AccountOrderProduct = {
  name: string
  imageUrl?: string | null
  totalQty: number
  lines: AccountOrderVariantLine[]
}

export type AccountOrderDetail = AccountOrderRow & {
  customerName: string
  phone: string
  email: string
  deliveryAddress: string
  deliveryMethod: string
  shippingMethod: string
  advancePaid: number
  products: AccountOrderProduct[]
}

export type AccountPaymentRow = {
  id: string
  date: string
  orderId: string
  amount: number
  method: string
  status: 'Initiated' | 'Completed' | 'Failed' | string
  trxId?: string
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  paidAt?: string
  note?: string
}

export type AccountQcRow = {
  orderId: string
  date: string
  status: string
  product: string
}

export type AccountComplainRow = {
  id: string
  date: string
  orderId: string
  subject: string
  status: string
}

export type AccountSupportRow = {
  code: string
  date: string
  orders: string
  manager: string
  status: string
  message: string
}

export type AccountPointsRow = {
  date: string
  type: string
  purpose: string
  orders: string
  paymentId: string
  amount: number
}

export type AccountDeliveryRow = {
  invoice: string
  date: string
  orders: string
  method: string
  amount: number
  status: string
  trackingNumber?: string
  trackingUrl?: string
}

export type AccountRefundRow = {
  orders: string
  date: string
  amount: number
  method: string
  info: string
  status: string
}

export const COMPLAIN_INTRO_BN =
  'অর্ডার সংক্রান্ত অভিযোগ জানাতে নিচের ফর্মটি পূরণ করুন। আমাদের টিম দ্রুত যোগাযোগ করবে।'

export const accountOrders: AccountOrderDetail[] = [
  {
    id: 'MI-10245',
    date: '2026-07-02',
    productLabel: '2 items',
    total: 128500,
    paid: 89950,
    due: 38550,
    status: 'Processing',
    customerName: 'Rafiul Islam',
    phone: '01711223344',
    email: 'rafiul@example.com',
    deliveryAddress: 'House 12, Road 4, Dhanmondi, Dhaka',
    deliveryMethod: 'Home Delivery',
    shippingMethod: 'Standard (3-5 days)',
    advancePaid: 89950,
    products: [
      {
        name: 'ASUS TUF Gaming F15 Core i5 12th Gen',
        imageUrl: null,
        totalQty: 1,
        lines: [{ label: '16GB / 512GB SSD', qty: 1, unitPrice: 98500 }],
      },
      {
        name: 'Logitech G102 Gaming Mouse',
        imageUrl: null,
        totalQty: 1,
        lines: [{ label: 'Black', qty: 1, unitPrice: 30000 }],
      },
    ],
  },
  {
    id: 'MI-10198',
    date: '2026-06-21',
    productLabel: '1 item',
    total: 35990,
    paid: 35990,
    due: 0,
    status: 'Completed',
    customerName: 'Rafiul Islam',
    phone: '01711223344',
    email: 'rafiul@example.com',
    deliveryAddress: 'House 12, Road 4, Dhanmondi, Dhaka',
    deliveryMethod: 'Home Delivery',
    shippingMethod: 'Express (1-2 days)',
    advancePaid: 35990,
    products: [
      {
        name: 'Midea 1 Ton Non-Inverter Air Conditioner',
        imageUrl: '/images/image/cache/catalog/midea/air-conditioners/giant_220235-228x228.png',
        totalQty: 1,
        lines: [{ label: 'Standard', qty: 1, unitPrice: 35990 }],
      },
    ],
  },
  {
    id: 'MI-10071',
    date: '2026-05-30',
    productLabel: '3 items',
    total: 21400,
    paid: 0,
    due: 21400,
    status: 'Pending',
    customerName: 'Rafiul Islam',
    phone: '01711223344',
    email: 'rafiul@example.com',
    deliveryAddress: 'House 12, Road 4, Dhanmondi, Dhaka',
    deliveryMethod: 'Store Pickup',
    shippingMethod: 'Pickup Point: Gulshan',
    advancePaid: 0,
    products: [
      {
        name: 'Assorted PC components',
        imageUrl: null,
        totalQty: 3,
        lines: [
          { label: 'RAM 16GB DDR4', qty: 1, unitPrice: 7200 },
          { label: 'SSD 512GB NVMe', qty: 1, unitPrice: 6800 },
          { label: 'RGB Case Fan', qty: 1, unitPrice: 7400 },
        ],
      },
    ],
  },
]

export function getOrderRows(): AccountOrderRow[] {
  return accountOrders.map(({ id, date, productLabel, total, paid, due, status }) => ({
    id,
    date,
    productLabel,
    total,
    paid,
    due,
    status,
  }))
}

export function getOrderDetail(orderId: string): AccountOrderDetail | undefined {
  return accountOrders.find((o) => o.id === orderId)
}

export function getStatusStats() {
  const counts = { pending: 0, processing: 0, completed: 0 } as Record<string, number>
  for (const o of accountOrders) {
    const key = o.status.toLowerCase()
    if (key in counts) counts[key] += 1
  }
  const total = accountOrders.length || 1
  return [
    { key: 'pending', label: 'Pending', count: counts.pending, pct: Math.round((counts.pending / total) * 100) },
    {
      key: 'processing',
      label: 'Processing',
      count: counts.processing,
      pct: Math.round((counts.processing / total) * 100),
    },
    {
      key: 'completed',
      label: 'Completed',
      count: counts.completed,
      pct: Math.round((counts.completed / total) * 100),
    },
  ]
}

export const accountPayments: AccountPaymentRow[] = [
  {
    id: 'PAY-88213',
    date: '2026-07-02',
    orderId: 'MI-10245',
    amount: 89950,
    method: 'Bkash',
    status: 'Completed',
    trxId: 'BK7X92LK1P',
    customerName: 'Rafiul Islam',
    customerPhone: '01711223344',
    customerEmail: 'rafiul@example.com',
    paidAt: '2026-07-02 14:20',
  },
  {
    id: 'PAY-87950',
    date: '2026-06-21',
    orderId: 'MI-10198',
    amount: 35990,
    method: 'Nagad',
    status: 'Completed',
    trxId: 'NG5T10QW8Z',
    customerName: 'Rafiul Islam',
    customerPhone: '01711223344',
    customerEmail: 'rafiul@example.com',
    paidAt: '2026-06-21 11:05',
  },
  {
    id: 'PAY-87310',
    date: '2026-05-30',
    orderId: 'MI-10071',
    amount: 0,
    method: 'Bank',
    status: 'Initiated',
  },
]

export const accountQc: AccountQcRow[] = [
  { orderId: 'MI-10245', date: '2026-07-03', status: 'In review', product: 'ASUS TUF Gaming F15' },
  { orderId: 'MI-10198', date: '2026-06-22', status: 'Passed', product: 'Midea 1 Ton AC' },
]

export const accountComplaints: AccountComplainRow[] = [
  { id: 'CMP-2201', date: '2026-06-25', orderId: 'MI-10198', subject: 'Late delivery', status: 'Resolved' },
]

export const accountSupportTickets: AccountSupportRow[] = [
  {
    code: 'SUP-5510',
    date: '2026-07-05',
    orders: 'MI-10245',
    manager: 'Tania Rahman',
    status: 'Open',
    message: 'Need an update on delivery timeline.',
  },
]

export const accountPoints = {
  balance: 1250,
  events: [
    { date: '2026-07-02', type: 'Earned', purpose: 'Order completed', orders: 'MI-10245', paymentId: 'PAY-88213', amount: 450 },
    { date: '2026-06-21', type: 'Earned', purpose: 'Order completed', orders: 'MI-10198', paymentId: 'PAY-87950', amount: 180 },
    { date: '2026-05-10', type: 'Redeemed', purpose: 'Used on payment', orders: 'MI-09880', paymentId: 'PAY-86120', amount: -200 },
  ] as AccountPointsRow[],
}

export const accountDeliveries: AccountDeliveryRow[] = [
  {
    invoice: 'SHP-40021',
    date: '2026-07-03',
    orders: 'MI-10245',
    method: 'Courier (Pathao)',
    amount: 120,
    status: 'In transit',
    trackingNumber: 'PTH88213X',
    trackingUrl: undefined,
  },
  {
    invoice: 'SHP-39810',
    date: '2026-06-22',
    orders: 'MI-10198',
    method: 'Courier (Steadfast)',
    amount: 100,
    status: 'Delivered',
    trackingNumber: 'SFT77102',
    trackingUrl: undefined,
  },
]

export const accountRefunds: AccountRefundRow[] = [
  {
    orders: 'MI-09880',
    date: '2026-05-12',
    amount: 4500,
    method: 'Bkash',
    info: 'Item damaged on arrival',
    status: 'Processed',
  },
]

export const accountManager = {
  name: 'Tania Rahman',
  phone: '01901871752',
  initial: 'TR',
  message: 'Reach out any time for order updates, payments, or delivery help.',
}
