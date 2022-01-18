function getOrbittingBodyList(data) {
  return data.close_approach_data.map((o) => {
    return o.orbiting_body
  })
}

export function orbitingBodiesList(data) {
  let list = []
  if (data) {
    data.near_earth_objects.forEach((o) => {
      list = [...list, ...getOrbittingBodyList(o)]
    })
    list = new Set(list)
  }
  return list
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
  return nearEarth;
}

export function barChartDataFormat(data) {
  let result = sortByAverage(data)
  result = data.near_earth_objects.map((nearEarthObject) => {
    return [
      nearEarthObject.neo_reference_id,
      nearEarthObject.estimated_diameter.kilometers.estimated_diameter_min,
      nearEarthObject.estimated_diameter.kilometers.estimated_diameter_max,
    ];
  });
  return [
    ['NEO Name', 'Min Estimated Diameter', 'Max Estimated Diameter'],
    ...result,
  ]
}