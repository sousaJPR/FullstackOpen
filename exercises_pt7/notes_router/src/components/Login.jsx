import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

const Login = (props) => {
  const navigate = useNavigate()
  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('root')
    navigate('/')
  }
  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </div>
  )
}

export default Login