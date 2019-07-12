import React, { useState, useEffect } from 'react'
import FilterBlock from './components/FilterBlock'
import AddBlock from './components/AddBlock'
import NumberBlock from './components/NumberBlock'
import phonebookService from './services/phonebookService'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  const setPersonsAndFilteredPersons = (data) => {
    setPersons(data)
    setFilteredPersons(data)
  }

  const removePerson = id => {
    setPersons(persons.filter(p => p.id !== id))
    setFilteredPersons(persons.filter(p => p.id !== id))
  }

  useEffect(() => {
    phonebookService.getAllPersons()
      .then( allPersons => {
        setPersonsAndFilteredPersons(allPersons)
      })
  }, [])

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <FilterBlock persons={persons} setFilteredPersons={setFilteredPersons} />

      <AddBlock persons={persons} setPersons={setPersons} setFilteredPersons={setFilteredPersons}/>

      <NumberBlock filteredPersons={filteredPersons} removePerson={removePerson}/>
    </div>
  )
}

export default App