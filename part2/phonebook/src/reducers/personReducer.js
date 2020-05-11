import personService from '../services/Persons';
import { setErrAction } from './errorReducer';

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

export const fetchPStore = () => {
    return (dispatch) => {
        personService.getAll()
            .then( response => dispatch(setPStore(response)))
            .catch( err => dispatch(setErrAction(err)));
    }
}

export default personsReducer;