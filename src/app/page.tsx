import HeroSlider from '@/components/home/HeroSlider'
import CategoryCarousel from '@/components/home/CategoryCarousel'
import BannerSlider from '@/components/home/BannerSlider'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import BrandSlider from '@/components/home/BrandSlider'
import DreamPcBanner from '@/components/home/DreamPcBanner'
import AboutBox from '@/components/home/AboutBox'
import SupportSection from '@/components/home/SupportSection'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryCarousel />
      <BannerSlider />
      <FeaturedProducts />
      <DreamPcBanner />
      <BrandSlider />
      <AboutBox />
      <SupportSection />
    </>
  )
}
