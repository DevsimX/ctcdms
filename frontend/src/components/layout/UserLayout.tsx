'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          component={Link}
          href="/"
          sx={{ display: 'block', textAlign: 'center', mb: 3, color: 'primary.main', textDecoration: 'none' }}
        >
          CTCDMS
        </Typography>
        {children}
      </Container>
    </Box>
  )
}
