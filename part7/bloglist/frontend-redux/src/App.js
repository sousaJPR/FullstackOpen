import { useState, useEffect } from "react";
import BlogForm from "./components/BlogForm";
import Navbar from "./components/Navbar"
import LoginForm from "./components/LoginForm";
import Notifications from "./components/Notifications";
import Users from "./components/Users";
import User from "./components/User";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./reducers/loginReducer";
import { Routes, Route } from "react-router-dom";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login.loggedInUser)

  useEffect(() => {
      dispatch(setUser(user))
  }, [])

  return (
    <div>
      <div>
        <Navbar />
        <Notifications />
        <LoginForm />
      </div>
      {user && (
        <div className="blogsPage">
          <div>
            <Routes>
              <Route path="/" element={<BlogForm user={user} />} />
              <Route path="/createBlog" element={<CreateBlog />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:userId" element={<User />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
