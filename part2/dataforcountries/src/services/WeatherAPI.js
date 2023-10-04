import { useEffect, useState } from "react"
import axios from "axios"


const WeatherAPI = ({ lat, lon, country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
                const newWeather = await response.data
                console.log('temp', response.data)
                console.log('temp', response.data.main.temp)
                console.log('weather', response.data.weather[0].main)
                console.log('weather icon', response.data.weather[0].icon)
                console.log('wind', response.data.wind.speed, 'km/h')
                console.log(newWeather)
                setWeather(newWeather)
            } catch (error) {
                console.error('erro da API weather', error)
            }
        }
        fetchData()
    }, [api_key, lat, lon])

    const getIconUrl = () => {
        if (weather) {
        const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        return iconUrl
    } 
    }
    
    
    
    return (
        <div className="weather-div">
            {weather ? (
                <>
                    <h1>Weather in {country.name.common} </h1>
                    <div>
                        <p>Temp: {weather.main.temp}º Celcius</p>
                        <img src={getIconUrl()}/>
                        <p>Wind: {weather.wind.speed} m/s</p>
                    </div>
                    
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default WeatherAPI