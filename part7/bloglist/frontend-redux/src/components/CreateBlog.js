import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNew, initializeBlogs } from "../reducers/blogsReducer";
import { useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap'

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
    dispatch(initializeBlogs())
    addBlog(e, title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };



  return (
    <div>
      <h2>Create New Blog</h2>
      <Form onSubmit={(e) => addBlogAndCleanStates(e, title, author, url)}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            required
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            required
            onChange={({ target }) => setAuthor(target.value)}
          />
        <Form.Label>Url:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            required
            onChange={({ target }) => setUrl(target.value)}
          />
        <Button className='form-btn' variant="primary" type="submit">
          Create
        </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateBlog;
