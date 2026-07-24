const { listWithManyBlogs } = require('../tests/tests_data')
const _ = require('lodash')

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

const mostBlogsLodash = (blogs) => {
  if (blogs.length === 0) return {}

  return _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author,
      blogs: blogs.length,
    }))
    .maxBy('blogs')
    .value()
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const counts = {}
  let maxLikes = 0
  let maxAuthor = null

  for (const { author } of blogs) {
    counts[author] = 0
  }

  for (const { author, likes } of blogs) {
    counts[author] += likes
    if (counts[author] > maxLikes) {
      maxLikes = counts[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    likes: maxLikes,
  }
}

const mostLikesLodash = (blogs) => {
  if (blogs.length === 0) return {}

  return _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author,
      likes: _.sumBy(blogs, 'likes'),
    }))
    .maxBy('likes')
    .value()
}

mostLikes(listWithManyBlogs)

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  mostLikesLodash,
  mostBlogsLodash,
}
