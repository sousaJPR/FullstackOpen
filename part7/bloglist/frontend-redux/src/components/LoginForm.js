import { useDispatch, useSelector } from "react-redux";
import { loginUser, updateUsername, updatePassword, logoutUser } from "../reducers/loginReducer";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.login)
  const username = useSelector((state) => state.login.username)
  const password = useSelector((state) => state.login.password)

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('user', user)
    dispatch(loginUser(user))
    navigate(`/`)
  }

return (
      <Form onSubmit={handleLogin} className="login-form">
        <Form.Group>
        <Form.Label>Username </Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            required
            onChange={(e) => dispatch(updateUsername(e.target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            required
            onChange={(e) => dispatch(updatePassword(e.target.value))}
          />
        <Button className='form-btn' variant="primary" type="submit">
          Login
        </Button>
        </Form.Group>
      </Form>
    )
}
export default LoginForm;
