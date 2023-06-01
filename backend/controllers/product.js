const Product = require('../models/product')
const fs = require('fs');

exports.createItem=(req,res,next)=>{
    const productObject = req.body
    delete productObject._id
    const product = new Product({
        ...productObject,
        userId:req.auth.userId,
        image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    product.save()
    .then(()=>res.status(201).json({message:"Produit Ajouté"}))
    .catch(error=>res.status(400).json({error}))
    ;
}

exports.getItems=(req,res,next)=>{
    Product.find()
    .then((products)=>res.status(200).json({products}))
    .catch(error=>res.status(400).json({error}))
}
exports.getOneItem=(req,res,next)=>{
    Product.findOne({ _id: req.params.id })
    .then((product)=>res.status(200).json({product}))
    .catch(error=>res.status(400).json({error}))
}
exports.deleteItem = (req, res, next) => {
    Product.findOne({ _id: req.params.id})
        .then(product => {
            if (product.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = product.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Product.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Produit supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };
 exports.updateItem= (req, res, next) =>{
    const productObject = req.file ? {
        ...req.body,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete productObject.userId;
    Product.findOne({_id: req.params.id})
        .then((product) => {
            if (product.userId != req.auth.userId) {
                res.status(401).json({ message : 'Accès interdit'});
            } else {
                const filename = product.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                Product.updateOne({ _id: req.params.id}, { ...productObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }))});
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 }
