import React, {useState} from 'react'

const FilterBlock = ({persons, setFilteredPersons}) => {
    const [ filterStr, setFilterStr] = useState('')
    const handleFilterChange = (event) => {
        const newFilterStr = event.target.value.toLowerCase()
        setFilterStr(newFilterStr)
        setFilteredPersons(persons.filter( p => p.name.toLowerCase().includes(newFilterStr)))
    }

    return (
        <div>
            <h3>Rajaa näytettäviä</h3>
            <input value={filterStr} onChange={handleFilterChange} />
        </div>
    )
}

export default FilterBlock