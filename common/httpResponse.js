const baseResponse = {
  statusCode: 200,
  statusMessage: 'Ok',
  payload: null,
  errorMessage: null,
  validationErrors: [],
};

exports.ok = (payload) => ({ ...baseResponse.errorMessage, payload });

exports.created = (payload) => ({
  ...baseResponse,
  statusCode: 201,
  statusMessage: 'Created',
  payload,
});

exports.accepted = () => ({
  ...baseResponse,
  statusCode: 202,
  statusMessage: 'Accepted',
});

exports.badRequest = (fields, errorMessage = 'Validation errors') => ({
  ...baseResponse,
  statusCode: 400,
  statusMessage: 'Bad_Request',
  errorMessage,
  validationErrors: fields,
});

exports.unauthorized = (message) => ({
  ...baseResponse,
  statusCode: 401,
  statusMessage: 'Unauthorized',
  errorMessage: message,
});

exports.forbidden = (message = 'Additional permissions required') => ({
  ...baseResponse,
  statusCode: 403,
  statusMessage: 'Forbidden',
  errorMessage: message,
});

exports.notFound = (message = 'Resource cannot be found') => ({
  ...baseResponse,
  statusCode: 404,
  statusMessage: 'Not_Found',
  errorMessage: message,
});

exports.conflict = (message = 'Entity already exists') => ({
  ...baseResponse,
  statusCode: 409,
  statusMessage: 'Conflict',
  errorMessage: message,
});

exports.unprocessableEntity = (
  fields,
  message = 'Provided entity cannot be processed due to validation errors'
) => ({
  ...baseResponse,
  statusCode: 422,
  statusMessage: 'Unprocessable_Entity',
  errorMessage: message,
  validationErrors: fields,
});

exports.internalServerError = (message) => ({
  ...baseResponse,
  statusCode: 500,
  statusMessage: 'Internal_Server_Error',
  errorMessage: message,
});
