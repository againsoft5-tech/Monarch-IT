export type Coupon = {
  code: string
  type: 'percent' | 'flat'
  value: number
}

export const COUPONS: Coupon[] = [
  { code: 'SAVE10', type: 'percent', value: 10 },
  { code: 'SAVE500', type: 'flat', value: 500 },
  { code: 'WELCOME5', type: 'percent', value: 5 },
]
