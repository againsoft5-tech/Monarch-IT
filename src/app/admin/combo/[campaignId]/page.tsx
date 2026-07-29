import ComboCampaignEditor from '@/components/admin/combo/ComboCampaignEditor'

export default async function AdminComboEditorPage({ params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await params
  return <ComboCampaignEditor campaignId={campaignId} />
}
