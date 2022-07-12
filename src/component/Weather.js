import {FaCloudRain, FaLowVision, FaSmog, FaCloudMeatball, FaWind, FaSun, FaCloudSunRain, FaCloudSun, FaCloudMoonRain, FaPooStorm, FaCloud} from 'react-icons/fa'

function Weather(props) {
    //destructuring props
    const { onSubmit, weather, onChange, city, errMsg } = props

    //rendering weather icon based on weather condition
    const weatherIcon = () => {
        if(weather.weather[0].description === 'clear sky'){
            return (<FaSun />)
        } else if (weather.weather[0].description === '	few clouds') {
            return(<FaCloudSun />)
        } else if (weather.weather[0].description === '	scattered clouds') {
            return (<FaCloud />)
        }else if(weather.weather[0].description === 'broken clouds') {
            return(<FaCloudSunRain />)
        } else if (weather.weather[0].description === '	rain') {
            return (<FaCloudRain />)
        } else if (weather.weather[0].description === 'thunderstorm') {
            return (<FaPooStorm />)
        } else {
            return (<FaCloudMoonRain />)
        }
    }

    //organizing date object
    const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const dateObj = new Date()
    const day = daysArr[dateObj.getDay()]
    const date = dateObj.getDate()
    const month = monthsArr[dateObj.getMonth()]

  return (
    <div className='dim-bg'>
        <div className='container-weather'>
        <form onSubmit={onSubmit}>
            <input type='text' placeholder='Search location' value={city} onChange={onChange}/>
            <input type='submit' />
        </form>
            {errMsg && <p>{errMsg}</p>}
            <h3 className='date'>{`${day}, ${date} ${month}`}</h3>
            <h3 className='location'>{weather.name}</h3>
            <div className='weather-icon'>{weatherIcon()}</div>
            <h4 className='temp'>{Math.round(weather.main.temp - 273.15)}&deg;</h4>
            <p className='max-min-temp'>{Math.round(weather.main.temp_min - 273.15)}&deg; {Math.round(weather.main.temp_max - 273.15)}&deg;</p>
            <h6 className='weather-desc'>{weather.weather[0].description}</h6>
            <hr />
            <div className='other-elements-container'>
                <div className='pressure'>
                    <p className='elem-type'>Pressure</p>
                    <p className='elem-icon'><FaCloudMeatball /></p>
                    <p className='elem-value'>{weather.main.pressure}hPa</p>
                </div>
                <div className='humidity'>
                    <p className='elem-type'>Humidity</p>
                    <p className='elem-icon'><FaSmog /></p>
                    <p className='elem-value'>{weather.main.humidity}%</p>
                </div>
                <div className='wind-speed'>
                    <p className='elem-type'>Wind Speed</p>
                    <p className='elem-icon'><FaWind /></p>
                    <p className='elem-value'>{weather.wind.speed}</p>
                </div>
                <div className='visibilty'>
                    <p className='elem-type'>Visibilty</p>
                    <p className='elem-icon'><FaLowVision /></p>
                    <p className='elem-value'>{weather.visibility}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather