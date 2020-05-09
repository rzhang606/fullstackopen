import React from 'react'
import FormField from './FormField'

const PersonForm = ({user, handleSubmit, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
        <div>
            <h2>Add New as {user.name}:</h2>
            <form onSubmit={handleSubmit}>
                <FormField title="Name" input={newName} inputHandler={handleNameChange} />
                <FormField title="Number" input={newNumber} inputHandler={handleNumberChange} />
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm