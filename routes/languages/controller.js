const LanguageModel = require('../../models/Language');

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
  if (req.query.name) filters.name = new RegExp(`.*${req.query.name}.*`, 'i');
  if (req.query.page) options.page = req.query.page;
  if (req.query.pageSize) options.limit = req.query.pageSize;
  if (req.query.sortBy || req.query.sortOrder) {
    options.sort = {
      [req.query.sortBy || sortBy]: req.query.sortOrder || sortOrder,
    };
  } else {
    options.sort = { [sortBy]: sortOrder };
  }

  const lists = await LanguageModel.paginate(filters, options);
  return res.Ok(lists);
};

exports.post = async (req, res) => {
  // TODO
  // Validate inputs

  // Verify language does not exist
  const foundLanguage = await LanguageModel.findOne({ name: req.body.name });
  if (foundLanguage)
    return res.Conflict(`Language '${req.body.name}' already exists`);

  // Create new language
  const newLanguage = await new LanguageModel(req.body).save();
  return res.Created(newLanguage);
};

// TODO
exports.patch = async (req, res) => {};

exports.delete = async (req, res) => {
  // TODO:
  // Validate inputs
  const { languageId } = req.params;

  // Verify language does exist
  const foundLanguage = await LanguageModel.findById(languageId);
  if (!foundLanguage)
    return res.NotFound(`Language '${languageId}' cannot be found`);

  // Delete language
  const removedLanguage = await LanguageModel.findByIdAndDelete(languageId);
  return res.Ok(removedLanguage?.id);
};
