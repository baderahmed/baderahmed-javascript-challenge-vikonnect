import { useState, useEffect, memo } from 'react'
import Select from 'react-select';

import './App.css'

import useNearEarth from './lib/useNearEarth.js'
import Loader from './components/Loader.js'
import NearEarthChart from './components/NearEarthChart'

import { orbitingBodiesList, barChartDataFormat, filterByOrbiting } from './formatData'

function App() {
  const [orbitingBodies, setOrbitingBodies] = useState(null)
  const { data, error, loading } = useNearEarth()
  const [nearEarthData, setNearEarthData] = useState(null)
  useEffect(() => {
    if (data) {
      setNearEarthData(data)
      setOrbitingBodies(orbitingBodiesList(data))
    }
  }, [data])
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

  const onChangeOrbiting = (event) => {
    if (data) {
      setNearEarthData(filterByOrbiting(data, event.value))
    }
  }

  const getNearEarthChart = () => {
    if (nearEarthData) {
      const nearEarthChartData = barChartDataFormat(nearEarthData)
      return (
        <section className="App-chart">
          <div>
            {!!orbitingBodies && <Select options={orbitingBodies} onChange={onChangeOrbiting} />}
          </div>
          <NearEarthChart data={nearEarthChartData} />
        </section >
      )
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

export default memo(App);
