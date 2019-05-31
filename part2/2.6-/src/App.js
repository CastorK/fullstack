import React, { useState } from 'react'
import FilterBlock from './components/FilterBlock'
import AddBlock from './components/AddBlock'
import NumberBlock from './components/NumberBlock'

const App = () => {
  const [ persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas', number: '045-123456' },
    { id: 1, name: 'Martti Tienari', number: '040-123456' },
    { id: 2, name: 'Arto Järvinen', number: '040-123456' },
    { id: 3, name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <FilterBlock persons={persons} setFilteredPersons={setFilteredPersons} />

      <AddBlock persons={persons} setPersons={setPersons} setFilteredPersons={setFilteredPersons}/>

      <NumberBlock filteredPersons={filteredPersons} />
    </div>
  )
}

export default App