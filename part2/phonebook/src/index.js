import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { Provider } from 'react-redux';
import personStore from './reducers/personReducer';

const renderApp = () => {
    ReactDOM.render(
        <Provider store={personStore}>
            <App/>
        </Provider>
        , document.getElementById('root'));
}

renderApp();
personStore.subscribe(renderApp);