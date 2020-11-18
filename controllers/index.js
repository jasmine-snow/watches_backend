const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Product = require("../models/products");



// Seeds Data
router.get('/seed', async (req, res) => {
    const products = 
    [
        {
          "name": "Product 001",
          "imgURL": "https://www.mvmt.com/dw/image/v2/BDKZ_PRD/on/demandware.static/-/Sites-mgi-master/default/dw59410f08/images/products/BT01-BLUS_fr.jpg?sw=512&sh=512",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "price": "250"
        },
        {
          "name": "Product 002",
          "imgURL": "https://www.mvmt.com/dw/image/v2/BDKZ_PRD/on/demandware.static/-/Sites-mgi-master/default/dwe4487569/images/products/28000096_fr.jpg?sw=512&sh=512",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
          "price": "200"
        },
        {
          "name": "Product 003",
          "imgURL": "https://www.mvmt.com/dw/image/v2/BDKZ_PRD/on/demandware.static/-/Sites-mgi-master/default/dwd0b0e6d3/images/products/28000108_fr.jpg?sw=512&sh=512",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "price": "180"
        }
    ]    

    try {
        const seedItems = await Product.create(products);
        res.send(seedItems);
    }
    
    catch (err) {
        res.send(err.message);
    }
})

// Index: Getting all product
router.get('/', (req, res) => {
    Product.find({}, (err, foundProduct) => {
        res.json(foundProduct);
    })
})


module.exports = router;