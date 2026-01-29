'use client'

import BasicLayout from '@/components/layout/BasicLayout'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export default function AdminSubPage() {
  return (
    <BasicLayout>
      <Typography variant="h5" gutterBottom>
        Sub-page
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary">
            Same as Welcome (Dashboard) content for admin sub-page.
          </Typography>
        </Paper>
      </Box>
    </BasicLayout>
  )
}
