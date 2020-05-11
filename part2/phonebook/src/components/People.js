import React, { useState } from 'react'
import Filter from './Filter'

const People = ({persons = [], deleteHandler}) => {
    const [ filter, setNewFilter ] = useState(''); // filter
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    }

    let newPersons = persons;
    if(filter !== "") {
        newPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())); 
    }
    return (
        <div>
            {newPersons.map((person) =>
                <p key={person.name}>
                    {person.name} {person.number}
                    <button onClick={() => deleteHandler(person.id)}>delete</button>
                </p>
            )}
            <Filter input={filter} inputHandler={handleFilterChange}/>
        </div>
    )
}

export default People