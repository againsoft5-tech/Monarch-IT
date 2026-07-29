import ComboBuilderPage from '@/components/combo/ComboBuilderPage'

export default async function ComboCampaignPage({ params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await params
  return <ComboBuilderPage campaignId={campaignId} />
}
