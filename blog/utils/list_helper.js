const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach( blog => { sum += blog.likes })
    return sum
}

const favoriteBlog = (blogs) => {
    let currentFavorite = {}
    blogs.forEach( blog => {
        if (!currentFavorite.likes || currentFavorite.likes < blog.likes) {
            currentFavorite = blog
        }
    })
    return currentFavorite
}

const mostBlogs = (blogs) => {
    const amounts = {}
    blogs.forEach( blog => {
        amounts[blog.author] = amounts[blog.author]+1 || 1
    })

    let currentBest = {}
    Object.entries(amounts).forEach(pair => {
        if (!currentBest.blogs || currentBest.blogs < pair[1]) {
            currentBest = { 'author': pair[0], 'blogs': pair[1]}
        }
    })
    return currentBest
}

const mostLikes = (blogs) => {
    const amounts = {}
    blogs.forEach( blog => {
        amounts[blog.author] = amounts[blog.author]+blog.likes || blog.likes
    })

    let currentBest = {}
    Object.entries(amounts).forEach(pair => {
        if (!currentBest.likes || currentBest.likes < pair[1]) {
            currentBest = { 'author': pair[0], 'likes': pair[1]}
        }
    })
    return currentBest
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}