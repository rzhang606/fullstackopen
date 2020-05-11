import React, { useState } from 'react'
import Filter from './Filter';

const People = ({persons, deleteHandler}) => {
    const [ filter, setNewFilter ] = useState(''); // filter

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    }

    let displayed = persons;
    if(filter !== "") {
        displayed = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())); 
    }
    return (
        <div>
            {displayed.map((person) =>
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