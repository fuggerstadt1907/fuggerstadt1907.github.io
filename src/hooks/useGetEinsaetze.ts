import { UseQueryOptions, useQuery } from 'react-query'

import { data_2020 } from '../@mocks'
import { ApiEinsatzResponse } from '../@types'
import { BASE_URL } from '../config'
import { objectHasTruthyValuesOnly } from '../utils'

interface GetEinsaetzeParams {
  year: string
  count?: string
  offset?: string
}

interface GetEinsaetzeResponse extends Array<ApiEinsatzResponse> {}

type GetEinsaetze = (params: GetEinsaetzeParams) => Promise<GetEinsaetzeResponse>

const getEinsaetze: GetEinsaetze = async ({ year, count, offset }) => {
  return await new Promise(resolve => resolve(data_2020))
  // const searchParams = year ? new URLSearchParams({ jahr: year }) : undefined
  // const response = await fetch(BASE_URL + '?' + searchParams)
  // return response as any
}

const useGetEinsaetze = ({
  params,
  options,
}: {
  params: GetEinsaetzeParams
  options?: UseQueryOptions<GetEinsaetzeResponse, Error>
}) =>
  useQuery<GetEinsaetzeResponse, Error>(['einsaetze', params], () => getEinsaetze(params), {
    enabled: objectHasTruthyValuesOnly(params),
    ...options,
  })

export default useGetEinsaetze
