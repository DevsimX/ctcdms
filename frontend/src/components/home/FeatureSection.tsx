'use client'

import React from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import BusinessOutlined from '@mui/icons-material/BusinessOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import MapOutlined from '@mui/icons-material/MapOutlined'
import AssessmentOutlined from '@mui/icons-material/AssessmentOutlined'

const features = [
  {
    title: 'Dashboard',
    description: 'Get an instant overview of EQA and project metrics. Build dashboards in real time.',
    icon: <DashboardOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
    href: '/welcome',
  },
  {
    title: 'Institution & scores',
    description: 'Hospital search, examine/indoor/outdoor scores, sigma bands, and mutual recognition.',
    icon: <BusinessOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
    href: '/institution',
  },
  {
    title: 'Search & project detail',
    description: 'Hospital and item search, indoor CV timeline, outdoor data, sigma, and offset curves.',
    icon: <SearchOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
    href: '/search',
  },
  {
    title: 'Area & region',
    description: 'State and territory view. Sydney, South East Queensland, and regional aggregates.',
    icon: <MapOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
    href: '/areaInstitution',
  },
  {
    title: 'Analytics & reports',
    description: 'Project CV, monthly stats, item detail, and reporting hospitals per month.',
    icon: <AssessmentOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
    href: '/projectDetail',
  },
]

export default function FeatureSection() {
  return (
    <Box sx={{ py: 8, px: 2, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          Customize instantly for your workflow
        </Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ mb: 4, maxWidth: 640, mx: 'auto' }}>
          From dashboard to institution and area view — every tool fits your quality and EQA process.
        </Typography>
        <Grid container spacing={3}>
          {features.map((f) => (
            <Grid item xs={12} sm={6} md={4} key={f.href}>
              <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
                <CardActionArea component={Link} href={f.href} sx={{ height: '100%', p: 2 }}>
                  <CardContent>
                    <Box sx={{ mb: 1 }}>{f.icon}</Box>
                    <Typography variant="h6" gutterBottom>
                      {f.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {f.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
