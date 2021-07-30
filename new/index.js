const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./model/product');
const { urlencoded } = require('express');
const methodOverride = require('method-override');
mongoose.connect('mongodb://localhost:27017/farm', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {
    console.log("Successful");
})
.catch(err => {
    console.log("error",err);
})

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/products',async(req,res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index',{products}) 
})

app.get('/products/new', async(req,res)=>{
    res.render('products/new')
})

app.post('/products', async(req,res)=>{
    // console.log(req.body)
    // res.send('making product')
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async(req,res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    console.log(product);
    res.render('products/show',{product})
})

app.get('/products/:id/edit', async(req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit',{product})
})

app.put('/products/:id', async(req,res) => {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id,req.body, {runValidators: true, new: true})
    res.redirect(`${product._id}`)
})

app.delete('/products/:id', async(req,res) =>{
    // res.send("deleted")
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(3000,() =>{
    console.log("App is listnening on 3000"); 
})