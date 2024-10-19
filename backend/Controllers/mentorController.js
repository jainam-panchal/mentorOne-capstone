import Mentor from "../models/MentorSchema.js";
import Session from "../models/SessionSchema.js";

export const updateMentor = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedMentor = await Mentor.findByIdAndUpdate(id, { $set: req.body }, { new: true }).select("-password");
    // console.log(updatedMentor);
    res.status(200).json({ success: true, message: 'Successfully Updated', data: updatedMentor });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to Update' });
  }
};

export const deleteMentor = async (req, res) => {
  const id = req.params.id;

  try {
    await Mentor.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Successfully Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed To Delete' });
  }
};

export const getSingleMentor = async (req, res) => {
  const id = req.params.id;

  try {
    const mentorData = await Mentor.findById(id).populate('reviews').select("-password");
    res.status(200).json({ success: true, message: 'Mentor Found', data: mentorData });
  } catch (error) {
    res.status(404).json({ success: false, message: 'No Mentor Found' });
  }
};

export const getAllMentor = async (req, res) => {
  try {

    const { query } = req.query
    let mentors;

    if (query) {
      mentors = await Mentor.find({
        isApproved: 'approved',
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } }
        ]
      }).select("-password")
    } else {
      mentors = await Mentor.find({ isApproved: "approved" }).select("-password");
    }

    res.status(200).json({ success: true, message: 'Mentors Found', data: mentors });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed To Fetch Mentors' });
  }
};

export const getMentorProfile = async (req, res) => {
  const mentorId = req.userId

  try {
    const mentor = await Mentor.findById(mentorId)
    // console.log(mentor)
    if (!mentor) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const { password, ...rest } = mentor._doc
    const sessions = await Session.find({ mentor: mentorId })

    res.status(200).json({ success: true, message: 'Profile info is getting fetched', data: { ...rest, sessions } })

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong. Couldn\'t fetch user profile' })
  }
}