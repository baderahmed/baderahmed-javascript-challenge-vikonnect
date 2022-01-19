const removeDuplicates = (array, key) => {
  return array.reduce((arr, item) => {
    const removed = arr.filter(i => i[key] !== item[key]);
    return [...removed, item];
  }, []);
};

function getOrbittingBodyList(data) {
  return data.close_approach_data.map((o) => {
    return { value: o.orbiting_body, label: o.orbiting_body }
  })
}

export function orbitingBodiesList(data) {
  let list = []
  if (data) {
    data.near_earth_objects.forEach((o) => {
      list = [...list, ...getOrbittingBodyList(o)]
    })
    list = removeDuplicates(list, 'value')
  }
  return list
}

function sortByAverage(data) {
  if (data?.near_earth_objects) {
    let sortedData = [...data.near_earth_objects];
    sortedData.sort((o1, o2) => {
      const { estimated_diameter_max: max1, estimated_diameter_min: min1 } = o1.estimated_diameter.kilometers;
      const { estimated_diameter_max: max2, estimated_diameter_min: min2 } = o2.estimated_diameter.kilometers;
      return ((max2 + min2) / 2 - (max1 + min1) / 2)
    })
    let nearEarth = {
      ...data,
      near_earth_objects: sortedData
    }
    return nearEarth;
  }
  return []
}

export function barChartDataFormat(data) {
  let result = sortByAverage(data)
  if (result?.near_earth_objects) {
    result = result.near_earth_objects.map((nearEarthObject) => {
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
  return null
}

export function filterByOrbiting(data, orbiting) {
  let nearEarthObjects = data.near_earth_objects
  nearEarthObjects = data.near_earth_objects.filter((nearEarthObject) => {
    const closeApproachData = nearEarthObject.close_approach_data
    let i = 0
    let k = false
    while (i < closeApproachData.length && k === false) {
      if (orbiting === closeApproachData[i].orbiting_body) {
        k = true
      }
      i++
    }
    if (k === true) {
      return true
    }
    return false
  })
  return {...data, near_earth_objects: nearEarthObjects}
}