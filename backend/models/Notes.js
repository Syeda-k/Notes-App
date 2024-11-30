const mongoose=require('mongoose')
const { Schema } = mongoose;

const NotesSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:'General'
    
    },
    date:{
        type:Date,
        default:Date.now
    }
    
})
const User=mongoose.model('user', NotesSchema)
User.createIndexs();

module.exports=User;