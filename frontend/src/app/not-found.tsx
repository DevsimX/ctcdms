import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h4">404</Typography>
      <Typography color="text.secondary">Page not found</Typography>
      <Button component={Link} href="/welcome" variant="contained">
        Go to Dashboard
      </Button>
    </Box>
  )
}
