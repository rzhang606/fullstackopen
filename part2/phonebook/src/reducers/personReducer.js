import { createStore } from 'redux';

/**
 * Reducer
 */
const personsReducer = (state = [], action) => {
    console.log('Action:', action);
    switch(action.type) {
        case 'SET':
            return action.data;
        default:
            return state;
    }
}

/**
 * Action Creators
 */
export const setPStore = (people) => {
    return {
        type: 'SET',
        data: people
    }
}

/**
 * Store
 */
const personStore = createStore(personsReducer);

export default personStore;