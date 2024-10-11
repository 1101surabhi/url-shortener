const User = require("../models/user");
// const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Invalid user data provided." });
  const user = await User.create({
    name: username,
    email: email,
    password: password,
  });

  if (!user)
    return res
      .status(500)
      .json({ message: "Some error occurred while creating user." });

  return res.redirect("/");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400);
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid email or password",
    });

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
};

module.exports = {
  signup,
  loginUser,
};
