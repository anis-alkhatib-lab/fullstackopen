const express = require('express');
const mongoose = require('mongoose');
const { requestLogger, errorHandler, unknownEndpoint } = require('./utils/middleware');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');
const { MONGODB_URI } = require('./utils/config');

const app = express();

logger.info('connecting to MongoDB');

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => logger.info('connected to MongoDB'))
  .catch((err) => logger.error('error connecting to MongoDB: ', err.message));

app.use(express.json());
app.use(requestLogger);
app.use('/api/blogs', blogsRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
