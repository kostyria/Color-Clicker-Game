import { useState } from 'react'
import './NFTMint.css'

interface NFTMintProps {
  score: number
  onMint: (score: number) => Promise<any>
  disabled?: boolean
}

export default function NFTMint({ score, onMint, disabled }: NFTMintProps) {
  const [minting, setMinting] = useState(false)
  const [minted, setMinted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleMint = async () => {
    if (disabled || minting || minted) return

    setMinting(true)
    setError(null)

    try {
      await onMint(score)
      setMinted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка минтинга')
    } finally {
      setMinting(false)
    }
  }

  if (minted) {
    return (
      <div className="nft-mint success">
        <p>✅ NFT успешно заминтин!</p>
        <p className="mint-info">Ваш счет {score} сохранен в NFT</p>
      </div>
    )
  }

  return (
    <div className="nft-mint">
      <h4>Заминтить результат как NFT</h4>
      <p className="mint-description">
        Сохраните свой результат {score} в виде NFT на блокчейне Base
      </p>
      <button
        className="mint-button"
        onClick={handleMint}
        disabled={disabled || minting}
      >
        {minting ? 'Минтинг...' : 'Заминтить NFT'}
      </button>
      {error && <p className="mint-error">{error}</p>}
    </div>
  )
}
