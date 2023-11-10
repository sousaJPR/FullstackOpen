import { useState } from "react"

const CreateBlog = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlogAndCleanStates = (e, title, author, url) => {
        createBlog(e, title, author, url)
        setTitle('')
        setAuthor('')
        setUrl('')

    }
    return (
        <div>
            <h2>Create New Blog</h2>
            <form onSubmit={(e) => createBlogAndCleanStates(e, title, author, url)}>
                <div>Title: <input id="title" type="text" value={title} onChange={({target}) => setTitle(target.value)}/></div>
                <div>Author: <input id="author" type="text" value={author} onChange={({target}) => setAuthor(target.value)}/></div>
                <div>Url: <input id="url" type="text" value={url} onChange={({target}) => setUrl(target.value)}/></div>
                <button id="create-blog" type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateBlog