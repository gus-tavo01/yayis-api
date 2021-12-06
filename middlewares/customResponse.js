const httpResponse = require('../common/httpResponse');
const httpVerbs = require('../common/constants/httpVerbs');
const capitalize = require('../common/utils/capitalize');

module.exports = (req, res, next) => {
  // inject http method into express res object
  httpVerbs.forEach((method) => {
    res[capitalize(method)] = (x, y) => {
      const response = httpResponse[method](x, y);
      res.status(response.statusCode).json(response);
    };
  });

  next();
};
