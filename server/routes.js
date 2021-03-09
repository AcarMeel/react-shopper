const express = require("express");
const products = require('./products.json')

require('dotenv').config()

module.exports = function getRoutes() {
  const router = express.Router();

  router.get('/products', getProducts)
  router.get('/products/:productId', getProduct)

  return router;
};

function getProducts(req, res) {
  res.status(200).json({products})
}

function getProduct(req, res) {
  const { productId } = req.params;
  try {
    const product = products.find(product => product.id === productId);
    if (!product) throw Error(`Product ${productId} not found`)
    res.status(200).json({product})
  } catch (error) {
    res.status(404).json({message: error.message, status: 404})
  }
}