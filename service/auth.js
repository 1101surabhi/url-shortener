const jwt = require("jsonwebtoken");
const secretKey = "anyrandomstring";

const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretKey
  );
};

const getUser = (token) => {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

module.exports = {
  setUser,
  getUser,
};
