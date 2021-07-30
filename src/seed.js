
const mongoose = require('mongoose');
const Product = require('./model/product');
mongoose.connect('mongodb://localhost:27017/farm', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Successful");
})
.catch(err => {
    console.log("error",err);
})

// const p = new Product({
//     name: 'apple',
//     price: 10
// })

// p.save()
//     .then(p =>{
//         console.log(p);
//     })
//     .catch(e =>{
//         console.log(e);
//     })

const seedProds = [
    {
        name: 'apple',
        price: 10
    },
    {
        name: 'mango',
        price: 20
    },
    {
        name: 'apricot',
        price: 30
    },
    {
        name: 'dragonfruit',
        price: 40
    }
]
// db.Product.ensureIndex({name:1},{unique: true, dropDups: true})

Product.insertMany(seedProds)
.then(res => console.log(res)
)
.catch(e => console.log(e))