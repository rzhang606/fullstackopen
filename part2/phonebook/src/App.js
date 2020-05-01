import React, { useState } from 'react'
import FormField from './components/FormField'
import People from './components/People'
import Filter from './components/Filter'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [ newName, setNewName ] = useState(''); //form input name
    const [ newNumber, setNewNumber ] = useState(''); // form input number
    const [ newFilter, setNewFilter ] = useState('') // filter

    //event handlers
    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //check if newName exists already
        const personObj = {
            name: newName,
            number: newNumber
        };
        if(persons.filter(person => person.name === newName).length !== 0) {
            window.alert(`${newName} is already added to phonebook.`)
        } else {
            setPersons(persons.concat(personObj));
            setNewName('');
            setNewNumber('');
        }
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value);
        setNewFilter(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter input={newFilter} inputHandler={handleFilterChange}/>
            <h2>Add New:</h2>
            <form onSubmit={handleSubmit}>
                <FormField title="Name" input={newName} inputHandler={handleNameChange} />
                <FormField title="Number" input={newNumber} inputHandler={handleNumberChange} />
                <div>
                <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <People persons={persons} filter={newFilter} />
        </div>
    )
}

export default App