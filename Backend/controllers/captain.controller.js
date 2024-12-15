const captainModel = require("../db/models/captain.model")
const captainService = require('../services/captain.service')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const blacklistTokenModel = require("../db/models/blacklistToken.model")

module.exports.captainRegister = async(req,res,next)=>{

    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password,vehicle}=req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({error:"Captain Already exists"});
    }

    let hashedpassword = await captainModel.hashPassword(password);

    let captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedpassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType,
    })
    const token = captain.generateAuthToken();

    res.status(200).json({status:"Captain registered suceessfully",captain,token})
}

module.exports.captainLogin = async(req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    let {email,password} = req.body;

    let captain = await captainModel.findOne({email}).select('+password');
    
    if(!captain){
        return res.status(400).json("Invalid email or password");
    }

    let isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(400).json("Invalid email or password");
    }


    const token = captain.generateAuthToken();
    res.cookie('token',token);

    res.status(200).json({status:"Captain loggin sucessfully",token,captain});
}

module.exports.captainProfile = async(req,res,next)=>{
    res.status(200).json({captain:req.captain});
}

module.exports.captainLogout = async(req,res,next)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({status:"Logout sucessfully done"});
}