import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        setBlogDetails(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        likeBlog(state, action) {
            const id = action.payload.id
            const blog = state.find(b => b.id === id)
            const updatedBlog = { ...blog, likes: blog.likes ? blog.likes + 1 : 1 }
            return state.map(b => b.id !== id ? b : updatedBlog)
        },
        addComment(state, action) {
            /* const id = action.payload.id
            const comment = action.payload.comment
            const blog = state.find(b => b.id === id)
            const updatedBlog = {... blog, comments: comment}
            return updatedBlog */
            return action.payload
        },
        remove(state, action) {
            const id = action.payload
            const updatedList = state.filter(b => b.id !== id)
            return updatedList
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
            try {
                const blogList = await blogService.getAll()
                //console.log('get all blogs', blogList)
                dispatch(setBlogs(blogList))
            } catch (error) {
                console.log('error trying to fetch bloglist', error)
                dispatch(setNotification('Impossible to load Blog List', 'error'))
            }
    }
}
export const createNew = (content) => {
    return async dispatch => {
        const newBlog = await blogService.createBlog(content)
        dispatch(appendBlog(newBlog))
        dispatch(setNotification(`Blog '${newBlog.title}' created by ${newBlog.author}`, 'success', 3))
    }
}

export const getBlog = (id) => {
    return async dispatch => {
        //console.log('id: ', id)
        const blog = await blogService.getById(id)
        //console.log('blog no reducer:', blog)
        dispatch(setBlogDetails(blog))
    }
}

export const updateBlog = (blog) => {
    return async dispatch => {
        const newBlog = { ...blog, likes: blog.likes ? blog.likes + 1 : 1 }
        //console.log('blog que chega', blog)
        const updatedBlog = await blogService.updateBlog(newBlog)
        //console.log('updatedBlog', updatedBlog)
        dispatch(likeBlog(updatedBlog))
        dispatch(setNotification(`'${updatedBlog.title} from '${updatedBlog.author} liked!`, 'success', 3))
    }
}

export const commentBlog = (blog) => {
    return async dispatch => {
        console.log('blog no reducer: ', blog.id)
        const updatedBlog = await blogService.updateBlog(blog)
        console.log('blog no reducer: ', blog)
        console.log('updatedblog no reducer: ', updatedBlog)
        dispatch(addComment(updatedBlog))
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.removeBlog(id)
        dispatch(setNotification(`Blog removed!`, 'success', 3))
        dispatch(remove(id))
    }
}

export const { setBlogs, setBlogDetails, addComment, appendBlog, likeBlog, remove } = blogSlice.actions
export default blogSlice.reducer