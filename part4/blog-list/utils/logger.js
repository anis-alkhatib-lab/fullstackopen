const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const LEVELS = { error: 0, info: 1, debug: 2 };

const shouldLog = (level) => LEVELS[level] <= LEVELS[LOG_LEVEL];

const info = (...params) => {
  if (shouldLog('info')) console.log(...params);
};

const error = (...params) => {
  if (shouldLog('error')) console.error(...params);
};

const debug = (...params) => {
  if (shouldLog('debug')) console.log(...params);
};

module.exports = { info, error, debug };
