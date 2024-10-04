import express from 'express'

import { getAllReviews, createReview } from '../Controllers/reviewController.js'
import { authenticate, restrict } from '../auth/verifyToken.js'

const router = express.Router({mergeParams: true})

// possible hit would be /mentor/mentorId/reviews so we need nested routes

router.route('/').get(getAllReviews).post(authenticate, restrict(['student']), createReview)

export default router;