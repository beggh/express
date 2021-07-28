const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./model/product');
mongoose.connect('mongodb://localhost:27017/farm', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Successful");
})
.catch(err => {
    console.log("error",err);
})

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/products',async(req,res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index',{products}) 
})

app.get('/products/:id', async(req,res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    console.log(product);
    res.render('products/show',{product})
})


app.listen(3000,() =>{
    console.log("App is listnening on 3000"); 
})