const mongoose = require('mongoose')
const {Schema} = mongoose
const ReaderSchema = new Schema({
    Firstname:{
        type:String
    },
    Lastname:{
        type:String
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
    Profile:[],
    Address:{
        type:String
    },
    Status:{
        type:String
    }
},{
 timestamps:true
})

module.exports = mongoose.model("Reader",ReaderSchema)