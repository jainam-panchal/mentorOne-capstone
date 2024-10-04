import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'

import signup from '../assets/images/signup.svg'
import mentorPfp from '../assets/images/mentor_pfp.jpg'
import uploadImageToCloudinary from '../utils/uploadCloudinary.js'
import { BASE_URL } from '../../config.js'

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewURL, setPreviewURL] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: '',
    role: 'student',
    gender: 'female',
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      console.error('No file selected')
      return
    }

    setSelectedFile(file)
    setPreviewURL(URL.createObjectURL(file))

    try {
      // use cloudinary to upload image
      const data = await uploadImageToCloudinary(file)
      setFormData({ ...formData, photo: data.url })

      // console.log(data)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const { message } = await res.json()

      if (!res.ok) {
        throw new Error(message)
      }

      setTimeout(() => {
        setLoading(false)
      }, 500)

      toast.success(message)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* IMAGE */}
          <div className="hidden lg:block rounded-lg lg:rounded-l-lg">
            <figure className="rounded-lg lg:rounded-l-lg">
              <img src={signup} alt="Signup" className=" h-auto mx-auto" />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pl-16 py-10 ccet">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5 flex items-center gap-3">
                {selectedFile && (
                  <figure className="w-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    {/* {console.log('Selected File:', selectedFile)} */}
                    {/* {console.log('Preview URL:', previewURL)} */}
                    <img
                      src={previewURL}
                      alt="Preview"
                      className="w-full rounded-full"
                    />
                  </figure>
                )}

                <div className="relative w-[160px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileChange}
                    accept=".jpg, .png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer text-center"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none placeholder:text-textColor  cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none placeholder:text-textColor  cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none placeholder:text-textColor  cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-headingColor font-bold text-[16p] leading-7"
                >
                  You are a
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                  </select>
                </label>

                <label
                  htmlFor=""
                  className="text-headingColor font-bold text-[16p] leading-7"
                >
                  Your Gender is
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-4"
                >
                  {loading ? (
                    <HashLoader size={35} color="#ffffff" />
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already an account?{' '}
                <Link to="/login" className="text-primaryColor font-medium">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
