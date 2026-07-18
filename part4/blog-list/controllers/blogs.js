const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (_, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch(next);
});

blogsRouter.post('/', (req, res, next) => {
  const { title, author, url } = req.body;

  if (!title || !author || !url) {
    res.status(400).json({
      error: 'title, author, and url are required',
    });
    return;
  }

  const blog = new Blog({
    title,
    author,
    url,
  });

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(next);
});

module.exports = blogsRouter;
