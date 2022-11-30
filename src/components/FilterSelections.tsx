import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import dayjs from 'dayjs'

import { keywords, testData } from '../@mocks'

type Props = {
  keyword: string
  year: string
  onChangeKeyboard: (keyboard: string) => void
  onChangeYear: (year: string) => void
}

export const FilterSelections: React.FC<Props> = ({ keyword, year, onChangeKeyboard, onChangeYear }) => {
  const handleChangeKeyword = (event: SelectChangeEvent) => {
    onChangeKeyboard(event.target.value as string)
  }

  const handleChangeYear = (event: SelectChangeEvent) => {
    onChangeYear(event.target.value as string)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ my: 3, mx: 2, minWidth: 140 }}>
        <FormControl fullWidth>
          <InputLabel id="einsatz-year-select-label">Jahr</InputLabel>
          <Select
            labelId="einsatz-year-select-label"
            id="einsatz-year-select"
            value={year}
            label="Jahr"
            onChange={handleChangeYear}>
            {[...new Set(testData.map(data => dayjs(data.date, 'YYYY-MM-DD').year()))].map(date => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ my: 3, mx: 2, minWidth: 140 }}>
        <FormControl fullWidth>
          <InputLabel id="einsatz-keyword-select-label">Stichwort</InputLabel>
          <Select
            labelId="einsatz-keyword-select1-label"
            id="einsatz-keyword-select1"
            placeholder="alle"
            value={keyword}
            label="Stichwort"
            onChange={handleChangeKeyword}>
            {keywords.map(keyword => (
              <MenuItem key={keyword} value={keyword}>
                {keyword}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default FilterSelections
