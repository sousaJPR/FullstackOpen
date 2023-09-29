const Header = ({course}) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}
const Content = ({parts}) => {
  console.log(parts)
  return (
    <>
      {parts.map(part =>
        <Part key={part.name} part = { part } /> 
      )}
      
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}



const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack App Development',
    parts: [
      {
        name: 'React Library Fundamentals',
        exercises: 10
      },
      {
        name: 'Passing Data With Props',
        exercises: 7
      },
      {
        name: 'Component States',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts = { course.parts } />
      <Total parts = { course.parts } />
    </div>
  )
}

export default App