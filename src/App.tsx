import { useState } from 'react'

import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { QueryClientProvider } from 'react-query'

import { testData, years } from './@mocks'
import { EinsatzTable, FilterSelections } from './components'
import { queryClient } from './config'
import { mapKeyword } from './utils'

const AppRoot = () => {
  const [keyword, selectedKeyword] = useState('alle')
  const [year, selectYear] = useState(years[0])

  return (
    <Box>
      <Typography variant="h4" component="div" sx={{ my: 2, mx: 2, color: '#D0121A', fontWeight: 'bold' }}>
        Übersicht Einsätze
      </Typography>
      <FilterSelections keyword={keyword} year={year} onChangeKeyboard={selectedKeyword} onChangeYear={selectYear} />
      <EinsatzTable yearFilter={year} keywordFilter={mapKeyword(keyword)} />
    </Box>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoot />
    </QueryClientProvider>
  )
}

export default App
