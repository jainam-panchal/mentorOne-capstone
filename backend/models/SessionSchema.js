import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    mentor: {
      type: mongoose.Types.ObjectId,
      ref: "Mentor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionPrice: { type: String, required: true },
    sessionDate: {
      type: Date,
      // required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    meetingUrl: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

sessionSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'mentor',
    select: 'name'
  });
  next();
});


export default mongoose.model("Session", sessionSchema);  