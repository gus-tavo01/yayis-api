const ThemeModel = require('../../models/Theme');
const paginate = require('../../common/utils/paginate');

exports.get = async (req, res) => {
  // Validate inputs

  // Handle query parameters
  const filters = {};
  const options = paginate(req.query);

  if (req.query.name) filters.name = req.query.name;
  if (req.query.type) filters['palette.type'] = req.query.type;

  // Get themes
  const themes = await ThemeModel.paginate(filters, options);
  return res.Ok(themes);
};

exports.post = async (req, res) => {
  // TODO
  // Validate inputs

  // Verify does not exist
  const foundTheme = await ThemeModel.findOne({ name: req.body.name });
  if (foundTheme)
    return res.Conflict(
      `There is an existing theme withi the provided name: ${req.body.name}`
    );

  // Insert new theme
  const newTheme = await new ThemeModel(req.body).save();
  return res.Created(newTheme);
};

// TODO
exports.patch = async (req, res) => {};

// TODO
exports.delete = async (req, res) => {};
