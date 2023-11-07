import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useField} from './hooks/index'


const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
  
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${name}`)
        setCountry(response.data)
      } catch (error) {
        console.error('catch', error)
        setCountry(null)
      }
    }
    if (name) {
      fetchCountry()
    }
  }, [name])
  
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.name) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital[0]} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.svg} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App