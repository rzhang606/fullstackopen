import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

import personStore from './reducers/personReducer';

const renderApp = () => {
    ReactDOM.render( <App/>, document.getElementById('root') );
}

renderApp();
personStore.subscribe(renderApp);