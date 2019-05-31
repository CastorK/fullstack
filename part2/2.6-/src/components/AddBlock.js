import React, {useState} from 'react'

const AddBlock = (props) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            id: props.persons.length,
            'name': newName,
            'number': newNumber
        }
        if (props.persons.some(person => person.name === newPerson.name)) {
            alert(`${newPerson.name} on jo luettelossa`)
        } else {
            const newPersons = props.persons.concat(newPerson)
            props.setPersons(newPersons)
            props.setFilteredPersons(newPersons)
            setNewName('')
            setNewNumber('')
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