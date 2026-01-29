'use client'

import BasicLayout from '@/components/layout/BasicLayout'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import { itemApi, projectCvApi } from '@/lib/api/services'

export default function ProjectDetailPage() {
  const [itemSearch, setItemSearch] = useState('')
  const [itemResult, setItemResult] = useState<unknown>(null)
  const [cvResult, setCvResult] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  const handleSearchItem = async () => {
    if (!itemSearch.trim()) return
    setLoading(true)
    try {
      const { data } = await itemApi.list({ search: itemSearch })
      setItemResult(Array.isArray(data?.results) ? data.results[0] : data)
      const cvRes = await projectCvApi.list({})
      setCvResult(cvRes.data)
    } catch {
      setItemResult(null)
      setCvResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BasicLayout>
      <Typography variant="h5" gutterBottom>
        Project detail
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Search item, CV/sigma charts, outdoor stats, mutual recognition.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Search item (domain, initial, name)"
              value={itemSearch}
              onChange={(e) => setItemSearch(e.target.value)}
              size="small"
              sx={{ minWidth: 280 }}
            />
            <Button variant="contained" onClick={handleSearchItem} disabled={loading}>
              Search
            </Button>
          </Box>
          {(itemResult != null || cvResult != null) ? (
            <Grid container spacing={2}>
              {itemResult != null && (
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Item</Typography>
                    <pre style={{ fontSize: 12, overflow: 'auto' }}>
                      {JSON.stringify(itemResult, null, 2)}
                    </pre>
                  </Paper>
                </Grid>
              )}
              {cvResult != null && (
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Project CV (sample)</Typography>
                    <pre style={{ fontSize: 12, overflow: 'auto', maxHeight: 200 }}>
                      {JSON.stringify(cvResult, null, 2)}
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
