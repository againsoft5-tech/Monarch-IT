import Breadcrumbs from '@/components/category/Breadcrumbs'
import ComboGallery from '@/components/combo/ComboGallery'

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Combo', href: '/combo' },
]

export default function ComboLandingPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <ComboGallery />
    </>
  )
}
