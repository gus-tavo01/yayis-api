const UserModel = require('../../models/User');
const ThemeModel = require('../../models/Theme');
const LanguageModel = require('../../models/Language');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const defaults = require('../../common/constants/defaults');

exports.get = async (req, res) => {
  // TODO:
  // Validate inputs

  // TODO:
  // handle params
  const users = await UserModel.paginate();
  return res.Ok(users);
};

exports.post = async (req, res) => {
  // TODO:
  // Validate inputs

  const { email, password } = req.body;

  // Verify user does not already exists
  const foundUser = await UserModel.findOne({ email });
  if (foundUser) return res.Conflict('Email is already in use');

  // Hash incoming password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Get default theme
  const foundTheme = await ThemeModel.findOne({ code: defaults.theme });

  if (!foundTheme) {
    return res.UnprocesableEntity('Theme cannot be added');
  }

  // Get default language
  const foundLanguage = await LanguageModel.findOne({
    code: defaults.language,
  });

  if (!foundLanguage) {
    return res.UnprocesableEntity('Language cannot be added');
  }

  // Create new user
  const newUser = await new UserModel({
    email,
    passwordHash,
    configuration: { theme: foundTheme.id, language: foundLanguage.id },
  }).save();

  return res.Created(newUser);
};

// TODO
exports.passwordReset = async (req, res) => {};

exports.login = async (req, res) => {
  // TODO
  // Validate inputs

  // Verify user exist
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) return res.Unauthorized('Invalid login credentials');

  // Step verify password match
  const passwordMatch = await bcrypt.compare(password, foundUser.passwordHash);
  if (!passwordMatch) return res.Unauthorized('Invalid login credentials');

  // Generate access token
  const secret = process.env.JWT_SECRET;
  const tokenExpiration = '2h';
  const token = jsonwebtoken.sign(
    { iat: Date.now(), sub: foundUser.id },
    secret,
    { expiresIn: tokenExpiration }
  );

  return res.Ok({ token, expiration: tokenExpiration });
};

exports.getById = async (req, res) => {
  // TODO
  // Validate inputs
  const { userId } = req.params;

  // Get whole user
  const user = await UserModel.findById(userId)
    .populate('configuration.theme')
    .populate('configuration.language');

  // User is not found
  if (!user) return res.NotFound(`User with id ${userId} cannot be found`);
  return res.Ok(user);
};

exports.patch = async (req, res) => {
  // TODO:
  // Validate inputs

  const { userId } = req.params;

  // Verify user exist
  const foundUser = await UserModel.findById(userId, null, { lean: true });
  if (!foundUser) return res.NotFound(`User with id ${userId} cannot be found`);

  // Create patch object
  const patch = { ...req.body };

  if (req.body.configuration) {
    patch.configuration = {
      ...foundUser.configuration,
      ...req.body.configuration,
    };
  }

  // Update user theme, language, isDisabled?
  const updated = await UserModel.findByIdAndUpdate(userId, patch, {
    new: true,
  });

  return res.Ok(updated);
};

// TODO
exports.delete = async (req, res) => {
  // Validate inputs
  // Verify user exists
  // mark user as isDisabled -> true
};
