import React from 'react'

const People = ({persons, filter}) => {
    let newPersons = persons;
    if(filter !== "") {
        newPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())); 
    }
    return (
        <div>
            {newPersons.map((person) =>
                <p key={person.name}>{person.name} {person.number}</p>
            )}
        </div>
    )
}

export default People