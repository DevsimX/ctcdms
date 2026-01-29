'use client'

import BasicLayout from '@/components/layout/BasicLayout'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export default function WelcomePage() {
  return (
    <BasicLayout>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary">
            Dashboard overview. You can embed a DataV or custom dashboard iframe here (e.g. https://datav.aliyuncs.com/share/...).
          </Typography>
        </Paper>
      </Box>
    </BasicLayout>
  )
}
