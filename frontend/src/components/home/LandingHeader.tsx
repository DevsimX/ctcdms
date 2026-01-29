'use client'

import React from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

export default function LandingHeader() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            component={Link}
            href="/"
            variant="h6"
            fontWeight={700}
            sx={{ color: 'primary.main', textDecoration: 'none' }}
          >
            CTCDMS
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button component={Link} href="/welcome" color="inherit" sx={{ fontWeight: 600 }}>
              Dashboard
            </Button>
            <Button component={Link} href="/user/login" variant="contained" size="small">
              Log in
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
