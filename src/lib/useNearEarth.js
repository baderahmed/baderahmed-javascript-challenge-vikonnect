import useSWR from 'swr'

import fetcher from '../components/Fetcher'

function useNearEarth() {
  const { data, error } = useSWR('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY', fetcher)
  return {
    data,
    error,
    loading: !data && !error
  }
}

export default useNearEarth;