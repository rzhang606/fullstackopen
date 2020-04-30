import React from 'react';
import ReactDOM from 'react-dom';


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
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total count={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

//renders the component into div-element defined in public/index.html with id=root
ReactDOM.render(<App/>, document.getElementById('root'))
