import React, { useState, useEffect } from 'react'
import FormField from './components/FormField'
import People from './components/People'
import Filter from './components/Filter'
import personService from './services/Persons'

const App = () => {
    const [ persons, setPersons] = useState([]);
    const [ newName, setNewName ] = useState(''); // form input name
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
        const duplicate = persons.filter(person => person.name === newName);
        if(duplicate.length !== 0) { //if record exists
            if(duplicate[0].number === newNumber) { //duplicate
                window.alert(`${newName} is already added to phonebook.`);
            } else { //update number
                const confirmation = window.confirm(`Update ${newName}'s number with ${newNumber}?`);
                if(confirmation) {
                    console.log('Updating new number');
                    personService.update(duplicate[0].id, personObj).then( result => {
                        refreshAll();
                    })
                }
            }
        } else {    // add new record
            personService
                .create(personObj)
                .then(result => {
                    setPersons(persons.concat(result));
                    setNewName('');
                    setNewNumber('');
                });
        }
    }

    const handleDelete = (id) => {
        const result = window.confirm(`Delete ${persons[id-1].name}'s record?`);
        if(result) {
            console.log('Delete: ', id);
            personService.remove(id).then(request => {
                refresh();
            });
        }
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value);
        setNewFilter(event.target.value);
    }

    //effects
    useEffect(() => {
        console.log('Fetching data ... ');
        personService
            .getAll()
            .then(numbers => {
                setPersons(numbers);
            })
    }, []) // empty array tells it to only run initially

    //helpers
    const refresh = () => {
        personService.getAll().then(result => {
            setPersons(result);
        });
    }

    const refreshAll = () => {
        refresh();
        setNewName('');
        setNewNumber('');
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
            <People persons={persons} filter={newFilter} deleteHandler={handleDelete} />
        </div>
    )
}

export default App