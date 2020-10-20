'use strict';

const express = require('express');
const productsrouter = express.Router();
const productsModel = require('../lib/models/products/products.model');


productsrouter.post('/products', (req, res) => {
    
    
    productsModel.create(req.body).then((data)=>{

            res.status(201).json(data);
        

    })
  });
  productsrouter.get('/products', (req, res) => {
    productsModel.get().then(data=>{

        const count = data.length;
        
        res.status(200).json({ count, data });
    })
  });
  productsrouter.get('/products/:id', (req, res) => {
    let id = req.params.id;
    productsModel.get(id).then(data=>{
        res.status(200).json(data);
    })
    
   
  });
  productsrouter.put('/products/:id', (req, res) => {
   
    let id = req.params.id;
   
    productsModel.update(id,req.body).then(()=>{
        productsModel.get(id).then(data=>{
            res.status(200).json(data[0]);

        })

    })
    
  });
  productsrouter.delete('/products/:id', (req, res) => {
    let id = req.params.id;
    productsModel.delete(id).then(()=>{
        productsModel.get().then(data=>{
            let count=data.length
            res.status(201).json({count,data});

        })
    })
    
  });

  module.exports = productsrouter;
