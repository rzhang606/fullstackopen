import React, { useState } from 'react'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import {
  Switch, Route, Link, Redirect, useRouteMatch
} from 'react-router-dom'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification('New anecdote created');    
    setTimeout(() => setNotification(''), 10000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match ? anecdotes.find(element => Number(element.id) === Number(match.params.id)) : null;

  return (
    <div>
      <div>
        <Link style={{padding: 5}} to='/anecdotes'>Anecdotes</Link>
        <Link style={{padding: 5}} to='/create_new'>Create New</Link>
        <Link style={{padding: 5}} to='/about'>About</Link>
      </div>
      <h1>Software anecdotes</h1>

      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/anecdotes'>
          {notification === '' ? null : <p>{notification}</p>}
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path='/create_new'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
         <Redirect to='/anecdotes'/>
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App;
