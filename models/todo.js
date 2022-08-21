const mongoose=require('mongoose');
const todolistSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});
const todo=mongoose.model('todo',todolistSchema);
module.exports=todo;