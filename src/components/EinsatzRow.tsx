import React from 'react'
import { useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import dayjs from 'dayjs'

import { ApiEinsatzResponse } from '../@types'
import { mapKeywordToColorSchema, mapKeywordToTextColor } from '../utils'
import CollapsedTable from './CollapsedTable'
import Label from './Label'

type Props = {
  row: ApiEinsatzResponse
}

const Row: React.FC<Props> = ({ row }) => {
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ width: '5px' }}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ width: '10px' }} component="th" scope="row">
          {row.nr}
        </TableCell>
        <TableCell sx={{ width: '10px' }}>{dayjs(row.datum, 'DD.MM.YY').format('DD.MM.YYYY')}</TableCell>
        <TableCell>
          <Label color={mapKeywordToTextColor(row.typ)} backgroundColor={mapKeywordToColorSchema(row.typ)}>
            {row.stw}
          </Label>
        </TableCell>

        <TableCell>{row.title}</TableCell>
        <TableCell>
          {row.fzg.split(/[;,+]+/).map(fzg => (
            <Label key={fzg} sx={{ m: 1 }} color="black" backgroundColor="rettungsdienst-sonstige">
              {fzg.trim()}
            </Label>
          ))}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CollapsedTable row={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default Row
