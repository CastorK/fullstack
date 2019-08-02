import React, {useState} from 'react'
import phonebookService from '../services/phonebookService'

const AddBlock = (props) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    
    const handleChange = (newPersons, added) => {
        props.setPersonsAndFilteredPersons(newPersons)
        props.showNotification( added ? `Added ${newName}` : `Updated ${newName}`)
        setNewName('')
        setNewNumber('')
    }

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            'name': newName,
            'number': newNumber
        }
        if (props.persons.some(person => person.name === newPerson.name)) {
            const confirmMsg = `${newPerson.name} is already added to phonebook. Do you want to replace the old number with ${newPerson.number}?`
            if (window.confirm(confirmMsg)) {
                const existingPerson = props.persons.find(p => p.name === newPerson.name)
                phonebookService
                    .updatePerson({...existingPerson, name:newPerson.name, number:newPerson.number })
                    .then( data => handleChange(props.persons.map( p => p.id !== data.id ? p : data, false)) )
            }
        } else {
            phonebookService
                .addPerson(newPerson)
                .then( response => {
                    const newPersons = props.persons.concat(response)
                    handleChange(newPersons, true) 
                })
        }
    }

    return (
        <div>
            <h3>Lisää uusi</h3>
            <form onSubmit={addPerson}>
                <div>
                    nimi: <input onChange={handleNameChange} value={newName} /><br/>
                    numero: <input onChange={handleNumberChange} value={newNumber} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    )
}

export default AddBlock