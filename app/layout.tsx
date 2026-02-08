import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Color Clicker Game',
  description: 'Казуальная игра для Based.one с лидербордом и минтингом NFT',
  other: {
    'base:app_id': '69863c638dcaa0daf5755ff1',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
