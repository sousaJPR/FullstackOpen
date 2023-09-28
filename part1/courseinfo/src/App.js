const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}
const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part1 part1 = { props.parts[0] } />
      <Part2 part2 = { props.parts[1] } />
      <Part3 part3 = { props.parts[2] } />
    </>
  )
}

const Part1 = (props) => {
  return (
    <p>
      {props.part1.name} {props.part1.exercises1}
    </p>
  )
}

const Part2 = (props) => {
  return (
    <p>
      {props.part2.name} {props.part2.exercises}
    </p>
  )
}

const Part3 = (props) => {
  return (
    <p>
      {props.part3.name} {props.part3.exercises}
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
      <Content
        parts = { course.parts }
      />
      <Total 
        parts = { course.parts }
      />
    </div>
  )
}

export default App
