import Weather from './component/Weather'
import {useState, useEffect} from 'react'
import Spinner from './component/Spinner'

function App() {
  const [weather, setWeather ] = useState([])
  const [city, setCity ] = useState('Lagos')
  const [errMsg, setErrMsg] = useState(null)
  const [loading, setLoading] = useState(true)

 const getWeather = () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => {
      if(!response.ok) {
        throw Error(`Something went wrong...`)
      }
      return response.json()
    })
    .then(data => {
      setWeather(data)
      setLoading(false)
      setCity('')
      setErrMsg(null)
    })
    .catch(err => {
      setLoading(false)
      setErrMsg(`Something went wrong ${city.toLocaleUpperCase()} is not a valid location`)
      console.log(err);
    })
 }

  useEffect(() => {
    getWeather()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    getWeather()
  }

  const onChange = (e) => {
    setCity(e.target.value)
  }

  if(loading) {
    return <Spinner />
  }
  return (
    <div className="weather-container">
      {weather.length !== 0 ? (
        (<Weather weather={weather} onSubmit= {onSubmit} onChange={onChange} city={city} errMsg={errMsg}/>)
      ) : (
        null
      )}
    </div>
  );
}

export default App;
