import { BASE_URL } from '../config'

interface RequestData {
  method?: 'GET'
  searchParams?: any
}

export const request = async ({ method = 'GET', searchParams }: RequestData) => {
  const fetchData: RequestInit = {
    method,
  }
  const url = new URL(BASE_URL)
  if (searchParams) {
    url.search = new URLSearchParams(searchParams).toString()
  }
  const response = await fetch(url.toString(), fetchData)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return await response.json()
}
