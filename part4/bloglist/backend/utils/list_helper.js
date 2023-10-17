const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    } else {
        const reducer = blogs.reduce((sum, item) => sum + item.likes, 0)
        return reducer
    }

}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((mostLikes, blogs) => {
        if (blogs.likes > mostLikes.likes) {
            return blogs
        } else {
            return mostLikes
        }
    }, blogs[0])
    delete favorite._id
    delete favorite.url
    delete favorite.__v
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0 ) {
        return null
    }
    const authorCounts = {}
    blogs.forEach((blog) => {
        if (authorCounts[blog.author]) {
            authorCounts[blog.author]++
        } else {
            authorCounts[blog.author] = 1
        }
    })
    let mostBlogsCount = 0
    let mostBlogsAuthor = null

    for (const author in authorCounts) {
        if (authorCounts[author] > mostBlogsCount) {
            mostBlogsCount = authorCounts[author]
            mostBlogsAuthor = author
        }
    }
    return { 
        "author": mostBlogsAuthor,
        "blogs": mostBlogsCount
     }
}

const mostLikes = (blogs) => {
    const authorLikes = {}
    blogs.forEach((blog) => {
        const author = blog.author
        const likes = blog.likes

        if (authorLikes[author]) {
            authorLikes[author] += likes
        } else {
            authorLikes[author] = likes
        }
    })

    
    let mostLikesAuthor = null
    let mostLikes = 0

    for (const author in authorLikes) {
        if (authorLikes[author] > mostLikes) {
            mostLikes = authorLikes[author]
            mostLikesAuthor = author
        }
    }
    return {
        "author": mostLikesAuthor,
        "likes": mostLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}