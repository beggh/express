const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Successful");
})
.catch(err => {
    console.log("error",err);
})

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.post('/dog',(req,res)=>{
    res.send('WOOF!');
})

app.listen(3000,() =>{
    console.log("App is listnening on 3000"); 
})