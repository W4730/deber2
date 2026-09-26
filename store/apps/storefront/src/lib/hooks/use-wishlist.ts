"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "lunara-wishlist"

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setIds(JSON.parse(raw))
      }
    } catch {
      setIds([])
    }
  }, [])

  const persist = (next: string[]) => {
    setIds(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const has = useCallback((id: string) => ids.includes(id), [ids])

  const toggle = useCallback(
    (id: string) => {
      persist(ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id])
    },
    [ids]
  )

  return { ids, has, toggle, count: ids.length }
}
