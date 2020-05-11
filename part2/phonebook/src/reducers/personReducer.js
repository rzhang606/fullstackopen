import { createStore } from 'redux';

/**
 * State
 */
const persons = [];

/**
 * Action Creators
 */
export const setPersons = (people) => {
    return {
        type: 'SET',
        data: people
    }
}

/**
 * Reducer
 */
const personsReducer = (state = persons, action) => {
    console.log('Action:', action);
    switch(action.type) {
        case 'SET':
            return action.data;
        default:
            return state;
    }
}

const personStore = createStore(personsReducer);
export default personStore;