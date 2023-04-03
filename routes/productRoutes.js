const express = require('express');
const productModels = require('../models/productModels');
const app = express();

// add data
app.post('/product', async(req, res) => {
  const user = new productModels(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = app;