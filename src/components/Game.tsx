import { useState, useEffect, useCallback } from 'react'
import type { GameState } from '../types/game'
import './Game.css'

interface GameProps {
  onGameOver: (score: number) => void
}

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
const INITIAL_TIME = 3000

export default function Game({ onGameOver }: GameProps) {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    isPlaying: false,
    isGameOver: false,
  })
  const [colors, setColors] = useState<string[]>([])
  const [correctColor, setCorrectColor] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)

  const generateColors = useCallback(() => {
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 4)
    const correct = selected[Math.floor(Math.random() * 4)]
    setColors(selected)
    setCorrectColor(correct)
  }, [])

  const startGame = () => {
    setGameState({
      score: 0,
      level: 1,
      isPlaying: true,
      isGameOver: false,
    })
    generateColors()
    setTimeLeft(INITIAL_TIME)
  }

  const handleColorClick = (color: string) => {
    if (!gameState.isPlaying || gameState.isGameOver) return

    if (color === correctColor) {
      setGameState((prev) => {
        const newScore = prev.score + 1
        const newLevel = Math.floor(newScore / 5) + 1
        const newTime = Math.max(1000, INITIAL_TIME - (newLevel - 1) * 200)
        setTimeLeft(newTime)
        return {
          ...prev,
          score: newScore,
          level: newLevel,
        }
      })
      generateColors()
    } else {
      endGame()
    }
  }

  const endGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      isGameOver: true,
    }))
    onGameOver(gameState.score)
  }, [gameState.score, onGameOver])

  useEffect(() => {
    if (!gameState.isPlaying || gameState.isGameOver) {
      setTimeLeft(INITIAL_TIME)
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 100) {
          endGame()
          return 0
        }
        return prev - 100
      })
    }, 100)

    return () => clearInterval(interval)
  }, [gameState.isPlaying, gameState.isGameOver, endGame])

  if (!gameState.isPlaying && !gameState.isGameOver) {
    return (
      <div className="game-container">
        <h2>Color Clicker</h2>
        <p className="game-description">
          Кликайте на правильный цвет! Скорость увеличивается с каждым уровнем.
        </p>
        <button className="start-button" onClick={startGame}>
          Начать игру
        </button>
      </div>
    )
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="score">Счет: {gameState.score}</div>
        <div className="level">Уровень: {gameState.level}</div>
        <div className="timer" style={{ width: `${(timeLeft / INITIAL_TIME) * 100}%` }}></div>
      </div>

      <div className="color-instruction">
        <p>Кликните на цвет:</p>
        <div
          className="target-color"
          style={{ backgroundColor: correctColor }}
        ></div>
      </div>

      <div className="color-grid">
        {colors.map((color, index) => (
          <button
            key={index}
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
            disabled={gameState.isGameOver}
          />
        ))}
      </div>

      {gameState.isGameOver && (
        <div className="game-over">
          <h3>Игра окончена!</h3>
          <p>Ваш счет: {gameState.score}</p>
          <button className="start-button" onClick={startGame}>
            Играть снова
          </button>
        </div>
      )}
    </div>
  )
}
