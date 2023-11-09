import { useDispatch, useSelector } from "react-redux";
import { loginUser, updateUsername, updatePassword, logoutUser } from "../reducers/loginReducer";


const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)
  const username = useSelector((state) => state.login.username)
  const password = useSelector((state) => state.login.password)
  const loggedUser = useSelector((state => state.login.loggedInUser))

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(user))
  }

  const handleLogout = async () => { 
    dispatch(logoutUser())
  };

  let loginHtml;

  if (loggedUser) {
    loginHtml = (
      <div>
        <p>{loggedUser.username} logged in</p>
        <button id="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  } else {
    loginHtml = (
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            required
            onChange={(e) => dispatch(updateUsername(e.target.value))}
          />
        </div>
        <div>
          Password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            required
            onChange={(e) => dispatch(updatePassword(e.target.value))}
          />
        </div>
        <button id="login-btn" type="submit">
          Login
        </button>
      </form>
    );
  }
  return (
    <div>
      <h2>Login</h2>
      <div>
        {loginHtml}
      </div>
    </div>
  )
};

export default LoginForm;
