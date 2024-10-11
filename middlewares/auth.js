const { getUser } = require("../service/auth");

const restrictToLoggedInUserOnly = async (req, res, next) => {
  const userId = req.cookies.uid;

  if (!userId) res.redirect("/login");

  const user = getUser(userId);

  if (!user) res.redirect("/login");

  req.user = user;
  next();
};

const checkAuth = async (req, res, next) => {
  const userId = req.cookies.uid;
  const user = getUser(userId);
  req.user = user;
  next();
};

module.exports = { restrictToLoggedInUserOnly, checkAuth };
