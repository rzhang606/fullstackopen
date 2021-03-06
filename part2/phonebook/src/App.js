import React, { useState, useEffect } from 'react'
import People from './components/People'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import PersonForm from './components/PersonForm'

import personService from './services/Persons'
import loginService from './services/Login'

import personStore, { setPersons } from './reducers/personReducer';

const App = () => {
    const [ user, setUser ] = useState(null);

    const [ notif, setNotif ] = useState(null); // notification message
    const [ error, setError ] = useState(null); // error message

    /**
     * Event Handlers
     */

    const publishPerson = (nPerson) => {

        const persons = personStore.getState();
        
        const duplicate = persons.filter(person => person.name === nPerson.name);
        if(duplicate.length !== 0) { //if record exists
            if(duplicate[0].number === nPerson.number) { //duplicate
                window.alert(`${nPerson.name} is already added to phonebook.`);
            } else { //update number
                const confirmation = window.confirm(`Update ${nPerson.name}'s number with ${nPerson.number}?`);
                if(confirmation) {
                    console.log('Updating new number');
                    personService.update(duplicate[0].id, nPerson).then( result => {
                        createNotif(`${nPerson.name}'s number has been updated`);
                        refresh();
                    }).catch(err => {
                        createError(`${nPerson.name} could not be updated: ${err.response.data}`)
                    });
                }
            }
        } else {    // add new record
            personService.create(nPerson).then(result => {
                refresh();
                createNotif(`${nPerson.name} has been added`);
            }).catch(err => {
                console.log(err);
                createError(`${nPerson.name} could not be added: ${err.response.data}`);
            });
        }
    }

    const handleDelete = (id) => {
        const persons = personStore.getState();

        const delName = (persons.find(element => element.id === id)).name;
        const result = window.confirm(`Delete ${delName}'s record?`);
        if(result) {
            console.log('Delete: ', id, delName);
            personService.remove(id).then(request => {
                refresh();
            });
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
        refresh();
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
    const refresh = () => {
        personService
            .getAll()
            .then(numbers => {
                personStore.dispatch(setPersons(numbers));
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
                : <PersonForm user={user} publishPerson={publishPerson}/>}
            <h2>Numbers</h2>
            <People persons={personStore.getState()} deleteHandler={handleDelete} />
        </div>
    )
}

export default App