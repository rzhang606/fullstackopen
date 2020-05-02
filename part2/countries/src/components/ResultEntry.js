import React, {useState} from 'react'
import Country from './Country';


const ResultEntry = ({country}) => {

    const [press, setPress] = useState(false);

    return (
        <div>
            <p key={country.name}>
                {country.name}
                <button onClick={() => setPress(!press)}>
                    Show
                </button>
            </p>
            {(press) ? <Country country={country}/> : ''}
        </div>
    )
}

export default ResultEntry;