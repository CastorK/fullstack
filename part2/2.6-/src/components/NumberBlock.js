import React from 'react'
import phonebookService from '../services/phonebookService'

const NumberBlock = ({filteredPersons, removePerson, showNotification}) => {
  const deleteUser = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      phonebookService
        .deletePerson(person.id)
        .then( response => {
          removePerson(person.id) 
          showNotification(`Successfully removed ${person.name}`, 'success')
        })
        .catch(showNotification(`Removing ${person.name} failed`, 'fail'))

    }
  }

  return (
    <div>
      <h3>Numerot</h3>
      <ul>
        {filteredPersons.map( person => <li key={person.id}>{person.name} {person.number} <button onClick={ () => deleteUser(person) }>Delete</button></li> )}
      </ul>
    </div>
  )
}
export default NumberBlock