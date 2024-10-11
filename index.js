const express = require("express");
const connectDB = require("./connection");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const path = require("path");
const {restrictToLoggedInUserOnly, checkAuth} = require("./middlewares/auth");
const cookieParser = require("cookie-parser")

connectDB();

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const shortUrl = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    }
  );
  // console.log(shortUrl.redirectUrl)
  if (!shortUrl) return res.status(404).json({ msg: "Short url not found" });
  return res.redirect(shortUrl.redirectUrl);
});

app.listen(PORT || process.env.PORT, () => console.log("Server started"));
