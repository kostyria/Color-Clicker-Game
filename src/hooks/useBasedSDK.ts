import { useState, useEffect } from 'react'
import { MiniAppSDK } from '@basedone/miniapp-sdk'

export const useBasedSDK = () => {
  const [sdk, setSdk] = useState<MiniAppSDK | null>(null)
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    const initSDK = async () => {
      const isInIframe = window.self !== window.top
      
      if (!isInIframe) {
        setLoading(false)
        return
      }

      try {
        const client = new MiniAppSDK({
          appId: 'color-clicker-game',
          name: 'Color Clicker Game',
          debug: true,
        })

        await client.connect()
        setSdk(client)
        setConnected(true)

        // Получаем адрес кошелька если доступно
        try {
          // Пробуем разные возможные методы SDK
          if (typeof (client as any).getWalletAddress === 'function') {
            const address = await (client as any).getWalletAddress()
            if (address) setWalletAddress(address)
          } else if (typeof (client as any).getAccount === 'function') {
            const account = await (client as any).getAccount()
            if (account?.address) setWalletAddress(account.address)
          } else if ((client as any).wallet?.address) {
            setWalletAddress((client as any).wallet.address)
          }
        } catch (e) {
          console.log('Wallet address not available:', e)
        }
      } catch (error) {
        console.error('SDK connection error:', error)
      } finally {
        setLoading(false)
      }
    }

    initSDK()
  }, [])

  const mintNFT = async (score: number) => {
    if (!sdk) throw new Error('SDK not connected')
    
    try {
      // Используем SDK для отправки транзакции минтинга
      // Если метод недоступен, используем альтернативный подход
      const metadata = {
        name: `Color Clicker Score #${Date.now()}`,
        description: `Achievement NFT for score: ${score}`,
        image: `data:image/svg+xml;base64,${btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
            <rect width="400" height="400" fill="#6366f1"/>
            <text x="200" y="180" font-size="48" fill="white" text-anchor="middle" font-family="Arial">Score</text>
            <text x="200" y="240" font-size="72" fill="white" text-anchor="middle" font-family="Arial" font-weight="bold">${score}</text>
          </svg>
        `)}`,
        attributes: [
          { trait_type: 'Score', value: score },
          { trait_type: 'Game', value: 'Color Clicker' }
        ]
      }

      // Попытка использовать метод SDK для транзакций
      if (typeof (sdk as any).sendTransaction === 'function') {
        return await (sdk as any).sendTransaction({
          to: '0x0000000000000000000000000000000000000000', // Замените на адрес контракта NFT
          data: '0x', // Данные для минтинга
        })
      }

      // Альтернатива: возвращаем метаданные для минтинга через внешний сервис
      return { metadata, success: true }
    } catch (error) {
      throw error
    }
  }

  return { sdk, connected, loading, walletAddress, mintNFT }
}
