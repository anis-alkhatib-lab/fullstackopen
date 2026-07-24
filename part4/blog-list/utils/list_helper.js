const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, current) => (fav.likes > current.likes ? fav : current), {})
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const counts = {}
  let maxAuthor = null
  let maxBlogs = 0

  for (const { author } of blogs) {
    counts[author] = (counts[author] || 0) + 1

    if (counts[author] > maxBlogs) {
      maxBlogs = counts[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
