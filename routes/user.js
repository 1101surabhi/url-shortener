const express = require('express')
const {signup, loginUser} = require("../controllers/user")

const router = express.Router()

router.post('/signup', signup)

router.post("/login", loginUser)

module.exports = router