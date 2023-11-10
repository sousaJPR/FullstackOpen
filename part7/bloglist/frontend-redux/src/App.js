import { useEffect } from "react";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
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
    <div className="container">
      <div>
        <Navbar />
        <h1 className="title">Blog List App</h1>
        <Notifications />
        
      </div>
      {user
      ? (
        <div className="blogsPage">
          <div>
            <Routes>
              <Route path="/" element={<BlogList user={user} />} />
              <Route path="/blogs/:blogId" element={<Blog />} />
              <Route path="/createBlog" element={<CreateBlog />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:userId" element={<User />} />
            </Routes>
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
export default App;
