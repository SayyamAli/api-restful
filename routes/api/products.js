const express = require('express');
let router = express.Router();

var {product} = require("../../models/product");
const validateProduct = require('../../middlewares/validateProducts');
// get all products 
router.get("/",async(req,res) =>{
    let products = await product.find();
    return res.send(products);
});
// get single products
router.get("/:id",async(req,res) =>{
    try {
        let single_prod = await product.findById(req.params.id);
        if(!single_prod) return res.status(400).send("product with given id is not present");
        return res.send(single_prod);
    } catch (err) {
        return res.status(400).send("invalid id");
    }
});

router.put("/:id",validateProduct,async(req,res)=>{
    let updated_product  = await product.findById(req.params.id);
    updated_product.name = req.body.name;
    updated_product.price = req.body.price;
    await updated_product.save();
    return res.send(updated_product);
});

router.delete("/:id",async(req,res)=>{
    let del_product  = await product.findByIdAndDelete(req.params.id);
    return res.send("product deleted");
});

router.post("/",validateProduct,async(req,res)=>{
    
    let new_product = new product();
    new_product.name = req.body.name;
    new_product.price = req.body.price;
    await new_product.save();
    return res.status(200).send(new_product);
});

module.exports = router;
