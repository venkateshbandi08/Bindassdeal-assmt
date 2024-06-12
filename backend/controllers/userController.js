const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const payload = { userId: user.id };
  const jsonToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return jsonToken;
};

// Register
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const checkUsername = await UserModel.findOne({ username });
    if (checkUsername) {
      return res.json({ msg: "Username already used", status: false });
    }
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.json({
      msg: "User Registred Successfully!",
      status: true,
      newUser,
    });
  } catch (ex) {
    next(ex);
  }
};

// Login
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    const token = createToken(user);
    return res.json({
      msg: "User LoggedIn Successfully",
      user,
      token,
      status: true,
    });
  } catch (ex) {
    next(ex);
  }
};
