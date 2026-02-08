'use client'

import { useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

/** Вызов ready() скрывает сплэш в Base app (см. docs.base.org mini-apps migrate) */
export default function MiniAppReady() {
  useEffect(() => {
    sdk.actions.ready()
  }, [])
  return null
}
