const express = require('express');
const productModels = require('../models/productModels');
const app = express();

app.get('/', (req, res) => {
  res.render('products/addOrEdit', {
      viewTitle: "Danh sách sản phẩm"
  })
})

// add data
app.post('/add', async(req, res) => {
  console.log("co gia tri: ", req.body);
  if (req.body.id == "") {
      //add 
      addProduct(req, res);
  } else {
      //sua
      updateProduct(req, res);
  }
})


function addProduct(req, res) {
  const product = new productModels(req.body);
  try {
      product.save();
      res.render('products/addOrEdit', {
          viewTitle: "Thêm sản phẩm"
      })
  } catch (err) {
      res.status(500).send(err);
  }
}

function updateProduct(req, res) {
  productModels.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true })
      .then(updateProduct => {
          console.log('Updated user:', updateProduct);
          res.redirect('/product/list')
      })
      .catch(err => {
          console.error('Error updating:', err);
      })
}


//get
app.get('/list', async(req, res) => {
  productModels.find({}).then(products => {
      res.render('products/viewProduct', {
          products: products.map(products => products.toJSON())
      })
  })
})

//lay ra du lieu muon edit
app.get('/edit/:id', async(req, res) => {
  await productModels.findById(req.params.id).then(product => {
          res.render('products/addOrEdit', {
            product: product.toJSON(),
              viewTitle: "Chỉnh sửa sản phẩm"
          })
          console.log("Data: ", product);
      })
      .catch(err => {
          console.error("err: ", err);
      })
})

//delete
app.get('/delete/:id', async(req, res) => {
  try {
      const product = await productModels.findByIdAndDelete(req.params.id, req.body);
      if (!product) {
          res.status(404).send("Khong co user de xoa");
      } else {
          res.redirect('/product/list')
      }
  } catch (err) {
      res.status(500).send(err);
  }
})




module.exports = app;