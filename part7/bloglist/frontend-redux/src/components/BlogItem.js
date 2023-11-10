import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeBlog, updateBlog } from "../reducers/blogsReducer";

const BlogItem = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login.loggedInUser)
  const { title, author, url, likes, user: blogUser } = blog;
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const hiden = { display: visible ? "none" : "" };
  const shown = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
    <Card>
      <Card.Header><Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <Button className='list-toggle-btn' variant="secondary" onClick={toggleVisibility}>{visible ? "Hide" : "Expand"}</Button>
      </Card.Header>


      {visible && (
        <div style={shown} className="blog-details">
          <p>Title: {title}</p>
          <p>
            Url: <a href={url}>{url}</a>
          </p>
          <p>
            Likes: {likes}{" "}
            <Button variant="outline-success" size="sm" onClick={() => dispatch(updateBlog(blog))}>Like</Button>
          </p>
          <p>Author: {author}</p>
          {user.username === blogUser.username && (
            <Button className='remove-btn' variant='danger' onClick={() => setShowModal(true)}>Remove</Button>
          )}
        </div>
      )}
    </Card>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Remove Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to remove "{blog.title}"?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
              <Button variant='danger' onClick={() => dispatch(removeBlog(blog.id))}>Remove</Button>
            </Modal.Footer>
    </Modal>
    </>
  );
};

export default BlogItem;
