================================================================
   MONARCHIT - Static HTML to Next.js Conversion Guide
================================================================

DESIGN ANALYSIS - Major Sections in monarchit.html
----------------------------------------------------
1. Fixed Side Menu (desktop: vertical left panel, mobile: bottom nav)
2. Header (logo, search bar, cart button, account dropdown)
3. Mobile Header + Slide-in Drawer Menu
4. Hero Slider (full-width banner with auto-play)
5. Featured Categories Carousel (horizontal scroll)
6. Dual Banner Slider (side-by-side with fire badge)
7. Featured Products (tabs + horizontal carousel)
8. Footer


================================================================
STEP 1: Next.js Project Create
================================================================

npx create-next-app@latest monarchit --typescript --tailwind --app
cd monarchit


================================================================
STEP 2: Folder Structure
================================================================

src/
├── app/
│   ├── layout.tsx              <- Root layout (header, sidebar, footer wrap)
│   ├── page.tsx                <- Homepage
│   └── globals.css             <- Global styles + CSS variables
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          <- Desktop header (logo, search, cart, account)
│   │   ├── SideMenu.tsx        <- Fixed left/bottom nav
│   │   ├── MobileHeader.tsx    <- Mobile top bar
│   │   └── MobileDrawer.tsx    <- Slide-in category drawer
│   │
│   ├── home/
│   │   ├── HeroSlider.tsx      <- Full-width auto banner slider
│   │   ├── CategoryCarousel.tsx<- Horizontal scroll categories
│   │   ├── BannerSlider.tsx    <- Dual banner with fire badge
│   │   └── FeaturedProducts.tsx<- Tabs + product carousel
│   │
│   └── ui/
│       ├── CartDrawer.tsx      <- Slide-in cart panel
│       └── SearchDropdown.tsx  <- Search suggestion dropdown
│
├── data/
│   ├── categories.ts           <- Category list (static data)
│   └── products.ts             <- Product list (static data)
│
└── public/
    └── images/                 <- Downloaded product/banner images


================================================================
STEP 3: CSS Variables - globals.css
================================================================

/* src/app/globals.css */
:root {
  --ac-primary: #ef4a23;
  --ac-primary-dark: #D51E0B;
  --ac-secondary: #3749bb;
  --ac-tertiary: #838383;
  --ac-hf-bg: #081621;
  --ac-b-bg: #f2f4f8;
  --brand-color: #BE1E2D;
  --text-main: #333333;
  --text-muted: #777777;
}

Google Fonts + Material Icons add koro layout.tsx এ:

import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','600','700'] })

/* layout.tsx <head> এ link tag: */
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


================================================================
STEP 4: Root Layout - layout.tsx
================================================================

// src/app/layout.tsx
import Header from '@/components/layout/Header'
import SideMenu from '@/components/layout/SideMenu'
import MobileHeader from '@/components/layout/MobileHeader'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SideMenu />
        <Header />
        <MobileHeader />
        <main className="lg:pl-[80px]">
          {children}
        </main>
      </body>
    </html>
  )
}

Note: lg:pl-[80px] -- desktop-এ content টা sidebar এর ডানে push হবে


================================================================
STEP 5: HeroSlider Component
================================================================

// src/components/home/HeroSlider.tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  { src: '/images/slider1.jpg', href: '/offers', alt: 'Slide 1' },
  { src: '/images/slider2.jpg', href: '/offers', alt: 'Slide 2' },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const changeSlide = (dir: number) => {
    setCurrent(c => (c + dir + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full" style={{ aspectRatio: '1880/1060' }}>
      {slides.map((slide, i) => (
        <a key={i} href={slide.href}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}>
          <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
        </a>
      ))}

      {/* Prev Button */}
      <button
        onClick={() => changeSlide(-1)}
        className="absolute bottom-8 left-10 z-20 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
        <span className="material-symbols-outlined text-red-600">chevron_left</span>
      </button>

      {/* Next Button */}
      <button
        onClick={() => changeSlide(1)}
        className="absolute bottom-8 left-24 z-20 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
        <span className="material-symbols-outlined text-red-600">chevron_right</span>
      </button>
    </div>
  )
}


================================================================
STEP 6: CategoryCarousel Component
================================================================

// src/components/home/CategoryCarousel.tsx
'use client'
import { useRef } from 'react'
import Image from 'next/image'

const categories = [
  { name: 'Television',      img: '/images/cat-tv.png',         href: '/smart-tv' },
  { name: 'Air Conditioner', img: '/images/cat-ac.png',         href: '/air-conditioner' },
  { name: 'Washing Machine', img: '/images/cat-washing.png',    href: '/washing-machine' },
  { name: 'Refrigerator',    img: '/images/cat-fridge.png',     href: '/refrigerator' },
  { name: 'Smart Phone',     img: '/images/cat-phone.png',      href: '/smart-phone' },
  { name: 'Laptop',          img: '/images/cat-laptop.png',     href: '/laptop' },
  { name: 'Monitor',         img: '/images/cat-monitor.png',    href: '/monitor' },
  { name: 'Desktop',         img: '/images/cat-desktop.png',    href: '/desktop' },
  { name: 'Microwave Oven',  img: '/images/cat-oven.png',       href: '/oven' },
  { name: 'Drone',           img: '/images/cat-drone.png',      href: '/drone' },
  { name: 'Camera',          img: '/images/cat-camera.png',     href: '/camera' },
  { name: 'Tablet',          img: '/images/cat-tablet.png',     href: '/tablets' },
]

export default function CategoryCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (amount: number) => {
    carouselRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="bg-[#f5f5f7] py-5">
      <div className="container mx-auto">
        <div className="relative flex items-center">
          {/* Left Button */}
          <button onClick={() => scroll(-300)}
            className="absolute left-[-10px] z-10 bg-white border border-gray-200 rounded-full px-3 py-1">
            <i className="fa-solid fa-angle-left text-red-600"></i>
          </button>

          {/* Scrollable Carousel */}
          <div ref={carouselRef}
            className="flex overflow-x-auto gap-4 scroll-smooth [scrollbar-width:none] w-full">
            {categories.map(cat => (
              <a key={cat.name} href={cat.href}
                className="flex-none w-[290px] flex flex-col items-center p-5 rounded-2xl border border-gray-100 bg-white no-underline">
                <Image src={cat.img} alt={cat.name} width={200} height={160} className="object-contain" />
                <span className="text-xl font-semibold text-[#4d4d4d] mt-2">{cat.name}</span>
              </a>
            ))}
          </div>

          {/* Right Button */}
          <button onClick={() => scroll(300)}
            className="absolute right-[-10px] z-10 bg-white border border-gray-200 rounded-full px-3 py-1">
            <i className="fa-solid fa-angle-right text-red-600"></i>
          </button>
        </div>
      </div>
    </div>
  )
}


================================================================
STEP 7: SideMenu Component
================================================================

// src/components/layout/SideMenu.tsx
'use client'

const menuItems = [
  { icon: '/images/phone-icon.svg',   href: '#',          label: 'Phone' },
  { icon: '/images/message-icon.svg', href: '#',          label: 'Message' },
  { icon: '/images/compare-icon.svg', href: '#',          label: 'Compare', badge: true },
  { icon: '/images/gift-icon.svg',    href: '#',          label: 'Gift' },
  { icon: '/images/fire-icon.svg',    href: '#',          label: 'Hot Deals' },
  { icon: '/images/pc-icon.svg',      href: '/pc-builder',label: 'PC Builder', active: true },
]

export default function SideMenu() {
  return (
    <div className="
      fixed left-0 top-0 z-[9999] w-[80px] h-screen pointer-events-none
      max-md:top-auto max-md:bottom-0 max-md:w-full max-md:h-auto
    ">
      <div className="
        flex flex-col items-center gap-6 py-4 px-0 pointer-events-auto
        bg-[rgba(247,248,249,0.95)] rounded-b-[40px] border border-t-0 border-gray-200
        ml-[14px] shadow-sm
        max-md:flex-row max-md:justify-around max-md:rounded-none max-md:border-t max-md:border-0 max-md:ml-0
      ">
        {/* Logo */}
        <a href="/">
          <img src="/images/monarch-it-icon.png" alt="Monarch IT" className="h-11 w-auto object-contain" />
        </a>

        {/* Menu Items */}
        {menuItems.map(item => (
          <a key={item.label} href={item.href} className="relative group">
            <div className={`
              w-[45px] h-[45px] rounded-full flex items-center justify-center shadow-sm
              transition-all duration-200
              ${item.active ? 'bg-[#d92128]' : 'bg-white group-hover:bg-[#d92128]'}
            `}>
              <img src={item.icon} alt={item.label}
                className={`w-[22px] h-[22px] object-contain transition-all
                  ${item.active ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'}
                `}
              />
            </div>
            {item.badge && (
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-[#d92128] rounded-full border-2 border-white"></span>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}


================================================================
STEP 8: Header Component
================================================================

// src/components/layout/Header.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false)

  return (
    <header className="bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-10 py-3.5">

          {/* Logo */}
          <a href="/">
            <Image src="/images/monarch-it-logo.png" alt="Monarch IT" width={180} height={44} />
          </a>

          {/* Search + SHOP */}
          <div className="flex-1 flex items-center justify-center px-8 gap-0">
            <div className="relative max-w-[400px] w-full">
              <div className="flex items-center bg-[#f4f5f7] rounded-[30px] px-5 py-2.5">
                <button className="text-gray-500 mr-2.5 hover:text-red-600">
                  <span className="material-symbols-outlined text-[22px]">search</span>
                </button>
                <input
                  type="text"
                  placeholder="Search Products"
                  className="border-none bg-transparent outline-none flex-1 text-[15px] text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-1 font-semibold text-[15px] text-gray-800 cursor-pointer ml-5 hover:text-red-600">
              <span>SHOP</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* PC Builder */}
            <button
              onClick={() => window.location.href = '/pc-builder'}
              className="border-2 border-red-600 text-red-600 bg-white px-5 py-2 rounded-[30px] font-bold text-[13px] hover:bg-red-600 hover:text-white transition-all">
              PC Builder
            </button>

            {/* Cart */}
            <button className="relative w-11 h-11 bg-[#f4f5f7] rounded-full flex items-center justify-center hover:bg-gray-200">
              <Image src="/images/cart-icon.svg" alt="Cart" width={22} height={22} />
              <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center border-2 border-white">
                0
              </span>
            </button>

            {/* Account Dropdown */}
            <div className="relative"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}>
              <button className="w-11 h-11 bg-[#f4f5f7] rounded-full flex items-center justify-center hover:bg-gray-200">
                <Image src="/images/account-icon.svg" alt="Account" width={22} height={22} />
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full mt-0 bg-white border border-gray-200 rounded-xl shadow-lg min-w-[175px] z-[1200] py-1.5">
                  <a href="/login" className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-gray-800 hover:bg-gray-50 hover:text-red-600">
                    <span className="material-symbols-outlined text-[17px] text-gray-400">lock</span>
                    Login
                  </a>
                  <a href="/register" className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-gray-800 hover:bg-gray-50 hover:text-red-600">
                    <span className="material-symbols-outlined text-[17px] text-gray-400">person_add</span>
                    Register
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}


================================================================
STEP 9: Homepage - page.tsx
================================================================

// src/app/page.tsx
import HeroSlider from '@/components/home/HeroSlider'
import CategoryCarousel from '@/components/home/CategoryCarousel'
import BannerSlider from '@/components/home/BannerSlider'
import FeaturedProducts from '@/components/home/FeaturedProducts'

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <CategoryCarousel />
      <BannerSlider />
      <FeaturedProducts />
    </main>
  )
}


================================================================
STEP 10: jQuery → React Conversion Table
================================================================

| jQuery Pattern              | React/Next.js Pattern              |
|-----------------------------|------------------------------------|
| $(document).ready()         | useEffect(() => {}, [])            |
| $('#el').addClass('x')      | useState + className conditional   |
| $('#el').toggleClass('x')   | setState(prev => !prev)            |
| $.ajax({ url, success })    | fetch(url).then() / async-await    |
| $('el').on('click', fn)     | onClick={fn} prop                  |
| setInterval auto-play       | useEffect + setInterval + cleanup  |
| $(el).scrollBy()            | useRef + ref.current.scrollBy()    |
| $('el').fadeIn/Out()        | Tailwind transition + opacity state|
| $(el).css('display','none') | conditional render / hidden class  |


================================================================
STEP 11: External Images - next.config.js
================================================================

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'monarchit.devteam.againtheme.com',
      },
    ],
  },
}

module.exports = nextConfig

এরপর HTML এর image URL গুলো সরাসরি Next.js <Image> component এ use করা যাবে।


================================================================
STEP 12: Package Install (Optional)
================================================================

# Swiper (carousel এর জন্য, manually করার চেয়ে সহজ)
npm install swiper

# Axios (API call এর জন্য)
npm install axios

# Font Awesome (icon এর জন্য)
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons


================================================================
RECOMMENDED BUILD ORDER
================================================================

1.  globals.css          -> CSS variables, fonts setup
2.  SideMenu.tsx         -> সহজ, static component
3.  Header.tsx           -> Logo, Search, Cart, Account
4.  MobileHeader.tsx     -> Mobile top bar
5.  MobileDrawer.tsx     -> Category slide-in drawer
6.  HeroSlider.tsx       -> useState + useEffect practice
7.  CategoryCarousel.tsx -> useRef scroll
8.  BannerSlider.tsx     -> Dual banner with state
9.  FeaturedProducts.tsx -> Tabs + product cards
10. CartDrawer.tsx       -> Side panel
11. Footer.tsx           -> Static links section
12. page.tsx             -> সব একসাথে assemble


================================================================
IMPORTANT NOTES
================================================================

- 'use client' directive লিখতে হবে সব interactive component এর উপরে
  (useState, useEffect, onClick ব্যবহার করলে)

- Server Components (no interactivity) এ 'use client' লাগবে না
  (SEO এর জন্য ভালো)

- HTML এর inline <style> tag গুলো Tailwind classes বা globals.css এ নিয়ে যাও

- HTML এর <script> tag এর jQuery code গুলো React hooks দিয়ে replace করো

- Images: /public/images/ ফোল্ডারে রাখলে src="/images/file.png" দিয়ে access করা যায়

================================================================
