const userModel = require('../db/models/user.model')
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

module.exports.userRegister = async (req,res,next)=>{
  try{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    let {fullname,email,password}=req.body;
    let hashedPassword=await userModel.hashPassword(password);

    let user = await userService.createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword,
        })
   

    let token = user.generateAuthToken();

    res.status(200).json({"status":"User registered succesfully",token,user});
  }
  catch(err){
    return res.status(400).json(err);
  }
}