import type { Metadata } from 'next'
import './globals.css'
import MiniAppReady from '@/components/MiniAppReady'

const APP_URL = 'https://colorclickergame.vercel.app'

export const metadata: Metadata = {
  title: 'Color Clicker Game',
  description: 'Казуальная игра для Based.one с лидербордом и минтингом NFT',
  other: {
    'base:app_id': '69863c638dcaa0daf5755ff1',
    'fc:miniapp': JSON.stringify({
      version: 'next',
      imageUrl: `${APP_URL}/icon.svg`,
      button: {
        title: 'Play Now',
        action: {
          type: 'launch_miniapp',
          name: 'Color Clicker Game',
          url: APP_URL,
          splashImageUrl: `${APP_URL}/icon.svg`,
          splashBackgroundColor: '#667eea',
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="base:app_id" content="69863c638dcaa0daf5755ff1" />
      </head>
      <body>
        <MiniAppReady />
        {children}
      </body>
    </html>
  )
}
