'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const IMG_BASE = '/images'

const importantLinksCol1 = [
  { name: 'About Us', href: '#' },
  { name: 'Brands', href: '/brands' },
  { name: 'Blog', href: '#' },
  { name: 'Contact Us', href: '#' },
]

const importantLinksCol2 = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms & Conditions', href: '#' },
  { name: 'Online Delivery', href: '#' },
  { name: 'Refund & Return Policy', href: '#' },
]

const socialLinks = [
  { icon: 'fa-facebook-f', href: '#' },
  { icon: 'fa-instagram', href: '#' },
  { icon: 'fa-whatsapp', href: '#' },
  { icon: 'fa-youtube', href: '#' },
]

const socialLinksMobile = [
  { icon: 'fab fa-facebook-f', href: '#' },
  { icon: 'fab fa-instagram', href: '#' },
  { icon: 'fab fa-whatsapp', href: '#' },
  { icon: 'fab fa-youtube', href: '#' },
  { icon: 'fab fa-tiktok', href: '#' },
  { icon: 'fab fa-linkedin-in', href: '#' },
  { icon: 'fas fa-envelope', href: '#' },
]

function AccordionSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
      >
        <span className="text-lg font-bold uppercase tracking-wide text-white">{title}</span>
        <span
          className={`text-2xl font-light leading-none text-white transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-6">{children}</div>
        </div>
      </div>
      <div className="border-t border-white/15" />
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#1d1d1d] text-white">
      <div className="hidden md:grid container mx-auto py-[70px] grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1.5fr_1fr] gap-10 lg:gap-[60px] text-center md:text-left">
        <div>
          <Image
            src={`${IMG_BASE}/catalog/view/theme/default/image/monarch-it.png`}
            alt="Monarch IT"
            width={180}
            height={50}
            className="max-w-[180px] mb-5 mx-auto md:mx-0"
            style={{ height: 'auto' }}
          />
          <p className="text-[#d0d0d0] leading-[1.7] text-[15px] my-5">
            At Monarch IT, we are committed to create the future by delivering genuine tech products, reliable
            solutions, and unmatched support. Our goal is to inspire growth and success through technology.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {socialLinks.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                className="w-[38px] h-[38px] border border-white/15 rounded-full flex items-center justify-center text-white no-underline transition-all hover:bg-[#e53935] hover:border-[#e53935] hover:-translate-y-[3px]"
              >
                <i className={`fab ${s.icon} text-base`} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[22px] mb-[25px] font-semibold text-white">Important Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px]">
            <ul className="list-none p-0">
              {importantLinksCol1.map((l) => (
                <li key={l.name} className="mb-4">
                  <Link href={l.href} className="text-[#d6d6d6] no-underline transition-all hover:text-[#ff3d3d]">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="list-none p-0">
              {importantLinksCol2.map((l) => (
                <li key={l.name} className="mb-4">
                  <Link href={l.href} className="text-[#d6d6d6] no-underline transition-all hover:text-[#ff3d3d]">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-[22px] mb-[25px] font-semibold text-white">Membership</h3>
          <div className="flex justify-center md:justify-start">
            <Image
              src={`${IMG_BASE}/catalog/view/theme/default/image/partnership-logo.png`}
              alt="Partnership Logo"
              width={160}
              height={60}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <div className="text-[#d7d7d7] leading-[1.8] mt-5">
            <strong className="text-white">Head Office:</strong> Bs Bhaban, 2nd Floor, 75-76, New Elephant Road,
            Dhaka-1205, Bangladesh
          </div>
        </div>
      </div>

      <div className="md:hidden container mx-auto px-5 pt-6">
        <AccordionSection title="Company">
          <Image
            src={`${IMG_BASE}/catalog/view/theme/default/image/monarch-it.png`}
            alt="Monarch IT"
            width={180}
            height={50}
            className="max-w-[160px] mb-4"
            style={{ height: 'auto' }}
          />
          <p className="text-[#d0d0d0] leading-[1.7] text-[15px] m-0">
            At Monarch IT, we are committed to create the future by delivering genuine tech products, reliable
            solutions, and unmatched support. Our goal is to inspire growth and success through technology.
          </p>
        </AccordionSection>

        <AccordionSection title="Important Links">
          <div className="grid grid-cols-2 gap-6">
            <ul className="list-none p-0 m-0">
              {importantLinksCol1.map((l) => (
                <li key={l.name} className="mb-4">
                  <Link href={l.href} className="text-[#d6d6d6] no-underline transition-all hover:text-[#ff3d3d]">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="list-none p-0 m-0">
              {importantLinksCol2.map((l) => (
                <li key={l.name} className="mb-4">
                  <Link href={l.href} className="text-[#d6d6d6] no-underline transition-all hover:text-[#ff3d3d]">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </AccordionSection>

        <AccordionSection title="Membership">
          <Image
            src={`${IMG_BASE}/catalog/view/theme/default/image/partnership-logo.png`}
            alt="Partnership Logo"
            width={160}
            height={60}
            style={{ width: 'auto', height: 'auto' }}
            className="mb-4"
          />
          <div className="text-[#d7d7d7] leading-[1.8]">
            <strong className="text-white">Head Office:</strong> Bs Bhaban, 2nd Floor, 75-76, New Elephant Road,
            Dhaka-1205, Bangladesh
          </div>
        </AccordionSection>

        <div className="flex flex-wrap gap-3 justify-center py-6 border-b border-white/15">
          {socialLinksMobile.map((s, i) => (
            <a
              key={`${s.icon}-${i}`}
              href={s.href}
              className="w-[38px] h-[38px] border border-white/15 rounded-full flex items-center justify-center text-white no-underline transition-all hover:bg-[#e53935] hover:border-[#e53935] hover:-translate-y-[3px]"
            >
              <i className={`${s.icon} text-base`} />
            </a>
          ))}
        </div>
      </div>

      <div className="md:border-t border-white/10 text-center px-5 min-[992px]:px-28 py-[25px] container mx-auto">
        <p className="mb-[15px] text-[#d0d0d0]">
          © 2026, <span className="text-[#ff3d3d]">Monarch IT Ltd</span>, All Rights Reserved.
        </p>
        <div className="hidden md:flex justify-center">
          <Image
            src={`${IMG_BASE}/catalog/view/theme/default/image/payment-partner.png`}
            alt="Payment Methods"
            width={1231}
            height={35}
            className="w-full h-auto"
            style={{ height: 'auto' }}
          />
        </div>
      </div>
    </footer>
  )
}
