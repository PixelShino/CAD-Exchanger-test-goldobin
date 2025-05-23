"use client"

import { useState, useCallback } from "react"

export function useMultiColorFaces() {
  const [multiColorFaces, setMultiColorFaces] = useState(false)

  const toggleMultiColorFaces = useCallback(() => {
    setMultiColorFaces((prev) => !prev)
  }, [])

  return {
    multiColorFaces,
    toggleMultiColorFaces,
  }
}
