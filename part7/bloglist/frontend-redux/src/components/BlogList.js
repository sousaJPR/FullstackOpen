import BlogItem from "./BlogItem";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogsReducer";
import { useEffect, useState } from "react";

const BlogList = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  // fetch blog list
  useEffect(() => {
    dispatch(initializeBlogs())
      .then(() => {
        setLoading(false)
      })
  },[])
  
  
  const blogList = useSelector(state => {
    if (!loading) return [...state.blogs]
  })
  console.log('blog list:', blogList)
  

  

  const sortByLikes = (a, b) => b.likes - a.likes;

  // waiting for blogList to load
  if (loading) return <p>Loading...</p>
  return (
    <div>
        <h2>List</h2>
        {blogList &&
          blogList
            .sort(sortByLikes)
            .map((blog) => (
              <BlogItem
                key={blog.id}
                blog={blog}
              />
            ))}
      </div>
  );
};

export default BlogList;
