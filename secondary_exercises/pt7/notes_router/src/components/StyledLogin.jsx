import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const StyledLogin = (props) => {
  const navigate = useNavigate()
  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('styled root')
    navigate('/')
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          Username:
          <Input
            type="text"
            name="username"
          />
          Password:
          <Input
            type="password"
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default StyledLogin