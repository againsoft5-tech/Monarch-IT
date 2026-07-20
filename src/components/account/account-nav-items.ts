export type AccountNavItem = {
  href: string
  label: string
  icon: string
  key: string
}

export const ACCOUNT_NAV: AccountNavItem[] = [
  { key: 'dashboard', href: '/account', label: 'Dashboard', icon: 'dashboard' },
  { key: 'orders', href: '/account/orders', label: 'Orders', icon: 'shopping_bag' },
  { key: 'payments', href: '/account/payments', label: 'Payments', icon: 'payments' },
  { key: 'qc', href: '/account/qc', label: 'QC', icon: 'fact_check' },
  { key: 'complain', href: '/account/complain', label: 'Complain', icon: 'report' },
  { key: 'support', href: '/account/support', label: 'Support', icon: 'support_agent' },
  { key: 'points', href: '/account/points', label: 'Points', icon: 'stars' },
  { key: 'delivery', href: '/account/delivery', label: 'Delivery', icon: 'local_shipping' },
  { key: 'refunds', href: '/account/refunds', label: 'Refunds', icon: 'currency_exchange' },
]

/** Profile lives in the header strip (not the section pill/nav row). */
export const ACCOUNT_PROFILE_HREF = '/account/profile'

export function isAccountNavActive(pathname: string, href: string) {
  if (href === '/account') return pathname === '/account'
  return pathname === href || pathname.startsWith(`${href}/`)
}
