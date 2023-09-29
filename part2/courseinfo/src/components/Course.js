import Header from "./Header"
import Content from "./Content"

const Course = (props) => {
  return (
    <div>
      <Header name={props.course[0].name} />
      <Content parts = { props.course[0].parts } />
      <Header name={props.course[1].name} />
      <Content parts = { props.course[1].parts } />
    </div>
  )
}

export default Course