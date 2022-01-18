import useSWR from 'swr'

import fetcher from '../components/Fetcher'
//import data from '../data'

function barChartDataFormat(data) {
  return data.near_earth_objects.map((nearEarthObject) => {
    return ([
      nearEarthObject.neo_reference_id,
      nearEarthObject.estimated_diameter.kilometers.estimated_diameter_min,
      nearEarthObject.estimated_diameter.kilometers.estimated_diameter_max,
    ]);
  });
}

function sortByAverage(data) {
  let sortedData = [...data.near_earth_objects];
  sortedData.sort((o1,o2) => {
    const {estimated_diameter_max: max1, estimated_diameter_min: min1} = o1.estimated_diameter.kilometers;
    const {estimated_diameter_max: max2, estimated_diameter_min: min2} = o2.estimated_diameter.kilometers;
    return ((max2 + min2)/2 - (max1 + min1)/2)
  })
  let nearEarth = {
    ...data,
    near_earth_objects: sortedData
  }
  console.log("sortByAverage", nearEarth)
  return nearEarth;
}

function useNearEarth() {
  const { data, error } = useSWR('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY', fetcher)
  console.log("data", data)
  if (data) console.log("sortByAverage", sortByAverage(data))
  return {
    data: data ? barChartDataFormat(sortByAverage(data)) : null,
    error,
    loading: !data && !error
  }
}

export default useNearEarth;