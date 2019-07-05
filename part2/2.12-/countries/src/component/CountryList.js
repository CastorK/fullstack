import React from 'react'

const CountryList = ({data, setSearchStr}) => {
  return (
    data.map(country => <div key={country.name}>{country.name} <button onClick={setSearchStr} value={country.name}>show</button></div>)
  )
}

export default CountryList