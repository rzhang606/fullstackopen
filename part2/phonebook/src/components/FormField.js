import React from 'react'

const FormField = ({title, input, inputHandler}) => {
    return (
        <div>
            {title}: <input value={input} onChange={inputHandler}/>
        </div>
    )
}

export default FormField