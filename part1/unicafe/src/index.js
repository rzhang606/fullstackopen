import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({text, value, endText}) => (
  <p>{text}: {value}{endText}</p>
)


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickHandler = (value) => () => {
    if(value === 0) {
      setGood(good + 1)
    } else if (value === 1) {
      setNeutral(neutral + 1)
    } else if (value === 2) {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={clickHandler(0)} text="Good"/>
      <Button handleClick={clickHandler(1)} text="Neutral"/>
      <Button handleClick={clickHandler(2)} text="Bad"/>
      <h1>Statistics</h1>
      <Statistics text="Good" value={good}/>
      <Statistics text="Neutral" value={neutral} />
      <Statistics text="Bad" value={bad} />
      <Statistics text="All" value={good + neutral + bad} />
      <Statistics text="Average" value={(good - bad) / (good + neutral + bad)} />
      <Statistics text="Positive" value={(good / (good + neutral + bad)) * 100} endText={'%'}/>
    </div>
  )
}


ReactDOM.render( <App />, document.getElementById('root'));
