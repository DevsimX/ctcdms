'use client'

import BasicLayout from '@/components/layout/BasicLayout'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const AREAS = [
  'Sydney',
  'South East Queensland',
  'Other states and territories',
  'NSW',
  'VIC',
  'QLD',
  'WA',
  'SA',
  'TAS',
  'ACT',
  'NT',
]

export default function AreaInstitutionPage() {
  return (
    <BasicLayout>
      <Typography variant="h5" gutterBottom>
        Area
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Area-based institution view: area selector, same kind of stats as Institution.
          </Typography>
          <FormControl sx={{ minWidth: 280 }}>
            <InputLabel>Area</InputLabel>
            <Select label="Area" defaultValue="">
              <MenuItem value="">Select area</MenuItem>
              {AREAS.map((a) => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Box>
    </BasicLayout>
  )
}
