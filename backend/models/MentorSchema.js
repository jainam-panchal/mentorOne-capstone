import mongoose from 'mongoose'

const mentorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  role: {
    type: String
  },
  photo: {
    type: String
  },
  // Only for mentors
  specialization: {
    type: String
  },
  sessionPrice: {
    type: Number
  },
  timeSlots: {
    type: Array
  },
  qualifications: {
    type: Array
  },
  experiences: {
    type: Array
  },
  yearsOfExp: {
    type: Number,
    default: 0
  },
  
  bio: {
    type: String,
    maxLength: 50
  },
  about: {
    type: String
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  totalRating: {
    type: Number,
    default: 0
  },
  isApproved: {
    type: String,
    enum: ['pending', 'approved', 'cancelled'],
    default: 'pending'
  },
  sessions: [{ type: mongoose.Types.ObjectId, ref: "Session" }]
})



export default mongoose.model("Mentor", mentorSchema)