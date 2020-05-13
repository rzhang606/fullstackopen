import React from 'react'
import {useHistory} from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const history = useHistory();
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.form.value,
        author: author.form.value,
        info: info.form.value,
        votes: 0
      });
      history.push('/');
    }

    const handleReset = (e) => {
      e.preventDefault()
      content.reset();
      author.reset();
      info.reset();
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.form} />
          </div>
          <div>
            author
            <input {...author.form} />
          </div>
          <div>
            url for more info
            <input {...info.form} />
          </div>
          <button>create</button>
          <button onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
  }

export default CreateNew;