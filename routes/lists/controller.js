const ListsModel = require('../../models/List');
// jsvalidator?

exports.get = async (req, res) => {
  const filters = { ...req.query };
  const options = {
    page: 1,
  };

  // handle params
  if (req.query.pageSize) options.limit = req.query.pageSize;

  // TODO
  // validate query params
  // use model validation (filters)
  // validate apart options obj

  const lists = await ListsModel.paginate(filters, options);
  return res.Ok(lists);
};

exports.post = async (req, res) => {};

exports.patch = async (req, res) => {};

exports.delete = async (req, res) => {};
