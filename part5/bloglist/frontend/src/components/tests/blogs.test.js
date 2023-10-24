import React from "react"
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from "@testing-library/react"

import CreateBlog from "../BlogForm"
import Blog from "../Blog"

const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "Test Url",
    likes: 3,
    user: 'admin'
}
const user = {
    username: 'admin'
}

describe('Blog List', () => {
    
    test('At start, renders a blog without displaying url and likes', async () => {
        const {container} = render(<Blog blog={blog} />)

        const blogTitle = container.querySelector('.blogTitle')
        expect(blogTitle).toBeDefined()
        expect(blogTitle).toHaveTextContent(`${blog.title} by ${blog.author}`)
    })

    test('shows blog details when "view" is clicked', async () => {
        const {container} = render(<Blog blog={blog} user={user}/>)

        expect(screen.queryByText('Url:', { exact: false })).toBeNull()
        expect(screen.queryByText('Likes:', { exact: false })).toBeNull()

        const viewButton = screen.getByTestId('vis-btn');
        fireEvent.click(viewButton);

        const blogDetails = container.querySelector('.blog-details')
        expect(blogDetails).toBeInTheDocument()
        expect(blogDetails).toHaveTextContent(`${blog.url}`)
        expect(blogDetails).toHaveTextContent(`${blog.likes}`)
    });


    test('button clicked twice', () => {
        const mockHandler = jest.fn()
        const {container} = render(<Blog blog={blog} user={user} handleLike={mockHandler}/>)

        const visButton = screen.getByText('view')
        fireEvent.click(visButton)

        const blogDetails = container.querySelector('.blog-details')
        expect(blogDetails).toBeVisible()

        const likeButton = screen.getByText('Like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(mockHandler).toBeCalledTimes(2)
    })

    test('create a new blog', () => {
        const {container} = render(<CreateBlog />)

        const title = container.querySelector('#title')
        const author = container.querySelector('#author')
        const url = container.querySelector('#url')

        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeDefined()
    })
})
