'use client'

import BasicLayout from '@/components/layout/BasicLayout'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import { HospitalAutoFillSearchBox } from '@/components/DevComponents/HospitalAutoFillSearchBox'
import { hospitalApi, itemApi, outdoorApi } from '@/lib/api/services'

export default function SearchPage() {
  const [hospitalId, setHospitalId] = useState('')
  const [itemSearch, setItemSearch] = useState('')
  const [results, setResults] = useState<{ hospital?: unknown; item?: unknown; outdoor?: unknown }>({})

  const handleSearch = async () => {
    setResults({})
    try {
      if (hospitalId) {
        const res = await hospitalApi.score(Number(hospitalId))
        setResults((r) => ({ ...r, hospital: res.data }))
      }
      if (itemSearch) {
        const res = await itemApi.list({ search: itemSearch })
        setResults((r) => ({ ...r, item: res.data }))
      }
      if (hospitalId && itemSearch) {
        const res = await outdoorApi.data({ hospital_id: Number(hospitalId) })
        setResults((r) => ({ ...r, outdoor: res.data }))
      }
    } catch {
      // ignore
    }
  }

  return (
    <BasicLayout>
      <Typography variant="h5" gutterBottom>
        Search
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Hospital + item search, indoor CV timeline, outdoor data, sigma, offset curve.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <HospitalAutoFillSearchBox
              value={hospitalId}
              onChange={setHospitalId}
              placeholder="Hospital"
            />
            <TextField
              label="Item search"
              value={itemSearch}
              onChange={(e) => setItemSearch(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>
          {(results.hospital != null || results.item != null || results.outdoor != null) ? (
            <Grid container spacing={2}>
              {results.hospital != null && (
                <Grid item xs={12} md={4}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Hospital score</Typography>
                    <pre style={{ fontSize: 11, overflow: 'auto', maxHeight: 160 }}>
                      {JSON.stringify(results.hospital, null, 2)}
                    </pre>
                  </Paper>
                </Grid>
              )}
              {results.item != null && (
                <Grid item xs={12} md={4}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Item</Typography>
                    <pre style={{ fontSize: 11, overflow: 'auto', maxHeight: 160 }}>
                      {JSON.stringify(results.item, null, 2)}
                    </pre>
                  </Paper>
                </Grid>
              )}
              {results.outdoor != null && (
                <Grid item xs={12} md={4}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Outdoor data</Typography>
                    <pre style={{ fontSize: 11, overflow: 'auto', maxHeight: 160 }}>
                      {JSON.stringify(results.outdoor, null, 2)}
                    </pre>
                  </Paper>
                </Grid>
              )}
            </Grid>
          ) : null}
        </Paper>
      </Box>
    </BasicLayout>
  )
}
