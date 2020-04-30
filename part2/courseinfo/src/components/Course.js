import React from 'react';

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
        <div>
            {parts.map((part) => 
            <Part title={part.name} count={part.exercises} key={part.id} />
            )}
        </div>
    )
}

const Total = ({parts}) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises;
    let total = parts.reduce(reducer, 0);
    
    return (
      <p>Total of {total} exercies</p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;