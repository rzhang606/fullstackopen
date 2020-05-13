import React from 'react'
import {useParams} from 'react-router-dom'

const Anecdote = ({anecdote}) => {


    return (
        <div>
            {anecdote ?
            <div>
                <h2>{anecdote.content}</h2>
                <p>Author: {anecdote.author}</p>
                <p>Votes: {anecdote.votes}</p>
            </div>
            :
            <h2>No anecdote found</h2>}
        </div>
    )
}

export default Anecdote;