
import personService from '../services/Persons';
import personStore from '../reducers/personReducer'

/**
 * Event Handlers
 */
export const publishPerson = async (nPerson) => {
    const persons = personStore.getState();
    const duplicate = persons.filter(person => person.name === nPerson.name);
    if(duplicate.length !== 0) { //if record exists
        if(duplicate[0].number === nPerson.number) { //duplicate
            return { code: 1, message: `${nPerson.name} is already added to phonebook.`};
        } else { //update number
            const confirmation = window.confirm(`Update ${nPerson.name}'s number with ${nPerson.number}?`);
            if(confirmation) {
                console.log('Updating new number');
                try{
                    const r = await personService.update(duplicate[0].id, nPerson);
                    return {code: 0, message: `${r.name}'s number has been updated`};
                } catch (err) {
                    console.log(err);
                    return {code: 1, message: `Update unsuccessful: ${err}`};
                }
            }
        }
    } else {    // add new record
        try{
            const r = await personService.create(nPerson);
            return {code: 0, message: `${r.name} has been added`};
        } catch (err) {
            console.log(err);
            return {code: 1, message: `${nPerson.name} could not be added: ${err}`}
        }
    }
}

export const deletePerson = async (id) => {
    const persons = personStore.getState();

    const person = persons.find(element => element.id === id);
    if(!person) {
        return {code: 1, message: 'Does not exist'};
    }
    const result = window.confirm(`Delete ${person.name}'s record?`);
    if(result) {
        console.log('Deleting: ', id, person.name);
        try {
            await personService.remove(id);
            return {code: 0, message: "Successfully deleted"}
        } catch (err) {
            return {code: 1, message: `${err}`}
        }
    }
}