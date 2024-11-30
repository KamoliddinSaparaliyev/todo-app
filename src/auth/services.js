const jwt = require("jsonwebtoken");
const User = require("../users/model");
const { BadRequestError } = require("../error/commonErrors");

exports.registerUser = async (data) => {
  const { email } = data;
  
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new BadRequestError("Email already exist");
  }
  const user = new User(data);
  await user.save();
  
  const token = generateToken(user);
  
  return { token };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new BadRequestError("Invalid email or password");
  }

  const token = generateToken(user);

  return { token };
};

function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
