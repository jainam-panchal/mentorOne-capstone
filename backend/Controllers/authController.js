import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from "../models/UserSchema.js"
import Mentor from "../models/MentorSchema.js"


const generateToken = user => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: '24h'
  })
}

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender, bio, about } = req.body

  try {

    let user = null

    if (role === 'student') {
      user = await User.findOne({ email })
    } else if (role === 'mentor') {
      user = await Mentor.findOne({ email })
    }

    // if user exists
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    if (role === 'student') {
      user = new User({
        name, email, password: hashPassword, photo, gender, role
      })
    }

    if (role === 'mentor') {
      user = new Mentor({
        name, email, password: hashPassword, photo, gender, role, isApproved: "approved", bio, about
      })
    }

    await user.save()

    res.status(200).json({ success: true, message: 'User successfully created' })
  } catch (error) {
    // console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error, Try again' })
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = null

    const studentObj = await User.findOne({ email })
    const mentorObj = await Mentor.findOne({ email })

    if (studentObj) {
      user = studentObj
    }

    if (mentorObj) {
      user = mentorObj
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return res.status(404).json({ message: "Invalid Credentials" })
    }

    const token = generateToken(user)

    const { password: userPassword, role, sessions, ...rest } = user._doc
    // console.log(user)

    res.status(200).json({
      status: true,
      message: "Login Success",
      token,
      data: { ...rest },
      role,
    })

  } catch (error) {
    // console.log(error)
    return res.status(500).json({ status: false, message: "Failed to login" })
  }
}