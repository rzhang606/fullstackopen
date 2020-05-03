import React from 'react'

const People = ({persons, filter, deleteHandler}) => {
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
        </div>
    )
}

export default People