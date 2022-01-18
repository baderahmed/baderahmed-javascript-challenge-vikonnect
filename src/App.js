import logo from './logo.svg'
import './App.css'

import useNearEarth from './lib/useNearEarth.js'
import Loader from './components/Loader.js'

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

  const getData = () => {
    if (!!data) {
      return <code>{JSON.stringify(data)}</code>
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
        {getData()}
      </main>
    </div>
  );
}

export default App;
