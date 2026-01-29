'use client'

import React, { useRef, useEffect } from 'react'
import Box from '@mui/material/Box'

export default function MapPlaceholder() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return
    import('leaflet').then((L) => {
      const map = L.map(ref.current!).setView([-25.2744, 133.7751], 4)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map)
      return () => { map.remove() }
    })
  }, [])

  return <Box ref={ref} sx={{ width: '100%', height: '100%', minHeight: 280 }} />
}
