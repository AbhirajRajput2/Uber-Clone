const mongoose=require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const captainSchema = mongoose.Schema({

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
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[6,'password must be of 6 or more letters'],

    },
    socketId:{
        type:String,
    },

    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },

    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3 ,'color must be of 3 or more letters'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3 ,'plate must be of 3 or more letters'],
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1 ,'capacity must be of 1 or more '],
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto'],
        }
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password); 
};


captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}

const captainModel = mongoose.model('captain',captainSchema);

module.exports=captainModel;