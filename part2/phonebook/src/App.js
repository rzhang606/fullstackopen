import React, { useState, useEffect } from 'react'
import FormField from './components/FormField'
import People from './components/People'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Error from './components/Error'

import personService from './services/Persons'
import loginService from './services/Login'

const App = () => {
    const [ persons, setPersons] = useState([]);
    const [ newName, setNewName ] = useState(null); // form input name
    const [ newNumber, setNewNumber ] = useState(null); // form input number
    const [ newFilter, setNewFilter ] = useState(''); // filter

    const [ username, setUsername ] = useState(''); // form input username
    const [ password, setPassword ] = useState('');
    const [ user, setUser ] = useState(null);

    const [ notif, setNotif ] = useState(null); // notification message
    const [ error, setError ] = useState(null); // error message

    /**
     * Event Handlers
     */
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
                        createNotif(`${newName}'s number has been updated`);
                    }).catch(err => {
                        createError(`${newName} could not be updated: ${err.response.data}`)
                    });
                }
            }
        } else {    // add new record
            personService.create(personObj).then(result => {
                setPersons(persons.concat(result));
                resetField();
                createNotif(`${personObj.name} has been added`);
            }).catch(err => {
                console.log(err);
                createError(`${personObj.name} could not be added: ${err.response.data}`);
            });
        }
    }

    const handleDelete = (id) => {
        const delName = (persons.find(element => element.id === id)).name;
        const result = window.confirm(`Delete ${delName}'s record?`);
        if(result) {
            console.log('Delete: ', id, delName);
            personService.remove(id).then(request => {
                refresh();
            });
        }
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value);
        setNewFilter(event.target.value);
    }

    //uses username and password to login, then saves the retrieved token and user details to 'user' field
    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('Logging in for', username, password);
        try{
            const user = await loginService.login({
                username, password,
            })

            personService.setToken(user.token);
            setUser(user);
            resetLogin();
        } catch (ex) {
            createError('Wrong credentials');
        }

        
    } 

    /**
     * Effects
     */
    useEffect(() => {
        console.log('Fetching data ... ');
        personService
            .getAll()
            .then(numbers => {
                setPersons(numbers);
            })
    }, []) // empty array tells it to only run initially

    /**
     * Helpers
     */
    const refresh = () => {
        personService.getAll().then(result => {
            setPersons(result);
        });
    }

    const refreshAll = () => {
        refresh();
        resetField();
        resetLogin();
    }

    //fields must be reset to empty string before null or it will persist text
    const resetField = () => {
        setNewName('');
        setNewName(null);
        setNewNumber('');
        setNewNumber(null);
    }

    const resetLogin = () => {
        setUsername('');
        setPassword('');
    }

    const createNotif = (message) => {
        setNotif(message);
        setTimeout(() => {setNotif(null)}, 5000) // 2 seconds
    }

    const createError = (message) => {
        setError(message);
        setTimeout(() => {setError(null)}, 5000);
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password <input type='text' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type='submit'>Login</button>
        </form>
    )

    const noteForm = () => (
        <div>
            <h2>Add New as {user.name}:</h2>
            <form onSubmit={handleSubmit}>
                <FormField title="Name" input={newName} inputHandler={handleNameChange} />
                <FormField title="Number" input={newNumber} inputHandler={handleNumberChange} />
                <div>
                <button type="submit">add</button>
                </div>
            </form>
            <Filter input={newFilter} inputHandler={handleFilterChange}/>
        </div>
    )

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notif}/>
            <Error message={error} />
            {user === null ? loginForm() : noteForm()}
            <h2>Numbers</h2>
            <People persons={persons} filter={newFilter} deleteHandler={handleDelete} />
        </div>
    )
}

export default App