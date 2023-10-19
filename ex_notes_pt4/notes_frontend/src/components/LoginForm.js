const loginForm = ({ handleLogin, username, setUsername, password, setPassword, setLoginVisible}) => (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        <p>Username</p>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <p>Password</p>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" className="login-button">Login</button>
      
    </form>
  </div>)

export default loginForm