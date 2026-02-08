export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://colorclickergame.vercel.app'

  const manifest = {
    accountAssociation: {
      header: '',
      payload: '',
      signature: '',
    },
    miniapp: {
      version: '1',
      name: 'Color Clicker Game',
      homeUrl: `${baseUrl}/`,
      iconUrl: `${baseUrl}/icon.svg`,
      splashImageUrl: `${baseUrl}/icon.svg`,
      splashBackgroundColor: '#667eea',
      webhookUrl: '',
      subtitle: 'Реакция и концентрация',
      description: 'A test of reaction and concentration. Click the right color and don\'t get confused!',
      screenshotUrls: [],
      primaryCategory: 'games',
      tags: ['game', 'miniapp', 'baseapp', 'color', 'clicker'],
      heroImageUrl: `${baseUrl}/icon.svg`,
      tagline: 'Play instantly',
      ogTitle: 'Color Clicker Game',
      ogDescription: 'Казуальная игра: кликай правильный цвет. Лидерборд и NFT.',
      ogImageUrl: `${baseUrl}/icon.svg`,
      noindex: false,
    },
  }

  return Response.json(manifest)
}
