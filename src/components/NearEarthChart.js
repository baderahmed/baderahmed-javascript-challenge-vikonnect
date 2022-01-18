import { Chart } from 'react-google-charts'

export default function NearEarthChart({data, options}) {
  console.log("NearEarthChart", data)
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