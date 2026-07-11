import type { Metadata } from 'next'
import PCBuilder from '@/components/pcbuilder/PCBuilder'

export const metadata: Metadata = {
  title: 'PC Builder | Monarch IT',
  description: 'Build your custom PC step by step and get the best price from Monarch IT.',
}

export default function PCBuilderPage() {
  return <PCBuilder />
}
