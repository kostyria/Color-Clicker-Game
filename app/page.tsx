import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  other: {
    'base:app_id': '69863c638dcaa0daf5755ff1',
  },
}

export default function Home() {
  return <HomeClient />
}
