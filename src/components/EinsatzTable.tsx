import { useEffect, useState } from 'react'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'

import { EinsatzRow } from '.'
import { ApiEinsatzResponse } from '../@types'
import { useGetEinsaetze } from '../hooks'

type Props = {
  keywordFilter: string
  yearFilter: string
}

const EinsatzTable: React.FC<Props> = ({ keywordFilter, yearFilter }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [rows, setRows] = useState<Array<ApiEinsatzResponse> | undefined>(undefined)

  const { data: einsaetze, isLoading } = useGetEinsaetze({
    params: { count: rowsPerPage.toString(), jahr: yearFilter },
    options: {
      onSuccess: data => {
        keywordFilter === 'alle' ? setRows(data) : setRows(data.filter(e => e.typ === keywordFilter))
      },
    },
  })

  useEffect(() => {
    if (!isLoading && einsaetze) {
      keywordFilter === 'alle' ? setRows(einsaetze) : setRows(einsaetze.filter(e => e.typ === keywordFilter))
    }
  }, [keywordFilter])

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead sx={{ backgroundColor: '#D0121A' }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Nr.</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Datum</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Stichwort</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Beschreibung</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Fahrzeuge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return <EinsatzRow key={row.ID} row={row} />
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 15, 25, 50, 100]}
        component="div"
        count={rows?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => `${from} - ${to} von ${count}`}
        labelRowsPerPage={'Zeilen pro Seite'}
      />
    </Paper>
  )
}

export default EinsatzTable
