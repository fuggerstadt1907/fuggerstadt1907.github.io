import { useState } from 'react'

import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { QueryClientProvider } from 'react-query'

import { testData } from './@mocks'
import { EinsatzTable, FilterSelections } from './components'
import { queryClient } from './config'
import { mapKeyword } from './utils'

const AppRoot = () => {
  const [keyword, selectedKeyword] = useState('alle')
  const [year, selectYear] = useState(dayjs(testData[0].date, 'YYYY-MM-DD').year().toString())

  return (
    <Box>
      <Typography variant="h4" component="div" sx={{ my: 2, mx: 2, color: '#D0121A', fontWeight: 'bold' }}>
        Übersicht Einsätze
      </Typography>
      <FilterSelections keyword={keyword} year={year} onChangeKeyboard={selectedKeyword} onChangeYear={selectYear} />
      <EinsatzTable keywordFilter={mapKeyword(keyword)} />
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
