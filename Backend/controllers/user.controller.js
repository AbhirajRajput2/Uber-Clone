const userModel = require('../db/models/user.model')
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const blacklistTokenModel = require('../db/models/blacklistToken.model')


module.exports.userRegister = async (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    let {fullname,email,password}=req.body;

    const isUserAlreadyExist = await userModelModel.findOne({email});

    if(isUserAlreadyExist){
        return res.status(400).json({error:"user Already exists"});
    }
    
    let hashedPassword=await userModel.hashPassword(password);

    let user = await userService.createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword,
        })
   
        console.log(user);

    let token = user.generateAuthToken();

    res.status(200).json({"status":"User registered succesfully",token,user});
}

module.exports.userLogin = async (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { email, password } = req.body;

        let user = await userModel.findOne({email}).select('+password');
        
        if(!user){
            return res.status(401).json("Invalid email or password");
        }

        let isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json("Invalid email or password");
        }

        const token = user.generateAuthToken();

        res.cookie('token',token);
        


        res.status(200).json({"status":"User login succesfully",token,user});


};

module.exports.getUserProfile=async (req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.userLogout = async (req,res,next)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message:"Logges out sucessfully"});
}