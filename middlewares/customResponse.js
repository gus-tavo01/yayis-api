const httpResponse = require('../common/httpResponse');

module.exports = (req, res, next) => {
  res.Ok = (payload) => {
    const response = httpResponse.ok(payload);
    res.status(response.statusCode).json(response);
  };

  res.Created = (payload) => {
    const response = httpResponse.created(payload);
    res.status(response.statusCode).json(response);
  };

  res.Accepted = () => {
    const response = httpResponse.accepted();
    res.status(response.statusCode).json(response);
  };

  res.BadRequest = (fields, message) => {
    const response = httpResponse.badRequest(fields, message);
    res.status(response.statusCode).json(response);
  };

  res.Unauthorized = (message) => {
    const response = httpResponse.unauthorized(message);
    res.status(response.statusCode).json(response);
  };

  res.Forbidden = (message) => {
    const response = httpResponse.forbidden(message);
    res.status(response.statusCode).json(response);
  };

  res.NotFound = (message) => {
    const response = httpResponse.notFound(message);
    res.status(response.statusCode).json(response);
  };

  res.Conflict = (message) => {
    const response = httpResponse.conflict(message);
    res.status(response.statusCode).json(response);
  };

  res.UnprocessableEntity = (fields, message) => {
    const response = httpResponse.unprocessableEntity(fields, message);
    res.status(response.statusCode).json(response);
  };

  res.InternalServerError = (message) => {
    const response = httpResponse.internalServerError(payload);
    res.status(response.statusCode).json(response);
  };

  next();
};
