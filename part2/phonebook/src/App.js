import React, { useState, useEffect } from 'react'
import People from './components/People'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import PersonForm from './components/PersonForm'

import personService from './services/Persons'
import loginService from './services/Login'

import store from './reducers/store';
import { fetchPStore } from './reducers/personReducer'
import { createErrAction } from './reducers/errorReducer';
import { createNotif } from './reducers/notifReducer';

const App = () => {

    const [ user, setUser ] = useState(null);

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
    const logOut = () => {
        window.localStorage.removeItem('loggedPersonUser');
        personService.setToken(null);
        setUser(null);
        store.dispatch(createNotif('Logged Out'));
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
                <div>
                    <LoginForm login={login} />
                    <h2>Please log in to view numbers</h2>
                </div>
                :
                <div>
                    <PersonForm user={user}/>
                    <button onClick={logOut}>Log Out</button>
                    <h2>Numbers</h2>
                    <People persons={store.getState().people}/>
                </div>}
        </div>
    )
}

export default App