import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
    const { title, author, url, likes, user: blogUser } = blog
    const [visible, setVisible] = useState(false)
    const hiden = { display: visible ? 'none' : '' }
    const shown = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div className='blog-container'>
            <div className='div-header'>
                <div style={hiden}>
                    <p className='blogTitle'>{title} by {author}</p>
                </div>
                <button id="view-btn" data-testid='vis-btn' onClick={toggleVisibility}>
                    {visible ? 'hide' : 'view'}
                </button>
            </div>
            {visible && (
                <div style={shown} className="blog-details">
                    <p>Title: {title}</p>
                    <p>Url: <a href={url}>{url}</a></p>
                    <p>Likes: {likes} <button id="like-btn" onClick={() => handleLike(blog)}>Like</button></p>
                    <p>Author: {author}</p>
                    {console.log('user.username:', user.username, 'blogUser:', blogUser.username)}
                    {user.username === blogUser.username && (
                        <button id="remove-btn" onClick={() => handleRemove(blog)}>Remove</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Blog