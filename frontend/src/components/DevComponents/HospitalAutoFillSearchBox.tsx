'use client'

import React, { useState, useCallback } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import type { SxProps, Theme } from '@mui/material/styles'
import { hospitalApi } from '@/lib/api/services'

interface HospitalOption {
  hospital_office_id: number
  hospital_id?: number
  office_id?: number
  area_fullname?: string
}

interface HospitalAutoFillSearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  sx?: SxProps<Theme>
}

export function HospitalAutoFillSearchBox({
  value,
  onChange,
  placeholder = 'Search hospital / office',
  sx,
}: HospitalAutoFillSearchBoxProps) {
  const [options, setOptions] = useState<HospitalOption[]>([])
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  const fetchOptions = useCallback(async (search: string) => {
    if (!search.trim()) {
      setOptions([])
      return
    }
    setLoading(true)
    try {
      const { data } = await hospitalApi.list({ search })
      const results = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : []
      setOptions(results.slice(0, 25))
    } catch {
      setOptions([])
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(opt) =>
        typeof opt === 'string'
          ? opt
          : String(opt.hospital_office_id) + (opt.area_fullname ? ` — ${opt.area_fullname}` : '')
      }
      value={value || null}
      inputValue={inputValue}
      onInputChange={(_, v) => {
        setInputValue(v)
        if (v) fetchOptions(v)
        else setOptions([])
      }}
      onChange={(_, v) => {
        const id = typeof v === 'object' && v && 'hospital_office_id' in v
          ? String((v as HospitalOption).hospital_office_id)
          : typeof v === 'string'
            ? v
            : ''
        onChange(id)
        setInputValue(id)
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          size="small"
          sx={sx}
        />
      )}
      sx={{ minWidth: 280 }}
    />
  )
}
