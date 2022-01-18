import './App.css'

import useNearEarth from './lib/useNearEarth.js'
import Loader from './components/Loader.js'
import NearEarthChart from './components/NearEarthChart'

import { orbitingBodiesList, barChartDataFormat } from './formatData'

function App() {
  let orbitingBodies;
  const {data, error, loading} = useNearEarth()
  if (data) {
    orbitingBodies = orbitingBodiesList(data);
    console.log("orbitingBodies", orbitingBodies)
  }
  console.log({
    data,
    error,
    loading: !data && !error
  })
  const getLoader = () => {
    if (loading) {
      return <Loader />
    }
    return null;
  }
  
  const getError = () => {
    if (!!error) {
      return <error>{error}</error>
    }
    return null
  }

  const getNearEarthChart = () => {
    const options = {
      title: "",
      chartArea: { width: "100%" },
      hAxis: {
        title: "Estimated Diameter (km)",
        minValue: 0,
      },
      vAxis: {
        title: "NEO Name",
      },
    };
    if (!!data) {
      const nearEarthChartData = barChartDataFormat(data)
      return <section>
        <section>
          <NearEarthChart data={nearEarthChartData} options={options} />
        </section>
      </section>
    }
    return null
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Vikonnect Javascript Challenge
        </p>
      </header>
      <main className="App-main">
        {getLoader()}
        {getError()}
        {getNearEarthChart()}
      </main>
    </div>
  );
}

export default App;
