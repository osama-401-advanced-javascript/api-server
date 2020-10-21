'use strict';

const express = require('express');
const router = express.Router();
const categoriesModel = require('../lib/models/categories/categories.model.js');
const productsModel = require('../lib/models/products/products.model.js');


router.param('model', getModel);

router.get('/:model', getAllHandler);
router.get('/:model/:id', getOneHandler);
router.post('/:model', createHandler);
router.put('/:model/:id', updateHandler);
router.delete('/:model/:id', deleteHandler);



function getModel(req, res, next) {
    const model = req.params.model;
    // console.log('__MODEL__', model);
    switch (model) {
      case 'categories':
        req.model = categoriesModel;
        break;
      case 'products':
        req.model = productsModel;
        break;
      default:
        throw new Error('Invalid Model');
    }
    next();
  }


function createHandler(req,res,next){
    req.model.create(req.body).then((data)=>{

        res.status(201).json(data);
    

})
.catch(next)
}  
    
    
  function getAllHandler(req,res,next){
    req.model.get().then(data=>{

        const count = data.length;
        
        res.status(200).json({ count, data });
    })
  .catch(next)
  }
    
  function getOneHandler(req,res,next){
    let id = req.params.id;
    req.model.get(id).then(data=>{
        res.status(200).json(data[0]);
    })
    .catch(next)
  }
    
    
   

  function updateHandler(req,res,next){
    let id = req.params.id;
   
    req.model.update(id,req.body).then(()=>{
        req.model.get(id).then(data=>{
            res.status(200).json(data[0]);

        })

    })
    .catch(next)
  }
   
   
    
  
  function deleteHandler(req,res,next){
    let id = req.params.id;
    req.model.delete(id).then(()=>{
        req.model.get().then(data=>{
            let count=data.length
            res.status(201).json({count,data});

        })
    })
    .catch(next)
  }
    
  
module.exports = router;
