'use client'

import React from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

export default function CTASection() {
  return (
    <Box
      sx={{
        py: 8,
        px: 2,
        bgcolor: 'primary.main',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Ready to get started?
        </Typography>
        <Typography sx={{ opacity: 0.9, mb: 3 }}>
          Log in or open the dashboard to manage your clinical test center data.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            href="/welcome"
            variant="contained"
            size="large"
            sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' }, px: 3 }}
          >
            Open dashboard
          </Button>
          <Button
            component={Link}
            href="/user/login"
            variant="outlined"
            size="large"
            sx={{ borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }, px: 3 }}
          >
            Log in
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
