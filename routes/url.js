const express = require("express");
const { getNewShortUrl, getAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", getNewShortUrl);

router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
