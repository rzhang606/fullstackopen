import React, { useState } from 'react';
import Filter from './Filter';
import { deletePerson } from '../handlers/personHandler';

const People = ({persons = []}) => {
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
                    <button onClick={() => deletePerson(person.id)}>delete</button>
                </p>
            )}
            <Filter input={filter} inputHandler={handleFilterChange}/>
        </div>
    )
}

export default People