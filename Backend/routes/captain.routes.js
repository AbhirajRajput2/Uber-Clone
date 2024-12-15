const express = require('express')
const router = express.Router();
const {body} = require('express-validator')
const captainController = require('../controllers/captain.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be of at least 3 character'),
    body('password').isLength({min:6}).withMessage('Password must be of at least 6 character'),
    body('vehicle.color').isLength({min:3}).withMessage('Vehicle color must be of arleast letter 3'),
    body('vehicle.plate').isLength({min:3}).withMessage('Vehicle plate must be of arleast letter 3'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Vehicle capacity must be of arleast 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type'),
],captainController.captainRegister)


router.post("/login",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be of at least 6 character'),
],captainController.captainLogin)

router.get("/profile",authMiddleware.authCaptain,captainController.captainProfile);
router.get("/logout",authMiddleware.authCaptain,captainController.captainLogout);
module.exports=router;