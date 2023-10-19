const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input 
          type="text"
          value={username}
          name="Username"
          required
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input 
          type="password"
          value = {password}
          name= "Password"
          required
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
    
  )
}

export default LoginForm