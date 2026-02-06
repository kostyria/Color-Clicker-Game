import { useState, useEffect } from 'react'
import type { LeaderboardEntry } from '../types/game'
import './Leaderboard.css'

interface LeaderboardProps {
  currentScore: number | null
  walletAddress: string | null
}

export default function Leaderboard({ currentScore, walletAddress }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    loadLeaderboard()
  }, [])

  useEffect(() => {
    if (currentScore !== null && walletAddress) {
      addScore(walletAddress, currentScore)
    }
  }, [currentScore, walletAddress])

  const loadLeaderboard = () => {
    const stored = localStorage.getItem('color-clicker-leaderboard')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as LeaderboardEntry[]
        setEntries(parsed.sort((a, b) => b.score - a.score).slice(0, 10))
      } catch (e) {
        console.error('Failed to load leaderboard:', e)
      }
    }
  }

  const addScore = (address: string, score: number) => {
    const stored = localStorage.getItem('color-clicker-leaderboard')
    let leaderboard: LeaderboardEntry[] = stored ? JSON.parse(stored) : []

    const newEntry: LeaderboardEntry = {
      address: address || 'Anonymous',
      score,
      timestamp: Date.now(),
    }

    leaderboard.push(newEntry)
    leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10)
    
    localStorage.setItem('color-clicker-leaderboard', JSON.stringify(leaderboard))
    setEntries(leaderboard)
  }

  const formatAddress = (address: string) => {
    if (address === 'Anonymous') return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="leaderboard">
      <h3>Лидерборд</h3>
      {entries.length === 0 ? (
        <p className="empty-leaderboard">Пока нет записей</p>
      ) : (
        <div className="leaderboard-list">
          {entries.map((entry, index) => (
            <div key={index} className="leaderboard-entry">
              <span className="rank">#{index + 1}</span>
              <span className="address">{formatAddress(entry.address)}</span>
              <span className="score">{entry.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
