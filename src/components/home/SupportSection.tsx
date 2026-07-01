import Image from 'next/image'

const IMG_BASE = '/images/image/cache/catalog/website/custom'

export default function SupportSection() {
  return (
    <section className="px-5 py-5 min-[992px]:pl-20">
      <div className="text-center mb-10">
        <h2 className="m-0 text-3xl md:text-5xl font-bold leading-none text-[#3b3b3b]">Support</h2>
        <p className="mt-2 text-[15px] md:text-lg text-[#6f6f6f]">Official distributor of trusted brands.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 flex-wrap">
        <div className="flex-1 max-w-[420px] w-full border-2 border-[#e53935] rounded-[25px] md:rounded-[60px] px-6 md:px-[30px] py-5 flex items-center gap-5 bg-white">
          <Image src={`${IMG_BASE}/support-phone-image-60x60.png`} alt="Phone" width={60} height={60} className="w-[60px] h-[60px] object-contain" />
          <div>
            <a href="tel:+8801332812759" className="block no-underline">
              <strong className="block text-lg font-bold text-[#444] leading-[1.4]">+8801332-812759</strong>
            </a>
            <a href="https://wa.me/8801332812764" target="_blank" rel="noopener noreferrer" className="block no-underline">
              <strong className="block text-lg font-bold text-[#444] leading-[1.4]">
                +8801332-812764 <span className="italic font-normal text-[#666]">(WhatsApp)</span>
              </strong>
            </a>
            <p className="m-0 text-[#666]">10:00 AM - 08:00 PM</p>
          </div>
        </div>

        <div className="hidden md:block">
          <Image
            src={`${IMG_BASE}/support-us-image-140x140.png`}
            alt="Support Agent"
            width={140}
            height={140}
            className="w-[110px] md:w-[140px] h-auto block"
          />
        </div>

        <a
          href="/outlets"
          className="flex-1 max-w-[420px] w-full border-2 border-[#e53935] rounded-[25px] md:rounded-[60px] px-6 md:px-[30px] py-5 flex items-center gap-5 bg-white no-underline text-inherit"
        >
          <Image src={`${IMG_BASE}/support-location-60x60.png`} alt="Store Locator" width={60} height={60} className="w-[60px] h-[60px] object-contain" />
          <div>
            <small className="block text-[#777] text-[15px] mb-1">Store Locator</small>
            <strong className="block text-lg font-bold text-[#444] leading-[1.4]">Find our Stores</strong>
          </div>
        </a>
      </div>
    </section>
  )
}
