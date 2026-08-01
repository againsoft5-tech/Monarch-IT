import HeroSlider from '@/components/home/HeroSlider'
import CategoryCarousel from '@/components/home/CategoryCarousel'
import PromoBanner from '@/components/home/PromoBanner'
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
      <PromoBanner />
      <FeaturedProducts />
      <DreamPcBanner />
      <BrandSlider />
      <AboutBox />
      <SupportSection />
    </>
  )
}
