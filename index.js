const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Todo=require('./models/todo');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("assets"));

var todolist=[
    {
    description:"Google test",
    category:"Personal",
    date:"20/05/2023"
}];
app.get('/',function(req,res){
    Todo.find({},function(err,todoos){
        if(err){
            console.log('Error in fetching todo from db');
            return;
        } 
    return res.render('home',{
       contact_list:todoos
    });

});
});

app.post('/task',function(req,res){
   // todolist.push(req.body);
   Todo.create({
    description:req.body.description,
    category:req.body.category,
    date:req.body.date
   },function(err,newTodo){
    if(err){console.log('error');
return;}
console.log('*****',newTodo);
 return res.redirect('back');
   });
    //return res.redirect('back');
});

app.get('/delete-todo',function(req,res){

    let id=req.query.id;
   
Todo.findByIdAndDelete(id,function(err){
    if(err){
        console.log('error in deleting an object from database');
        return;
    }
    return res.redirect('back');
})


 });



app.listen(port,function(err){
    if(err){
        console.log('error');
        return;

    }
    console.log('success');
});