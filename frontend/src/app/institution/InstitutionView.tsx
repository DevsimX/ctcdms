'use client'

import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { HospitalAutoFillSearchBox } from '@/components/DevComponents/HospitalAutoFillSearchBox'
import { hospitalApi } from '@/lib/api/services'
import type { HospitalScore } from '@/app/institution/types'

export default function InstitutionView() {
  const [hospitalOfficeId, setHospitalOfficeId] = useState<string>('')
  const [score, setScore] = useState<HospitalScore | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!hospitalOfficeId.trim()) return
    setError('')
    setLoading(true)
    try {
      const { data } = await hospitalApi.score(Number(hospitalOfficeId))
      setScore(Array.isArray(data) ? data[0] : data)
    } catch {
      setScore(null)
      setError('Failed to load score')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Hospital search — scores, indoor/outdoor stats, sigma bands, mutual recognition
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap', mb: 3 }}>
        <HospitalAutoFillSearchBox
          value={hospitalOfficeId}
          onChange={setHospitalOfficeId}
          placeholder="Search hospital / office"
          sx={{ minWidth: 280 }}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Load score'}
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
      )}
      {score && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">Total score</Typography>
              <Typography variant="h6">{score.total_score ?? '—'}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">Examine score</Typography>
              <Typography variant="h6">{score.examine_score ?? '—'}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">Indoor score</Typography>
              <Typography variant="h6">{score.indoor_score ?? '—'}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">Outdoor score</Typography>
              <Typography variant="h6">{score.outdoor_score ?? '—'}</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Paper>
  )
}
