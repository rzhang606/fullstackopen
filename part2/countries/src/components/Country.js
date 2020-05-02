import React, {useEffect, useState} from 'react'
import axios from 'axios';

const Country = ({country}) => {

    const api_key = process.env.REACT_APP_API_KEY; 
    const [weather, setWeather] = useState({
        temperature: 'N/A',
        wind_speed: 'N/A',
        wind_degree: 'N/A',
        wind_dir: 'N/A',
        weather_icons: ['']
    });

    //Effect
    useEffect(() => {
        console.log('Fetching weather data ... ');        
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
            .then(response => {
                console.log(response.data);
                setWeather(response.data.current);
            });
    }, []);
    
    return (
        <div>
            <h3>{country.name}</h3>
            <p>Capitol: {country.capital}</p>
            <p>Population: {country.population}</p>
            <p>Languages: </p>
            <ul>
                {country.languages.map((language) => 
                    <li key={language.name}>{language.name}</li>
                )}
            </ul>
            <img src={country.flag} alt='Country Flag' height='100' width = '100'/>
            <div>
                <h3>Weather in {country.capital}</h3>
                <p>Temperature: {weather.temperature} C </p>
                <p>Wind: {weather.wind_speed} {weather.wind_degree} {weather.wind_dir}</p>
                <img src={weather.weather_icons[0]} alt='Weather Icon'/>
            </div>
        </div>
    )
}

export default Country;