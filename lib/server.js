'use strict';
const express = require('express');
const app = express();
const timestamp = require('../middleware/timestamp.js');
const logger = require('../middleware/logger.js');
const notFound = require('../middleware/404.js');
const errorHandler = require('../middleware/500.js');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(timestamp);
app.use(logger);
let db = []; //in memory database
//products Routes
app.post('/products', (req, res) => {
  const { name, display_name, description, category } = req.body;
  const record = { name, display_name, description, category };
  record.id = db.length + 1;
  db.push(record);
  res.status(201).json(record);
});
app.get('/products', (req, res) => {
  const count = db.length;
  const results = db;
  res.status(200).json({ count, results });
});
app.get('/products/:id', (req, res) => {
  let id = req.params.id;
  const records = db.filter((record) => record.id == id);
  res.status(200).json(records[0]);
});
app.put('/products/:id', (req, res) => {
  const { name, display_name, description, category } = req.body;
  let id = req.params.id;
  const records = db.filter((record) => record.id == id);
  //   record = { name, display_name, description, category };
  const results = records.map((value) => {
    value.id = id;
    value.name = name;
    value.display_name = display_name;
    value.description = description;
    value.category = category;
  });
  res.status(200).json(results[0]);
});
app.delete('/products/:id', (req, res) => {
  let id = req.params.id;
  const records = db.filter((record) => record.id == id);
  let results = [];
  for (let i = 0; i < db.length; i++) {
    if (db[i].id != id) {
      results.push(db[i]);
    }
  }
  db = results;
  res.status(201).json({});
});
//Categories routes
app.post('/categories', (req, res) => {
  const { name, display_name, description } = req.body;
  const record = { name, display_name, description };
  record.id = db.length + 1;
  db.push(record);
  res.status(201).json(record);
});
app.get('/categories', (req, res) => {
  const count = db.length;
  const results = db;
  res.status(200).json({ count, results });
});
app.get('/categories/:id', (req, res) => {
  let id = req.params.id;
  const records = db.filter((record) => record.id == id);
  res.status(200).json(records[0]);
});
app.put('/categories/:id', (req, res) => {
  const { name, display_name, description } = req.body;
  let id = req.params.id;
  const records = db.filter((record) => record.id == id);
  //   record = { name, display_name, description, category };
  const results = records.map((value) => {
    value.name = name;
    value.display_name = display_name;
    value.description = description;
  });
  //   let newDb = [];
  //   for (let i = 0; i < db.length; i++) {
  //     if (db[i].id != id) {
  //       newDb.push(db[i]);
  //     } else {
  //       newDb.push(results[0]);
  //     }
  //   }
  //   db = newDb;
  res.status(200).json(records[0]);
});
app.delete('/categories/:id', (req, res) => {
  let id = req.params.id;
  const records = db.filter((record) => record.id == id);
  let results = [];
  for (let i = 0; i < db.length; i++) {
    if (db[i].id != id) {
      results.push(db[i]);
    }
  }
  db = results;
  res.status(201).json({});
});
app.get('/bad', (req, res) => {
  throw new Error('a test error');
});
app.use('*', notFound);
app.use(errorHandler);
module.exports = {
  server: app,
  start: () => {
    app.listen(PORT, () => {
      console.log(`Listening to PORT ${PORT}`);
    });
  },
};