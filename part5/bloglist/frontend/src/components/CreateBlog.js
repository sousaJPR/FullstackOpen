import { useState } from "react"

const CreateBlog = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    return (
        <div>
            <h2>Create New Blog</h2>
            <form onSubmit={(e) => addBlog(e, title, author, url)}>
                <div>Title: <input id="title" type="text" value={title} onChange={({target}) => setTitle(target.value)}/></div>
                <div>Author: <input id="author" type="text" value={author} onChange={({target}) => setAuthor(target.value)}/></div>
                <div>Url: <input id="url" type="text" value={url} onChange={({target}) => setUrl(target.value)}/></div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateBlog