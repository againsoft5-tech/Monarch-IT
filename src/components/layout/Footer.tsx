import Image from 'next/image'
import Link from 'next/link'

const IMG_BASE = '/images'

const importantLinksCol1 = [
  { name: 'About Us', href: '#' },
  { name: 'Brands', href: '#' },
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

export default function Footer() {
  return (
    <footer className="bg-[#1d1d1d] text-white min-[992px]:pl-20">
      <div className="max-w-[1400px] mx-auto px-[30px] py-[70px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1.5fr_1fr] gap-10 lg:gap-[60px] text-center md:text-left">
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

      <div className="border-t border-white/10 text-center px-5 py-[25px] container mx-auto">
        <p className="mb-[15px] text-[#d0d0d0]">
          © 2026, <span className="text-[#ff3d3d]">Monarch IT Ltd</span>, All Rights Reserved.
        </p>
        <div className="flex justify-center">
          <Image
            src={`${IMG_BASE}/catalog/view/theme/default/image/payment.jpg`}
            alt="Payment Methods"
            width={320}
            height={40}
            className="max-w-full h-auto"
            style={{ height: 'auto' }}
          />
        </div>
      </div>
    </footer>
  )
}
