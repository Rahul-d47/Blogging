const mongoose = require('mongoose')
const {Schema} = mongoose
const AdminSchema = new Schema({
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Password:{
        type:String
    }
})

module.exports = mongoose.model("Admin",AdminSchema)