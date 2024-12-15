const dotenv=require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express()
const connectToDB = require("./db/db")
const userRoutes=require('./routes/user.routes')
const captainRoutes=require('./routes/captain.routes')
const cookieParser = require('cookie-parser');

connectToDB();
app.use(cookieParser()); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);

app.get('/',(req,res)=>{
    res.send("hii");
})

module.exports=app;