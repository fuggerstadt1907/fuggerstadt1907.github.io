import { UseQueryOptions, useQuery } from 'react-query'

import { data_2020 } from '../@mocks'
import { ApiEinsatzResponse } from '../@types'
import { request } from '../api'
import { objectHasTruthyValuesOnly } from '../utils'

interface GetEinsaetzeParams {
  jahr: string
  count?: string
}

interface GetEinsaetzeResponse extends Array<ApiEinsatzResponse> {}

type GetEinsaetze = (params: GetEinsaetzeParams) => Promise<GetEinsaetzeResponse>

const getEinsaetze: GetEinsaetze = async ({ jahr, count }) => {
  return await new Promise(resolve => resolve(data_2020))
  // return await request({
  //   searchParams: { jahr, count },
  // })
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
