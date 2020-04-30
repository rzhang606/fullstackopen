import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const generateRandom = (size) => {
  const rand = Math.round(Math.random() * 10 % (size-1))
  console.log(rand)
  return rand
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.from(Array(props.anecdotes.length), () => 0)) // generate array of size anecdotes.length, and map to all zeroes

  // generate update state with showing random anecdote
  const clickHandler = () => (
    setSelected(generateRandom(props.anecdotes.length))
  )

  // handles adding vote
  const voteClickHandler = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
  }

  //gets largest voted anecdote, assuming at least 1 anecdote exists
  const getPopularAnecdote = () => {
    let index = 0
    let largestVal = points[0]
    for(let i = 1; i < points.length; i++) {
      if(points[i] > largestVal) {
        index = i
        largestVal = points[i]
      }
    }
    return index
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Votes: {points[selected]}</p>
      <div>
        <button onClick={voteClickHandler}>Vote</button>
        <button onClick={clickHandler}>Next Anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[getPopularAnecdote()]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)