const mongoose = require('mongoose')
const {Schema} = mongoose
const BookmarkSchema = new Schema({
    PostId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    ReaderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reader"
    },
    Status:{
        type:String
    },
  
},{
    timestamps:true
})

module.exports = mongoose.model("Bookmark",BookmarkSchema)