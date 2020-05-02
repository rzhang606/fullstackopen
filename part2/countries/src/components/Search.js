import React from 'react'

const Search = ({value, handler}) => {

    return (
        <form>
            <div>
                Find Countries: <input value={value} onChange={handler} />
            </div>
        </form>
    )
}

export default Search;