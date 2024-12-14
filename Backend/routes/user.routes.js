const express = require('express')
const router = express.Router()
const {validationResult} = require('express-validator')
const userController = require('../controllers/user.controller')
const {body} = require('express-validator')

router.post("/register",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be of at least 3 character'),
    body('password').isLength({min:6}).withMessage('Password must be of at least 3 character'),

], userController.userRegister);

module.exports=router;