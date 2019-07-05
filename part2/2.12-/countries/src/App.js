import React, {useState} from 'react';
import axios from 'axios'
import Country from './component/Country'
import CountryList from './component/CountryList'

const App = () => {
  const [ searchStr, setSearchStr ] = useState('')
  const [ searchResult, setSearchResult] = useState(<div></div>)

  const handleSearchChange = (event) => {
    const newSearchStr = event.target.value
    setSearchStr(newSearchStr)
    if (newSearchStr.length !== 0) {
      axios
      .get('https://restcountries.eu/rest/v2/name/' + newSearchStr)
      .then(response => {
        if (response.data.length === 1) {
          setSearchResult([<Country key="{response.data[0].name}" data={response.data[0]} />])
        } else if (response.data.length > 1) {
          if (response.data.length > 10) {
            setSearchResult(<div>Too many matches, specify another filter</div>)
          } else {
            const countryListKey = `country-list-${newSearchStr}`
            setSearchResult(<CountryList key={countryListKey} data={response.data} setSearchStr={handleSearchChange}/>)
          }
        } else {
          console.log(response)
        }
      })
    }
  }
  return (
    <div>
      <h1>FIND COUNTRIES</h1>
      <input onChange={handleSearchChange} value={searchStr} />
      <div>
        {searchResult}
      </div>
    </div>
  )
}

export default App;
