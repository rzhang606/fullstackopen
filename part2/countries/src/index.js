import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';
import Search from './components/Search'
import ResultList from './components/ResultList';

const App = () => {
    // States
    const [ query, newQuery ] = useState('');
    const [ countries, setCountries ] = useState([]);

    //event handler
    const handleNewQuery = (event) => {
        console.log(event.target.value);
        newQuery(event.target.value);
    }

    //Effects
    useEffect(() => {
        console.log('Fetching data ... ');
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('Promise fulfilled')
                setCountries(response.data);
            });
    }, []);

    return (
        <div>
            <Search value={query} handler={handleNewQuery} />
            <h2>Results:</h2>
            <ResultList countries={countries} query={query}/>
        </div>
    )

}

ReactDOM.render( <App/>, document.getElementById('root'));