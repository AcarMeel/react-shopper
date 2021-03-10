const express = require("express");
const products = require('./products.json')
const { validateCartItems } = require('use-shopping-cart/src/serverUtil')

require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_API_SECRET)

module.exports = function getRoutes() {
  const router = express.Router();

  router.get('/products', getProducts)
  router.get('/products/:productId', getProduct)
  router.post('/checkout-sessions', createCheckoutSession)

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

async function createCheckoutSession(req, res) {
    try {
      const cartItems = req.body;
      const line_items = validateCartItems(products, cartItems)

      const origin = process.env.NODE_ENV === 'production' ? req.headers.origin : 'http://localhost:3000'

      const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['US', 'CR']
        },
        line_items,
        success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: origin,
        mode: 'payment'
      }

      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession)
    } catch (error) {
      res.status(500).json({message: error.message, status: 500})
    }
}