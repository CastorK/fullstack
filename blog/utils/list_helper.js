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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}