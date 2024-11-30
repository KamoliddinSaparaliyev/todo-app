const errorHandler = (err, req, res, next) => {
  console.error(err);
  const { status = 500, message = "Something went wrong" } = err;
  return res.status(status).json({ message });
};

module.exports = errorHandler;
