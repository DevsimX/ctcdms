'use client'

import BasicLayout from '@/components/layout/BasicLayout'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { HospitalAutoFillSearchBox } from '@/components/DevComponents/HospitalAutoFillSearchBox'
import { useState } from 'react'

export default function DevComponentsPage() {
  const [value, setValue] = useState('')

  return (
    <BasicLayout>
      <Typography variant="h5" gutterBottom>
        Dev components
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            HospitalAutoFillSearchBox
          </Typography>
          <HospitalAutoFillSearchBox
            value={value}
            onChange={setValue}
            placeholder="Search hospital / office"
          />
          {value && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Selected: {value}
            </Typography>
          )}
        </Paper>
      </Box>
    </BasicLayout>
  )
}
