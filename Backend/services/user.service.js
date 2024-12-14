const userModel = require('../db/models/user.model')

module.exports.createUser = async({firstname,lastname,email,password})=>{
    try{
        if(!firstname||!email||!password){
            throw new Error('All fields are required');
        }
        const user =await userModel.create({
            fullname:{
                firstname,
                lastname,
            },
            email,
            password,
        })
    
        return user;
    }
    catch(err){
        return err;
    }
}