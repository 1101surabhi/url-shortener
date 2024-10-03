const express = require("express");
const connectDB = require("./connection");
const URL = require("./models/url");
const urlRoute = require("./routes/url");

connectDB();

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId
  const shortUrl = await URL.findOneAndUpdate({shortId}, {
    $push: { visitHistory: { timestamp: Date.now() } },
  });
  return res.redirect(shortUrl.redirectUrl);
});

app.listen(PORT || process.env.PORT, () => console.log("Server started"));
