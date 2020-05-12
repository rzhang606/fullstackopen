
import personService from '../services/Persons';
import store from '../reducers/store'
import { createErrAction } from '../reducers/errorReducer';
import { createNotif } from '../reducers/notifReducer';
import { fetchPStore } from '../reducers/personReducer';

/**
 * Event Handlers
 */
export const publishPerson = async (nPerson) => {
    const people = store.getState().people;
    const duplicate = people.filter(person => person.name === nPerson.name);
    if(duplicate.length !== 0) { //if record exists
        if(duplicate[0].number === nPerson.number) { //duplicate
            store.dispatch(createErrAction(`${nPerson.name} is already added to phonebook.`));
        } else { //update number
            const confirmation = window.confirm(`Update ${nPerson.name}'s number with ${nPerson.number}?`);
            if(confirmation) {
                console.log('Updating new number');
                try{
                    const r = await personService.update(duplicate[0].id, nPerson);
                    store.dispatch(fetchPStore());
                    store.dispatch(createNotif(`${r.name}'s number has been updated`));
                } catch (err) {
                    console.log(err);
                    store.dispatch(createErrAction(`Update unsuccessful: ${err}`));
                }
            }
        }
    } else {    // add new record
        try{
            const r = await personService.create(nPerson);
            store.dispatch(fetchPStore());
            store.dispatch(createNotif(`${r.name} has been added`));
        } catch (err) {
            console.log(err);
            store.dispatch(createErrAction(`${nPerson.name} could not be added: ${err}`));
        }
    }
}

export const deletePerson = async (id) => {
    const people = store.getState().people;

    const person = people.find(element => element.id === id);
    if(!person) {
        store.dispatch(createErrAction('Does not exist'));
    }
    const result = window.confirm(`Delete ${person.name}'s record?`);
    if(result) {
        console.log('Deleting: ', id, person.name);
        try {
            await personService.remove(id);
            store.dispatch(fetchPStore());
            store.dispatch(createNotif('Successfully Deleted'));
        } catch (err) {
            store.dispatch(createErrAction(`${err}`));
        }
    }
}