const express = require('express')
const router = express.Router()

//Handlers from controllers
const {login, signup,forgetPassword} = require("../controllers/auth")

router.post('/login', login)
router.post('/signup', signup)



module.exports = router