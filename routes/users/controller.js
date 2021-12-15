const UserModel = require('../../models/User');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

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

  // Create new user
  const newUser = await new UserModel({ email, passwordHash }).save();

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

// TODO
exports.patch = async (req, res) => {
  // Validate inputs
  // Verify user exist
  // update user theme, language, darkMode, isDisabled?
};

// TODO
exports.delete = async (req, res) => {
  // Validate inputs
  // Verify user exists
  // mark user as isDisabled -> true
};
