import SearchResultsPage from '@/components/search/SearchResultsPage'
import { searchProducts } from '@/data/searchIndex'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = (q ?? '').trim()
  const lower = query.toLowerCase()

  const products = lower ? searchProducts.filter((p) => p.name.toLowerCase().includes(lower)) : []

  return <SearchResultsPage query={query} products={products} />
}
