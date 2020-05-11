import  {createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';

import personReducer from './personReducer';
import errorReducer from './errorReducer';

const reducers = combineReducers( {people: personReducer, error: errorReducer} );
const personStore = createStore(
    reducers,
    applyMiddleware(thunk)
);
console.log('State:', personStore.getState());

export default personStore;