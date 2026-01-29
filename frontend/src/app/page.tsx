'use client'

import LandingHeader from '@/components/home/LandingHeader'
import Hero from '@/components/home/Hero'
import FeatureSection from '@/components/home/FeatureSection'
import AllInOneSection from '@/components/home/AllInOneSection'
import CTASection from '@/components/home/CTASection'
import Box from '@mui/material/Box'

export default function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <LandingHeader />
      <main>
        <Hero />
        <FeatureSection />
        <AllInOneSection />
        <CTASection />
      </main>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          textAlign: 'center',
          color: 'text.secondary',
          typography: 'body2',
        }}
      >
        Clinical Test Center Data Management System — EQA, scores, project CV, mutual recognition.
      </Box>
    </Box>
  )
}
