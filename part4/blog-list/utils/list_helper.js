const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, current) => (fav.likes > current.likes ? fav : current), {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
