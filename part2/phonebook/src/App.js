import React, { useState, useEffect } from 'react'
import People from './components/People'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import PersonForm from './components/PersonForm'

import personService from './services/Persons'
import loginService from './services/Login'

import {publishPerson, deletePerson} from './handlers/personHandler';

import store from './reducers/store';
import { fetchPStore } from './reducers/personReducer'
import { createErrAction } from './reducers/errorReducer';
import { createNotif } from './reducers/notifReducer';

const App = () => {

    const [ user, setUser ] = useState(null);

    /**
     * Callback Event Handlers to allow using the message components
     */

    const pubPerson = async (nPerson) => {
        const {code, message} = await publishPerson(nPerson);
        
        if(code === 0) { //success
            store.dispatch(fetchPStore());
            store.dispatch(createNotif(message));
        } else if (code === 1) {
            store.dispatch(createErrAction(message));
        } else {
            store.dispatch(createErrAction('Something weird happened'));
        }

    }
    
    const handleDelete = async (id) => {
        const {code, message} = await deletePerson(id);
        
        if(code === 0) { //success
            store.dispatch(fetchPStore());
            store.dispatch(createNotif(message));
        } else if (code === 1) {
            store.dispatch(createErrAction(message));
        } else {
            store.dispatch(createErrAction('Something weird happened'));;
        }
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
            store.dispatch(createNotif(`Logged in as ${user.name}`));
        } catch (ex) {
            store.dispatch(createErrAction('Wrong Credentials'));
        }

        
    } 

    /**
     * Effects
     */
    //initial fetching of persons
    useEffect(() => {
        console.log('Fetching data ... ');
        store.dispatch(fetchPStore());
    }, []) // empty array tells it to only run initially

    //check for logged in user
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedPersonUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            store.dispatch(createNotif(`Logged in as ${user.name}`));
            personService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification/>
            <Error/>
            {user === null ? 
                <LoginForm login={login} />
                : <PersonForm user={user} publishPerson={pubPerson}/>}
            <h2>Numbers</h2>
            <People persons={store.getState().people} deleteHandler={handleDelete} />
        </div>
    )
}

export default App