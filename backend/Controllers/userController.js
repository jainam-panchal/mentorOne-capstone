import User from "../models/UserSchema.js";
import Session from "../models/SessionSchema.js"
import Mentor from "../models/MentorSchema.js"


export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true }).select("-password");
    res.status(200).json({ success: true, message: 'Successfully Updated', data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to Update' });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Successfully Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed To Delete' });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({ success: true, message: 'User Found', data: user });
  } catch (error) {
    res.status(404).json({ success: false, message: 'No User Found' });
  }
};

export const getAllUser = async (res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ success: true, message: 'Users Found', data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed To Fetch Users' });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({ success: true, message: 'Profile info is getting fetched', data: { ...rest } });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong. Couldn\'t fetch user profile' });
  }
};

export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.userId });

    const mentorIds = sessions.map(el => el.mentor.id);

    const mentors = await Mentor.find({ _id: { $in: mentorIds } }).select('-password');

    res.status(200).json({ success: true, message: 'Sessions are getting fetched', data: mentors });

  } catch (err) {
    return res.status(500).json({ success: false, message: 'Something went wrong. Couldn\'t fetch sessions' });
  }
};