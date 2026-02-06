export interface LeaderboardEntry {
  address: string
  score: number
  timestamp: number
}

export interface GameState {
  score: number
  level: number
  isPlaying: boolean
  isGameOver: boolean
}
