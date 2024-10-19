import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import authRouter from './Routes/auth.js'
import userRouter from './Routes/user.js'
import mentorRouter from './Routes/mentor.js'
import reviewRoute from './Routes/review.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
  origin: true
}

app.get('/', (req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`)
  res.send("Working")
})

mongoose.set('strictQuery', false)
const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // })
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB database is connected')
  } catch (err) {
    console.error('MongoDB database is not connected', err)
  }
}

// Call the connectDB function to establish the database connection
connectDB()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

// Routers
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/mentors', mentorRouter)
app.use('/api/v1/reviews', reviewRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})