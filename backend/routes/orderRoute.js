import express from 'express';
import { placeOrderMpesa, mpesaCallback } from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// User triggers the STK push
orderRouter.post('/mpesa', authUser, placeOrderMpesa);

// Safaricom sends the result here (No authUser middleware needed as it comes from Safaricom)
orderRouter.post('/mpesa-callback', mpesaCallback);

export default orderRouter;