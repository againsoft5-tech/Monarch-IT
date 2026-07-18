'use client'

import { usePathname } from 'next/navigation'
import SideMenu from './SideMenu'
import Header from './Header'
import MobileHeader from './MobileHeader'
import Footer from './Footer'
import CartDrawer from '@/components/ui/CartDrawer'

export default function StorefrontChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <>
      <SideMenu />
      <div className="flex-1 flex flex-col pb-[76px] md:pb-0 relative">
        <Header />
        <MobileHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <CartDrawer />
    </>
  )
}
