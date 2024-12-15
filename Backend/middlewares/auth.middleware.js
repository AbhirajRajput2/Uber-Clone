const userModel  = require('../db/models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../db/models/blacklistToken.model');
const captainModel = require('../db/models/captain.model');

module.exports.authUser = async (req, res, next) => {
    console.log("req.cookies:", req.cookies); // Debug line
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token Missing' });
    }

    const isBlacklisted = await userModel.findOne({token})
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded._id);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
};

module.exports.authCaptain = async(req,res,next)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json("Unauthorized-token missing");
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json("Unauthorized access");
    }

    try{
        let decoded= jwt.verify(token,process.env.JWT_SECRET);
        req.captain = await captainModel.findById(decoded._id);
        return  next();
    } 
    catch(err){
        return res.status(400).json({err:err.message});
    }
}