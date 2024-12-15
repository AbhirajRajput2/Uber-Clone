const captainModel = require("../db/models/captain.model")
const captainService = require('../services/captain.service')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')

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