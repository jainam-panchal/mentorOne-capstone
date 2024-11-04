import express from 'express'
import { authenticate } from './../auth/verifyToken.js';
import { getCheckoutSession } from '../Controllers/sessionController.js';

const router = express.Router()

router.post('/checkout-session/:mentorId', authenticate, getCheckoutSession)

export default router