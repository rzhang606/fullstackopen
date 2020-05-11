import React from 'react';
import ReactDOM from 'react-dom';
import ratingStore from './reducers/ratingReducer';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({text, value, endText}) => (
  <p>{text}: {value}{endText}</p>
)


const App = () => {

  const clickHandler = (value) => () => {
    if(value === 0) {
      ratingStore.dispatch({type: 'GOOD'})
    } else if (value === 1) {
      ratingStore.dispatch({type: 'OK'})
    } else if (value === 2) {
      ratingStore.dispatch({type: 'BAD'})
    }
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={clickHandler(0)} text="Good"/>
      <Button handleClick={clickHandler(1)} text="Neutral"/>
      <Button handleClick={clickHandler(2)} text="Bad"/>
      <h1>Statistics</h1>
      <Statistics text="Good" value={ratingStore.getState().good}/>
      <Statistics text="Neutral" value={ratingStore.getState().ok} />
      <Statistics text="Bad" value={ratingStore.getState().bad} />
      <Statistics text="All" value={ratingStore.getState().all} />
      <Statistics text="Average" value={(ratingStore.getState().good - ratingStore.getState().bad) / ratingStore.getState().all} />
      <Statistics text="Positive" value={(ratingStore.getState().good / ratingStore.getState().all) * 100} endText={'%'}/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render( <App />, document.getElementById('root'));
}

renderApp();
ratingStore.subscribe(renderApp);
