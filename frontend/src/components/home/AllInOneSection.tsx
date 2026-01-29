'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined'

const items = [
  'Indoor EQA and outdoor EQA data in one system',
  'Hospital and office scores (examine, indoor, outdoor)',
  'Project-level and area-level monthly CV',
  'Mutual recognition by hospital and item',
  'State and territory views (NSW, VIC, QLD, etc.)',
  'Search by hospital, item, domain, or sample',
]

export default function AllInOneSection() {
  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          From indoor EQA to outdoor scores — all in one place
        </Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ mb: 4, maxWidth: 560, mx: 'auto' }}>
          Manage quality control data, labs, and reporting without switching tools.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {items.map((text) => (
            <Grid item xs={12} md={6} key={text}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CheckCircleOutlined sx={{ color: 'primary.main', fontSize: 24 }} />
                <Typography>{text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
