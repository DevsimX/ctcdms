'use client'

import React from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

export default function Hero() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: 2,
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography component="h1" variant="h3" fontWeight={700} gutterBottom sx={{ letterSpacing: '-0.02em' }}>
          Clinical Test Center Data Management System
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.95, mb: 4, maxWidth: 560, mx: 'auto' }}>
          Cut the admin load. Stay compliant. Focus on what matters.
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
          Manage EQA (indoor & outdoor), hospital scores, project CV, and mutual recognition — all in one place.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            href="/welcome"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' },
              px: 3,
              py: 1.5,
            }}
          >
            Get started
          </Button>
          <Button
            component={Link}
            href="/user/login"
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
              px: 3,
              py: 1.5,
            }}
          >
            Log in
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
