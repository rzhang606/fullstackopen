import React from 'react'

const FormField = ({title, input, inputHandler}) => {
    return (
        <div>
            <p>
                {title}: 
                <input value={input} onChange={inputHandler}/>
            </p>
        </div>
    )
}

export default FormField