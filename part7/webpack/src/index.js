import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const hello = name => {
    console.log('hello ${name}')
}

ReactDOM.render(<App/>, document.getElementById('root'))
