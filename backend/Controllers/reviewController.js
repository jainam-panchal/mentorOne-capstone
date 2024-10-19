import Review from '../models/ReviewSchema.js'
import Mentor from '../models/MentorSchema.js'

// get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
    res.status(200).json({ success: true, message: 'Reviews fetched successfully', data: reviews })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews', error: err.message })
  }
}

// create review
export const createReview = async (req, res) => {
  if (!req.body.mentor) req.body.mentor = req.params.mentorId
  if (!req.body.user) req.body.user = req.userId

  const newReview = new Review(req.body)
  // console.log(req.userId, req.params.mentorId)
  try {
    const savedReview = await newReview.save()
    await Mentor.findByIdAndUpdate(req.params.mentorId, {
      $push: { reviews: savedReview._id }
    })

    res.status(200).json({ success: true, message: 'Review submitted successfully', data: savedReview })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to submit review', error: err.message })
  }
}