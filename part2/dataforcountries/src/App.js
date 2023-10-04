import { useState, useEffect } from 'react';
import API from './services/API'
import WeatherAPI from './services/WeatherAPI';

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    API
      .getAll()
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  const getFilteredItems = () => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    if (!search) {
      return []
    } else if (filteredCountries.length > 10) {
      return ['Too many matches, specify another filter']
    } else {
      return filteredCountries
    }
  }
  const filteredItems = getFilteredItems()

  const handleShow = (name) => {
    setSearch(name)
  }
  return (
    <div className="app">
      <div className='search-div'>
        <p>Find countries</p>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <ul>
        {filteredItems.map(item => {
          if (typeof item === 'string') {
            return <li key={item}>{item}</li>
          } else if (filteredItems.length === 1) {
            const country = item
            const flag = country.flags.svg
            const languageKeys = Object.keys(country.languages)
            return (
              <div className="country-data" key={country.flag}>
                <div className='country-details'>
                  <div className='left-container'>
                  <h1>{country.name.common}</h1>
                  <p>Capital: {country.capital}</p>
                  <p>Area: {country.area}</p>
                  <h2>Languages:</h2>
                  <ul>
                    {languageKeys.map((languageKey, index) => (
                      <li key={index} >{country.languages[languageKey]}</li>
                    ))}
                  </ul>
                </div>
                <div className='right-container'>
                  <img src={flag} alt='Country Flag' className='flag-img' />
                </div>
              </div>  

                <WeatherAPI lat={country.latlng[0]} lon={country.latlng[1]} country={country} />
              </div>
            )
          } else {
            return <li key={item.flag}>{item.name.common} <button onClick={() => handleShow(item.name.common)}>show</button></li>
          }
        })}
      </ul>
    </div>
  );
}

export default App;
