'use client'

import BasicLayout from '@/components/layout/BasicLayout'
import InstitutionView from '@/app/institution/InstitutionView'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function InstitutionDetailPage() {
  return (
    <BasicLayout>
      <Typography variant="h5" gutterBottom>
        Institution detail
      </Typography>
      <Box sx={{ mt: 2 }}>
        <InstitutionView />
      </Box>
    </BasicLayout>
  )
}
