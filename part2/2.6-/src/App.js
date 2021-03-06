import React, { useState, useEffect } from 'react'
import FilterBlock from './components/FilterBlock'
import AddBlock from './components/AddBlock'
import NumberBlock from './components/NumberBlock'
import Notification from './components/NotificationBlock'
import phonebookService from './services/phonebookService'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filteredPersons, setFilteredPersons ] = useState(persons)
  const [ notification, setNotification ] = useState({'msg': '', 'type': ''})

  const setPersonsAndFilteredPersons = (data) => {
    setPersons(data)
    setFilteredPersons(data)
  }

  const removePerson = id => {
    setPersons(persons.filter(p => p.id !== id))
    setFilteredPersons(persons.filter(p => p.id !== id))
  }

  const showNotification = (msg, type) => {
    setNotification({'msg': msg, 'type': type})
    setTimeout(() => {
      setNotification({'msg': '', 'type': ''})
    }, 3000)
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

      <Notification notification={notification}/>

      <FilterBlock persons={persons} setFilteredPersons={setFilteredPersons} />

      <AddBlock persons={persons} setPersonsAndFilteredPersons={setPersonsAndFilteredPersons} showNotification={showNotification}/>

      <NumberBlock filteredPersons={filteredPersons} removePerson={removePerson} showNotification={showNotification}/>
    </div>
  )
}

export default App