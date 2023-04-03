const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String
  },
  productPrice: {
    type: Number
  },
  productQuantity: {
    type: Number
  },
});
const Product = mongoose.model('product', ProductSchema);
module.exports = Product;