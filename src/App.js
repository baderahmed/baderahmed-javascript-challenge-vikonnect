import './App.css'

import useNearEarth from './lib/useNearEarth.js'
import Loader from './components/Loader.js'
import NearEarthChart from './components/NearEarthChart'

function App() {
  const {data, error, loading} = useNearEarth()
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
      chartArea: { width: "50%" },
      hAxis: {
        title: "Estimated Diameter (km)",
        minValue: 0,
      },
      vAxis: {
        title: "NEO Name",
      },
    };
    if (!!data) {
      const nearEarthChartData = [['NEO Name', 'Min Estimated Diameter', 'Max Estimated Diameter'], ...data]
      return <NearEarthChart data={nearEarthChartData} options={options} />
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
