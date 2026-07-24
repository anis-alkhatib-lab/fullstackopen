const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, listWithManyBlogs } = require('../tests/tests_data')

test('dummy return one', () => {
  const result = listHelper.dummy([])
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list is empty, return 0', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has many blogs, equels the sum of likes for all blogs', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('when list is empty return an empty object', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has one blog return that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('when list has many blogs, return the one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    assert.deepStrictEqual(result, listWithManyBlogs[2])
  })
})

describe('most blogs', () => {
  test('when list is empty, return an empty object', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has one blog, return an object with the author and blogs equals 1', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, { author: listWithOneBlog[0]['author'], blogs: 1 })
  })

  test('when list has many blogs, return an object with the author of the most blogs and blogs as the number of blogs written by that author', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most blogs', () => {
  test('when list is empty, return an empty object', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has one blog, return an object with that blog author and its total likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: listWithOneBlog[0]['author'],
      likes: listWithOneBlog[0]['likes'],
    })
  })

  test('when list has many blogs, return an object with the author of the most blogs and blogs as the number of blogs written by that author', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
