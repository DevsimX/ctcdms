'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface NumberInfoProps {
  title: string
  value?: string | number
  subTitle?: string
}

export default function NumberInfo({ title, value, subTitle }: NumberInfoProps) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">{title}</Typography>
      <Typography variant="h5">{value ?? '—'}</Typography>
      {subTitle && (
        <Typography variant="caption" color="text.secondary">{subTitle}</Typography>
      )}
    </Box>
  )
}
