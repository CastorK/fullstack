import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({data}) => {
  const [weather, setWeather] = useState({})
  const [condition, setCondition] = useState({})
  useEffect(() => {
    axios
    .get(`https://api.apixu.com/v1/current.json?key=3e06cb13d14743c98ca112120193105&q=${data.capital}`)
    .then(response => {
      setWeather(response.data.current)
      setCondition(response.data.current.condition)
    })
  }, [data])
  return(
    <div>
      <h1>{data.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>Capital</td>
            <td>{data.capital}</td>
          </tr>
          <tr>
            <td>Population</td>
            <td>{data.population}</td>
          </tr>
          <tr>
            <td>Languages</td>
            <td>
              <ul>{data.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul>
            </td>
          </tr>
        </tbody>
      </table>
      <img src={data.flag} width="20%" alt="{data.name}"></img>
      <h2>Weather in {data.capital}</h2>
      <b>Temperature: </b>{weather.temp_c} Celsius<br/>
      <img src={condition.icon} alt="{condition.text}" /> <br/>
      <b>Wind: </b>{weather.wind_kph} kph {weather.wind_dir} <br/>
    </div>
  )
}

export default Country