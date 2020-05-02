import React from 'react'
import Country from './Country';
import ResultEntry from './ResultEntry';

const ResultList = ({countries, query}) => {
    // Filter
    let targetCountries = countries.filter(country => country.name.toLowerCase().includes(query.toLowerCase()));
    
    if(targetCountries.length === 1) {
        return (
            <Country country={targetCountries[0]}/>
        )
    } else if (query !== '') {
        return (
            <div>
                {targetCountries.map((country) =>
                    <ResultEntry key={country.name} country={country} />
                )}
            </div>
        )
    } else {
        return (
            <p>Search for countries using the search bar.</p>
        )
    }
    
}

export default ResultList;