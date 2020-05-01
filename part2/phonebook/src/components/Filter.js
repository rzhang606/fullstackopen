import React from 'react'

const Filter = ({input, inputHandler}) => {
    return (
        <form>
            <div>
                Filter by name: <input value={input} onChange={inputHandler}/>
            </div>
        </form>
    )
}

export default Filter;