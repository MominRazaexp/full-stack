import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';
import { createCheckoutSession } from '../controllers/checkoutController.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/create-checkout-session', createCheckoutSession);

router.get('/hello', (req, res) => {
  res.json({ message: "Hello from Backend!" });
});

export default router;