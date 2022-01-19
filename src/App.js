import { useState, useEffect, memo } from 'react'
import Select from 'react-select';

import useNearEarth from './lib/useNearEarth.js'
import Loader from './components/Loader.js'
import NearEarthChart from './components/NearEarthChart'
import NasaDataTable from './components/NasaDataTable';
import Switch from './components/Switch'

import { orbitingBodiesList, barChartDataFormat, filterByOrbiting } from './formatData'

import './App.css'

function App() {
  const [orbitingBodies, setOrbitingBodies] = useState(null)
  const { data, error, loading } = useNearEarth()
  const [nearEarthData, setNearEarthData] = useState(null)
  const [visibility, setVisibility] = useState(true)
  useEffect(() => {
    if (data) {
      setNearEarthData(barChartDataFormat(data))
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
      setNearEarthData(barChartDataFormat(filterByOrbiting(data, event.value)))
    }
  }

  const onChangeSwitch = (checked) => {
    setVisibility(checked)
  }

  const getSwitch = () => {
    // return null
    return (
      <div className="Switch">
        <Switch onChange={onChangeSwitch} />
      </div>
    )
  }

  const getSelect = () => {
    return (
      <div className="Select">
        {!!orbitingBodies && <Select options={orbitingBodies} onChange={onChangeOrbiting} />}
      </div>
    )
  }

  const getTopContainer = () => {
    return (
      <section className="App-container">
        {getSwitch()}
        {getSelect()}
      </section>
    )
  }

  const getNearEarthChart = () => {
    if (nearEarthData) {
      return (
        <section className="App-chart" style={{
          display: !visibility ? 'block' : 'none',
        }}>
          <NearEarthChart data={nearEarthData} />
        </section >
      )
    }
    return null
  }

  const getNasaDataTable = () => {
    if (nearEarthData) {
      return (
        <section className="App-table" style={{
          display: visibility ? 'block' : 'none',
        }}>
          <NasaDataTable data={nearEarthData.slice(1)} />
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
        {getTopContainer()}
        {getNearEarthChart()}
        {getNasaDataTable()}
      </main>
    </div>
  );
}


export default memo(App);
