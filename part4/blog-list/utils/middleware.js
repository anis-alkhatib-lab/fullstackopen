const logger = require('./logger');

const requestLogger = (req, _, next) => {
  logger.info('Method', req.method);
  logger.info('Path', req.path);
  logger.debug('Body', req.body);
  logger.debug('---');
  next();
};

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, _, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
