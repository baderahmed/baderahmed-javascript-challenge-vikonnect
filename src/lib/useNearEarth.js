import { useMemo } from 'react'
import useSWR from 'swr'

import fetcher from '../components/Fetcher'
import data from '../data'

export default function useNearEarth() {
  const error = null
  //const { data, error } = useSWR('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY', fetcher)
  return useMemo(() => {
    return {
      data,
      error,
      loading: !data && !error
    }
  }, [data, error])
}
