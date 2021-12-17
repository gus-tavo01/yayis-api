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

exports.patch = async (req, res) => {
  // Validate inputs
  const { themeId } = req.params;

  // Verify if exist
  const foundTheme = await ThemeModel.findById(themeId, null, { lean: true });
  if (!foundTheme)
    return res.NotFound(`Theme with id '${themeId}' is not found`);

  // TODO
  // Validate permissions

  // Create patch obj
  const patch = { ...req.body };

  if (req.body.palette) {
    patch.palette = {
      ...foundTheme.palette,
      ...req.body.palette,
    };
  }

  // Update theme
  const updatedTheme = await ThemeModel.findByIdAndUpdate(themeId, patch, {
    new: true,
  });
  return res.Ok(updatedTheme);
};

exports.delete = async (req, res) => {
  // TODO
  // Validate inputs
  const { themeId } = req.params;

  // Verify if exist
  const foundTheme = await ThemeModel.findById(themeId);
  if (!foundTheme)
    return res.NotFound(`Theme with id '${themeId}' is not found`);

  // TODO
  // Validate user permissions

  // Delete theme
  const deleted = await ThemeModel.findByIdAndDelete(themeId);
  return res.Ok(deleted.id);
};
