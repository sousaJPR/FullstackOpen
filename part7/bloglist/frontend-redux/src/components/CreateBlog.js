import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNew } from "../reducers/blogsReducer";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.loggedInUser)


  const addBlog = async (e, title, author, url) => {
    e.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      user: user,
    };
    dispatch(createNew(blogObject))
    navigate('/')
  };

  const addBlogAndCleanStates = (e, title, author, url) => {
    addBlog(e, title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };



  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={(e) => addBlogAndCleanStates(e, title, author, url)}>
        <div>
          Title:{" "}
          <input
            id="title"
            type="text"
            value={title}
            required
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:{" "}
          <input
            id="author"
            type="text"
            value={author}
            required
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:{" "}
          <input
            id="url"
            type="text"
            value={url}
            required
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
