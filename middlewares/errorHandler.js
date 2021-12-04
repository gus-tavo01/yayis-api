const httpResponse = require('../common/httpResponse');

module.exports = (err, req, res, next) => {
  const response = httpResponse.internalServerError(err.message);
  res.status(response.statusCode).json(response);
};
