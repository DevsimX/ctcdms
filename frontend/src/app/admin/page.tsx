'use client'

import BasicLayout from '@/components/layout/BasicLayout'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export default function AdminPage() {
  return (
    <BasicLayout>
      <Typography variant="h5" gutterBottom>
        Admin
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary">
            Admin placeholder. Restrict to admin-only via Authorized/Secured component.
          </Typography>
        </Paper>
      </Box>
    </BasicLayout>
  )
}
