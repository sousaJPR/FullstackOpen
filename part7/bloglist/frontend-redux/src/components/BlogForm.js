import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, removeBlog, updateBlog } from "../reducers/blogsReducer";
import { useEffect } from "react";

const BlogForm = () => {
  const dispatch = useDispatch()
  // fetch blog list
  useEffect(() => {
    dispatch(initializeBlogs())
  },[])
  
  const blogs = useSelector(state => [...state.blogs])

  const handleLike = async (blog) => {
      dispatch(updateBlog(blog))
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      dispatch(removeBlog(blog.id))
    }
  };

  const sortByLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
        <h2>List</h2>
        {blogs &&
          blogs
            .sort(sortByLikes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
              />
            ))}
      </div>
  );
};

export default BlogForm;
