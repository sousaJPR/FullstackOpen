import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentBlog, getBlog } from '../reducers/blogsReducer'

const Blog = () => {
    const dispatch = useDispatch()
    const { blogId } = useParams()
    const [loading, setLoading] = useState(true)
    const [comment, setComment] = useState('')
    console.log('blogid: ', blogId)

    useEffect(() => {
        dispatch(getBlog(blogId))
            .then(() => {
                setLoading(false)
            })
    }, [])
    const blogInfo = useSelector(state => state.blogs)
    const blogComments = blogInfo.comments

    const handleComment = (e) => {
        e.preventDefault()
        const generateId = Math.floor(Math.random() * 1000000)
        const newComment = {
            id: generateId,
            content: comment
        }
        const newBlog = {
            ...blogInfo,
            comments: [...blogInfo.comments, newComment]
        }
        console.log('blog: ', newBlog)
        dispatch(commentBlog(newBlog)).then(() => setComment(''))
    }

    if (loading) return <p>Loading...</p>
    return (
        <div>
            <div>
                <h4>{blogInfo.title}</h4>
                <p>Url: <a href="#">{blogInfo.url}</a></p>
                <p>Likes: {blogInfo.likes}</p>
                <p>Added by {blogInfo.author}</p>
            </div>
            <div>
                <form onSubmit={handleComment}>
                    <h5>Comments</h5>
                    <input value={comment} onChange={(e) => setComment(e.target.value)}/>
                    <button>Add Comment</button>
                </form>
                <ul>
                    {blogComments
                     ? (
                        blogComments.map(comment =>
                            <li key={comment.id}>
                                {comment.content}
                            </li>
                        )
                     ):(
                        'no comments yet'
                     )}
                </ul>
            </div>

        </div>
    )
}

export default Blog