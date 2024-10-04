import express from 'express';

import { getSingleMentor, deleteMentor, updateMentor, getAllMentor, getMentorProfile } from '../Controllers/mentorController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';
import reviewRouter from './review.js'

const router = express.Router();

// nested route
router.use('/:mentorId/reviews', reviewRouter)

router.get("/", getAllMentor)
router.get("/:id", getSingleMentor)
router.put("/:id", authenticate, restrict(['mentor']), updateMentor)
router.delete("/:id", authenticate, restrict(['mentor']), deleteMentor)
router.get("/profile/me", authenticate, restrict(['mentor']), getMentorProfile)

export default router