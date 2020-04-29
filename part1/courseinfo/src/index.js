import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1> {props.course} </h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.title} {props.count}
    </p>
  )
}

const Content = (props) => {
  let parts = props.parts
  return (
    <>
      <Part title={parts[0].name} count={parts[0].exercises} />
      <Part title={parts[1].name} count={parts[1].exercises} />
      <Part title={parts[2].name} count={parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.count}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total count={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

//renders the component into div-element defined in public/index.html with id=root
ReactDOM.render(<App/>, document.getElementById('root'))
