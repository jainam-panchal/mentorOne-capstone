import mongoose from "mongoose";
import Mentor from "./MentorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    mentor: {
      type: mongoose.Types.ObjectId,
      ref: "Mentor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (mentorId) {
  const stats = await this.aggregate([
    {
      $match: { mentor: mentorId }
    },
    {
      $group: {
        _id: '$mentor',
        numOfRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    },
    {
      $project: {
        numOfRating: 1,
        avgRating: { $round: ['$avgRating', 1] }
      }
    }
  ]);

  console.log(stats);

  if (stats.length > 0) {
    await this.model('Mentor').findByIdAndUpdate(mentorId, {
      totalRating: stats[0].numOfRating,
      averageRating: stats[0].avgRating,
    });
  } else {
    await this.model('Mentor').findByIdAndUpdate(mentorId, {
      totalRating: 0,
      averageRating: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.mentor)
})

export default mongoose.model("Review", reviewSchema);