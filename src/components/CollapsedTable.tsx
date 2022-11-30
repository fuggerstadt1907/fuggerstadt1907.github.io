import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'

import { ApiEinsatzResponse } from '../@types'
import KdoWThumbnail from '../assets/vehicles/10-1_Thumbnail.png'
import MtwThumbnail from '../assets/vehicles/14-1_Thumbnail.png'
import TlfThumbnail from '../assets/vehicles/21-1_Thumbnail.png'
import Dlkhumbnail from '../assets/vehicles/30-1_Thumbnail.png'
import Hlf1Thumbnail from '../assets/vehicles/40-1_Thumbnail.png'
import Hlf2Thumbnail from '../assets/vehicles/40-2_Thumbnail.png'
import LfKatSThumbnail from '../assets/vehicles/41-1_Thumbnail.png'
import LfKatSAltThumbnail from '../assets/vehicles/48-1_Thumbnail.png'
import LkwThumbnail from '../assets/vehicles/55-1_Thumbnail.png'
import RwThumbnail from '../assets/vehicles/62-1_Thumbnail.png'
import KlafThumbnail from '../assets/vehicles/65-1_Thumbnail.png'
import BootThumbnail from '../assets/vehicles/Boot_Thumbnail.png'
import VsaThumbnail from '../assets/vehicles/VSA_Thumbnail.png'
import { ffKbrVehicles } from '../config'
import Image from './Image'

type Props = {
  row: ApiEinsatzResponse
}

const CollapsedTable: React.FC<Props> = ({ row }) => {
  const isFFKbrVehicle = (vehicle: string) => ffKbrVehicles.includes(vehicle)

  const getVehicleImage = (fzg: string) => {
    switch (fzg) {
      case '10-1':
        return KdoWThumbnail

      case '14-1':
        return MtwThumbnail

      case '21-1':
        return TlfThumbnail

      case '30-1':
        return Dlkhumbnail

      case '40-1':
        return Hlf1Thumbnail

      case '40-2':
        return Hlf2Thumbnail

      case '41-1':
        return LfKatSThumbnail

      case '48-1':
        return LfKatSAltThumbnail

      case '55-1':
        return LkwThumbnail

      case '62-1':
        return RwThumbnail

      case '65-1':
        return KlafThumbnail

      case 'Boot':
        return BootThumbnail

      case 'VSA':
        return VsaThumbnail
    }
  }

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: 180 }}>Alarmstichwort:</TableCell>
            <TableCell>{row.stw}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ width: 180 }}>Einsatzort:</TableCell>
            <TableCell>{row.adr}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ width: 180 }}>Einsatzlage:</TableCell>
            <TableCell>{row.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ width: 180 }}>Eingesetzte Fahrzeuge:</TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', gap: '30px', flexDirection: 'row' }}>
                {row.fzg.split(/[;,+]+/).map(fzg => {
                  return isFFKbrVehicle(fzg.trim()) ? (
                    <Box
                      key={fzg}
                      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      {isFFKbrVehicle(fzg.trim()) ? (
                        <Image visibleByDefault={true} src={getVehicleImage(fzg.trim().replace('/', '-'))} />
                      ) : null}
                      <Typography sx={{ fontSize: 14, my: 1 }}>{fzg.trim()}</Typography>
                    </Box>
                  ) : null
                })}
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ width: 180 }}>Eingesetzte Geräte:</TableCell>
            <TableCell>1 hydr. Rettungssatz, 1 Beleuchtungssatz</TableCell>
          </TableRow>
          {row.fzg.split(/[;,+]+/).some(fzg => !isFFKbrVehicle(fzg.trim())) && (
            <TableRow>
              <TableCell sx={{ width: 180 }}>Weitere Einheiten:</TableCell>
              <TableCell>
                {row.fzg.split(/[;,+]+/).map((fzg, index) => {
                  return !isFFKbrVehicle(fzg.trim())
                    ? index === row.fzg.split(/[;,+]+/).length - 1
                      ? fzg
                      : fzg + ', '
                    : null
                })}
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell sx={{ width: 180, borderBottom: 'none' }}>Anmerkungen:</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>
              Eine verletzte Person befand sich beim Eintreffen der Rettungskräfte noch im Fahrzeug und wurde mittels
              sog. "großer Seitenöffnung" patientenorientiert gerettet. Aufgrund der zunächst unklaren Örtlichkeit und
              des Meldebildes wurden mehrere Feuerwehren alarmiert.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CollapsedTable
