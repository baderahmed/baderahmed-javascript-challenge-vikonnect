import { useMemo } from 'react'
import { Chart } from 'react-google-charts'

function NearEarthChart({ data }) {

  return useMemo(() => {
    const options = {
      title: "",
      chartArea: { width: "50%" },
      hAxis: {
        title: "Estimated Diameter (km)",
        minValue: 0,
      },
      vAxis: {
        title: "NEO Name",
      },
    };
    if (data) {
      return (
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      );
    }
    return null
  }, [data])
}

export default NearEarthChart