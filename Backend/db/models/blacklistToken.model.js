const mongoose = require('mongoose')

const blacklistTokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:84000, //24 hours in second
    },

})

module.exports = mongoose.model('BlacklistToken',blacklistTokenSchema); 