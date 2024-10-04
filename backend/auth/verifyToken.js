import jwt from 'jsonwebtoken'
import Mentor from '../models/MentorSchema.js'
import User from '../models/UserSchema.js'

export const authenticate = async (req, res, next) => {
  // get the token from header
  const authToken = req.headers.authorization

  // 'Bearer $actualtoken' format expected
  // then check if that's valid

  if (!authToken || !authToken.startsWith('Bearer ')) {
    // console.log("no token")
    return res.status(401).json({ success: false, message: "No Token, Authorization Denied" })
  }

  try {
    const token = authToken.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.userId = decoded.id
    req.role = decoded.role

    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token is Expired' })
    }

    return res.status(401).json({ success: false, message: 'Invalid Token' })
  }
}

export const restrict = roles => async (req, res, next) => {
  const userId = req.userId;
  let user;

  try {
    // Try to find the user in the User collection first
    user = await User.findById(userId);

    // If not found, try to find the user in the Mentor collection
    if (!user) {
      user = await Mentor.findById(userId);
    }

    // If user is still not found, return an error
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the user's role is included in the allowed roles
    if (!roles.includes(user.role)) {
      return res.status(401).json({ success: false, message: "You're not authorized" });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors that occur during the database queries
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};