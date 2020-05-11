import React, { useState, useEffect } from 'react'
import People from './components/People'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import PersonForm from './components/PersonForm'

import personService from './services/Persons'
import loginService from './services/Login'

import {publishPerson, deletePerson} from './handlers/personHandler';

import personStore, { setPStore } from './reducers/personReducer';

const App = () => {
    const [ newFilter, setNewFilter ] = useState(''); // filter

    const [ user, setUser ] = useState(null);

    const [ notif, setNotif ] = useState(null); // notification message
    const [ error, setError ] = useState(null); // error message

    /**
     * Callback Event Handlers to allow using the message components
     */

    const pubPerson = async (nPerson) => {
        const {code, message} = await publishPerson(nPerson);
        
        if(code === 0) { //success
            fetchAll();
            createNotif(message);
        } else if (code === 1) {
            createError(message);
        } else {
            createError('Something weird happened');
        }

    }
    
    const handleDelete = async (id) => {
        const {code, message} = await deletePerson(id);
        
        if(code === 0) { //success
            fetchAll();
            createNotif(message);
        } else if (code === 1) {
            createError(message);
        } else {
            createError('Something weird happened');
        }
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    }

    //uses username and password to login, then saves the retrieved token and user details to 'user' field
    const login = async (creds) => {

        try{
            const user = await loginService.login(creds);

            //save token to local storage
            window.localStorage.setItem(
                'loggedPersonUser', JSON.stringify(user)
            );
            personService.setToken(user.token);
            setUser(user);
        } catch (ex) {
            createError('Wrong credentials');
        }

        
    } 

    /**
     * Effects
     */
    //initial fetching of persons
    useEffect(() => {
        console.log('Fetching data ... ');
        fetchAll();
    }, []) // empty array tells it to only run initially

    //check for logged in user
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedPersonUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            personService.setToken(user.token)
        }
    }, [])

    /**
     * Helpers
     */
    const fetchAll = () => {
        personService
            .getAll()
            .then(numbers => {
                personStore.dispatch(setPStore(numbers));
            });
    }

    const createNotif = (message) => {
        setNotif(message);
        setTimeout(() => {setNotif(null)}, 5000) // 2 seconds
    }

    const createError = (message) => {
        setError(message);
        setTimeout(() => {setError(null)}, 5000);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notif}/>
            <Error message={error} />
            {user === null ? 
                <LoginForm login={login} />
                : <PersonForm user={user} publishPerson={pubPerson}/>}
            <h2>Numbers</h2>
            <People persons={personStore.getState()} filter={newFilter} deleteHandler={handleDelete} />
            <Filter input={newFilter} inputHandler={handleFilterChange}/>
        </div>
    )
}

export default App