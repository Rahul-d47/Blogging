const mongoose = require('mongoose')
const {Schema} = mongoose
const CategorySchema = new Schema({
    Catname:{
        type:String
    },
    Status:{
        type:String
    },
},{
    timestamps:true
})

module.exports = mongoose.model("Category",CategorySchema)