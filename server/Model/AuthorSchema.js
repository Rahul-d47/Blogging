const mongoose = require('mongoose')
const {Schema} = mongoose
const AuthorSchema = new Schema({
    Firstname:{
        type:String
    },
    Lastname:{
        type:String,
       
    },
    Phone:{
        type:Number
    },
    Email:{
        type:String
    },
    Password:{
        type:String
    },
    Address:{
        type:String
    },
    Profile:[],  
    Status:{
        type:String
    }
},{
 timestamps:true
})

module.exports = mongoose.model("Author",AuthorSchema)