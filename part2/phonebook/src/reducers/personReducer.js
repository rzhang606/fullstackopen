import personService from '../services/Persons';
import { createHTTPErrAction } from './errorReducer';

/**
 * Reducer
 */
const personsReducer = (state = [], action) => {
    console.log('Action:', action);
    switch(action.type) {
        case 'P_SET':
            return action.data;
        default:
            return state;
    }
}

/**
 * Action Creators
 */
const set_action = (people) => {
    return {
        type: 'P_SET',
        data: people
    }
}

export const fetchPStore = () => {
    return (dispatch) => {
        personService.getAll()
            .then( response => dispatch(set_action(response)))
            .catch( err => dispatch(createHTTPErrAction(err)));
    }
}

export default personsReducer;