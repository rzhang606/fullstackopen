import React, { useState } from 'react';
import Filter from './Filter';
import { deletePerson } from '../handlers/personHandler';
import { Table } from 'react-bootstrap'

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
            <Table striped><tbody>
                    {newPersons.map((person) =>
                        <tr key={person.name}>
                            <td>
                                {person.name}
                            </td>
                            <td>
                                {person.number}
                            </td>
                            <td>
                                <button onClick={() => deletePerson(person.id)}>delete</button>
                            </td>
                        </tr>
                    )}
            </tbody></Table>
            <Filter input={filter} inputHandler={handleFilterChange}/>
        </div>
        
    )
}

export default People