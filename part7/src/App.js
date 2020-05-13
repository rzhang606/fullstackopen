import React, { useState } from 'react'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='#' style={padding}>anecdotes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a>
    </div>
  )
}


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

  return (
    <Router>
      <div>
        <Link style={{padding: 5}} to='/anecdotes'>Anecdotes</Link>
        <Link style={{padding: 5}} to='/create_new'>Create New</Link>
        <Link style={{padding: 5}} to='/about'>About</Link>
      </div>
      <h1>Software anecdotes</h1>

      <Switch>
        <Route path='/anecdotes'>
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
    </Router>
  )
}

export default App;
