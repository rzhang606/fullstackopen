import React, {useState} from 'react'
import FormField from './FormField'
import Togglable from './Togglable'
import { publishPerson } from '../handlers/personHandler';

const PersonForm = ({user}) => {
    const [ newName, setNewName ] = useState(''); // form input name
    const [ newNumber, setNewNumber ] = useState(''); // form input number

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const createPerson = (event) => {
        event.preventDefault();
        publishPerson({ 
            name: newName,
            number: newNumber
        });

        setNewName('');
        setNewNumber('');

    }
    
    return (
        <Togglable buttonLabel='Create New Note'>
            <h2>Add New as {user.name}:</h2>
            <form onSubmit={createPerson}>
                <FormField title="Name" input={newName} inputHandler={handleNameChange} />
                <FormField title="Number" input={newNumber} inputHandler={handleNumberChange} />
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </Togglable>
    )
}

export default PersonForm