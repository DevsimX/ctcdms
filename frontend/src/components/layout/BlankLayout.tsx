'use client'

import React from 'react'
import Box from '@mui/material/Box'

export default function BlankLayout({ children }: { children: React.ReactNode }) {
  return <Box sx={{ minHeight: '100vh' }}>{children}</Box>
}
