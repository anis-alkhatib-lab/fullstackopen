const errorHandler = (error, _, res, next) => {
  console.log(error.message);

  if (error.code === 11000) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      error: "malformed id",
    });
  }

  next(error);
};

module.exports = errorHandler;
