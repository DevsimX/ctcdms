'use client'

import BasicLayout from '@/components/layout/BasicLayout'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export default function AreaInstitutionDetailPage() {
  return (
    <BasicLayout>
      <Typography variant="h5" gutterBottom>
        Area detail
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary">
            Same as Area page; used when linking to area detail.
          </Typography>
        </Paper>
      </Box>
    </BasicLayout>
  )
}
