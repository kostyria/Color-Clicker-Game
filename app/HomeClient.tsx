'use client'

import { useState } from 'react'
import { useBasedSDK } from '@/hooks/useBasedSDK'
import Game from '@/components/Game'
import Leaderboard from '@/components/Leaderboard'
import NFTMint from '@/components/NFTMint'
import CheckIn from '@/components/CheckIn'

export default function HomeClient() {
  const { connected, loading, walletAddress, mintNFT } = useBasedSDK()
  const [lastScore, setLastScore] = useState<number | null>(null)

  const handleGameOver = (score: number) => {
    setLastScore(score)
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Подключение к Based...</div>
      </div>
    )
  }

  if (!connected) {
    return (
      <div className="app">
        <h1>Color Clicker Game</h1>
        <p className="warning">⚠️ Запустите приложение внутри Based.one для полного функционала</p>
        <p className="info">Игра будет работать в демо-режиме без лидерборда и NFT</p>
        <CheckIn walletAddress={null} />
        <Game onGameOver={handleGameOver} />
      </div>
    )
  }

  return (
    <div className="app">
      <h1>🎮 Color Clicker</h1>
      <p className="status">✅ Подключено к Based</p>
      {walletAddress && (
        <p className="wallet">Кошелек: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
      )}
      
      <CheckIn walletAddress={walletAddress} />
      <Game onGameOver={handleGameOver} />
      
      {lastScore !== null && (
        <>
          <NFTMint
            score={lastScore}
            onMint={mintNFT}
            disabled={!connected}
          />
          <Leaderboard
            currentScore={lastScore}
            walletAddress={walletAddress}
          />
        </>
      )}
    </div>
  )
}
