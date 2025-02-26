const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be of 3 or more letters'],
        },
        lastname:{
            type:String,
            minlength:[3 ,'last name must be of 3 or more letters'],
        },
    },
        email:{
            type:String,
            unique:true,
            minlength:[5,'First name must be of 3 or more letters'],
        },
        password:{
            type:String,
            required:true,
            select:false,
        },
        socketId:{
            type:String, 
        }
    }
)


userSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password); 
};


userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;