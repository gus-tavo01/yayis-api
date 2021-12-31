const ListModel = require('../../models/List');
// jsvalidator?

exports.get = async (req, res) => {
  // TODO
  // validate query params
  // use model validation (req.query)

  const filters = {};
  let sortBy = 'createDate';
  let sortOrder = 'desc';
  const options = {
    page: 1,
    limit: 20,
    sort: {},
  };

  // handle params
  if (req.query.name) filters.name = req.query.name;
  if (req.query.page) options.page = req.query.page;
  if (req.query.pageSize) options.limit = req.query.pageSize;
  if (req.query.sortBy || req.query.sortOrder) {
    options.sort = {
      [req.query.sortBy || sortBy]: req.query.sortOrder || sortOrder,
    };
  } else {
    options.sort = { [sortBy]: sortOrder };
  }

  const lists = await ListModel.paginate(filters, options);
  return res.Ok(lists);
};

exports.post = async (req, res) => {
  const { user } = req;
  const { userId: targetUserId } = req.params;
  const { name } = req.body;

  // TODO:
  // validate input body

  // verify list does not exist
  const list = await ListModel.findOne({ name });
  if (list)
    return res.Conflict(`A list with this name '${name}' already exists`);

  // TODO
  // Validate user permissions to create lists

  // Temporal aproach
  if (targetUserId !== user.id)
    return res.Forbidden('Cannot create lists for any other user');

  // create new list
  const newList = { ...req.body, userId: targetUserId };
  const createdList = await new ListModel(newList).save();
  return res.Created(createdList);
};

exports.patch = async (req, res) => {
  const { listId } = req.params;

  // TODO:
  // validate inputs

  // verify list exists
  const foundList = await ListModel.findById(listId);
  if (!foundList) res.NotFound(`Any list found with id ${listId}`);

  const patchedList = await ListModel.findByIdAndUpdate(listId, req.body, {
    new: true,
  });

  return res.Ok(patchedList);
};

exports.delete = async (req, res) => {
  const { listId } = req.params;

  // TODO:
  // validate inputs

  // verify list exist
  const foundList = await ListModel.findById(listId);
  if (!foundList) return res.NotFound(`No lists matching with id ${listId}`);

  // remove list
  const removedList = await ListModel.findByIdAndDelete(listId);
  return res.Ok(removedList?.id);
};
