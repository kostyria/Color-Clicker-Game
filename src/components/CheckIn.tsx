'use client'

import { useState, useEffect } from 'react'
import './CheckIn.css'

const STORAGE_KEY = 'color-clicker-checkins'

function getTodayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function loadCheckIns(userKey: string): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const all = JSON.parse(raw) as Record<string, string[]>
    return all[userKey] ?? []
  } catch {
    return []
  }
}

function saveCheckIns(userKey: string, dates: string[]) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const all: Record<string, string[]> = raw ? JSON.parse(raw) : {}
    all[userKey] = dates
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch (e) {
    console.error('Check-in save error:', e)
  }
}

function calcStreak(dates: string[]): number {
  if (dates.length === 0) return 0
  const set = new Set(dates)
  const today = getTodayKey()
  if (!set.has(today)) return 0
  let streak = 0
  let check = today
  while (set.has(check)) {
    streak++
    const d = new Date(check + 'T12:00:00')
    d.setDate(d.getDate() - 1)
    check = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }
  return streak
}

interface CheckInProps {
  walletAddress: string | null
}

export default function CheckIn({ walletAddress }: CheckInProps) {
  const userKey = walletAddress ?? 'anonymous'
  const [dates, setDates] = useState<string[]>([])
  const [checkedToday, setCheckedToday] = useState(false)

  useEffect(() => {
    const list = loadCheckIns(userKey)
    setDates(list)
    setCheckedToday(list.includes(getTodayKey()))
  }, [userKey])

  const handleCheckIn = () => {
    const today = getTodayKey()
    if (dates.includes(today)) return
    const next = [...dates, today]
    saveCheckIns(userKey, next)
    setDates(next)
    setCheckedToday(true)
  }

  const streak = calcStreak(dates)
  const lastDate = dates.length > 0 ? dates.sort().reverse()[0] : null

  return (
    <div className="checkin">
      <h3>Ежедневный чек-ин</h3>
      {checkedToday ? (
        <p className="checkin-done">✅ Сегодня уже отмечен</p>
      ) : (
        <button type="button" className="checkin-button" onClick={handleCheckIn}>
          Отметиться
        </button>
      )}
      <div className="checkin-stats">
        {streak > 0 && <span className="streak">Серия: {streak} дн.</span>}
        {lastDate && <span className="last">Последний: {lastDate}</span>}
      </div>
    </div>
  )
}
