const mongoose = require('mongoose')
const {Schema} = mongoose
const PostSchema = new Schema({
    CategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    AuthorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Author"
    },
    Title:{
        type:String
    },
    Description:{
        type:String
    },
    Caption:{
        type:String
    },
    Status:{
        type:String
    },
    Img:[],
 
},{
    timestamps:true
})

module.exports = mongoose.model("Post",PostSchema)