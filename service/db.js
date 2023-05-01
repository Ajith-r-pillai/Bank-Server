const mongoose=require("mongoose")

// mongoose.connect('mongodb://localhost:27017/bankServer',{useNewUrlParser:true})
mongoose.connect('mongodb://127.0.0.1:27017/bankServer',{useNewUrlParser:true})

// model creation (moder name must be singular of collection name and first letter capital)
const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transation:[]
})

module.exports={
    User
}     