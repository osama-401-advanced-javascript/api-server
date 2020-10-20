'use strict';

const express = require('express');
const categoriesrouter = express.Router();
const categoriesModel = require('../lib/models/categories/categories.model');



categoriesrouter.post('/categories', (req, res) => {
    
    
    categoriesModel.create(req.body).then((data)=>{

            res.status(201).json(data);
        

    })
  });
  categoriesrouter.get('/categories', (req, res) => {
    categoriesModel.get().then(data=>{

        const count = data.length;
        
        res.status(200).json({ count, data });
    })
  });
  categoriesrouter.get('/categories/:id', (req, res) => {
    let id = req.params.id;
    categoriesModel.get(id).then(data=>{
        res.status(200).json(data[0]);
    })
    
   
  });
  categoriesrouter.put('/categories/:id', (req, res) => {
   
    let id = req.params.id;
   
    categoriesModel.update(id,req.body).then(()=>{
        categoriesModel.get(id).then(data=>{
            res.status(200).json(data[0]);

        })

    })
    
  });
  categoriesrouter.delete('/categories/:id', (req, res) => {
    let id = req.params.id;
    categoriesModel.delete(id).then(()=>{
        categoriesModel.get().then(data=>{
            let count=data.length
            res.status(201).json({count,data});

        })
    })
    
  });
module.exports = categoriesrouter;
