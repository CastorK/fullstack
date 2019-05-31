import React from 'react'

const NumberBlock = ({filteredPersons}) => {
  return (
    <div>
      <h3>Numerot</h3>
      <ul>
        {filteredPersons.map( person => <li key={person.id}>{person.name} {person.number}</li> )}
      </ul>
    </div>
  )
}
export default NumberBlock