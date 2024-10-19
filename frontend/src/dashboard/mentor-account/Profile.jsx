import React, { useState, useEffect } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

import uploadImageToCloudinary from '../../utils/uploadCloudinary.js'
import { BASE_URL, token } from '../../../config.js'
import { toast } from 'react-toastify'

const Profile = ({ mentorData }) => {
  const [formData, setFormData] = useState({
    name: '',
    // password: '',
    // email: '',
    phone: '',
    bio: '',
    gender: '',
    specialization: '',
    sessionPrice: null,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: '',
    photo: null,
    yearsOfExp: 0,
  })

  useEffect(() => {
    setFormData({
      name: mentorData?.name,
      // email: mentorData?.email,
      phone: mentorData?.phone,
      bio: mentorData?.bio,
      gender: mentorData?.gender,
      specialization: mentorData?.specialization,
      sessionPrice: mentorData?.sessionPrice,
      qualifications: mentorData?.qualifications,
      experiences: mentorData?.experiences,
      timeSlots: mentorData?.timeSlots,
      about: mentorData?.about,
      photo: mentorData?.photo,
      yearsOfExp: mentorData?.yearsOfExp,
    })
  }, [mentorData])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0]

    if (!file) {
      console.error('No file selected')
      return
    }

    try {
      const data = await uploadImageToCloudinary(file)
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: data?.url,
      }))
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const updateProfileHandler = async (e) => {
    e.preventDefault()

    // console.log(formData)

    try {
      const res = await fetch(`${BASE_URL}/mentors/${mentorData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      if (!res.ok) {
        throw new Error(result.message || 'Failed to update profile')
      }

      toast.success(result.message)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const addItem = (key, item) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], item] }))
  }

  const handleReuseableInputChange = (key, index, event) => {
    const { name, value } = event.target
    setFormData((prev) => {
      // Ensure prev[key] is an array
      if (!Array.isArray(prev[key])) {
        console.error(`Expected an array for key: ${key}`)
        return prev
      }

      const updateItems = prev[key].map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )

      return {
        ...prev,
        [key]: updateItems,
      }
    })
  }

  const handleDeleteItem = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }))
  }

  // Qualifications
  const addQualification = (e) => {
    e.preventDefault()

    addItem('qualifications', {
      startingDate: '',
      endingDate: '',
      university: '',
      degree: '',
    })
  }

  const deleteQualificationChange = (e, index) => {
    e.preventDefault()
    handleDeleteItem('qualifications', index)
  }

  const handleQualificationChange = (event, index) => {
    handleReuseableInputChange('qualifications', index, event)
  }

  // Experiences
  const addExperience = (e) => {
    e.preventDefault()
    addItem('experiences', {
      startingDate: '',
      endingDate: '',
      organization: '',
      position: '',
    })
  }
  const deleteExperienceChange = (e, index) => {
    e.preventDefault()
    handleDeleteItem('experiences', index)
  }
  const handleExperienceChange = (event, index) => {
    handleReuseableInputChange('experiences', index, event)
  }

  // Timeslots
  const addTimeSlot = (e) => {
    e.preventDefault()
    addItem('timeSlots', { day: '', startingTime: '', endingTime: '' })
  }
  const deleteTimeChange = (e, index) => {
    e.preventDefault()
    handleDeleteItem('timeSlots', index)
  }
  const handleTimeChange = (event, index) => {
    handleReuseableInputChange('timeSlots', index, event)
  }

  return (
    <div>
      <form>
        <div className="mb-5 w-full">
          <p className="form__label font-semibold mb-2">Name</p>
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          />
        </div>
        <div className="mb-5 w-full">
          <p className="form__label font-semibold mb-2">Email</p>
          <input
            autoComplete="off"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
            readOnly
            aria-readonly
            disabled
          />
        </div>
        <div className="mb-5 w-full">
          <p className="form__label font-semibold mb-2">Phone</p>
          <input
            autoComplete="off"
            type="number"
            name="phone"
            maxLength={10}
            minLength={10}
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          />
        </div>
        <div className="mb-5 w-full">
          <p className="form__label font-semibold mb-2">Bio</p>
          <input
            autoComplete="off"
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
            maxLength={100}
          />
        </div>

        <div className="mb-5 w-full">
          <p className="form__label font-semibold mb-2">Years Of Experience</p>
          <input
            autoComplete="off"
            type="number"
            name="yearsOfExp"
            value={formData.yearsOfExp}
            onChange={handleInputChange}
            placeholder="Years Of Experience"
            className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
            maxLength={100}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label font-semibold mb-2">Gender</p>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form__label font-semibold mb-2">Specialization</p>
              <input
                autoComplete="off"
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="specialization"
                className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                maxLength={100}
              />
              {/* <select
                name="specialization"
                id="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5 mb-2 w-full p-4 border rounded-xl"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Academic Tutoring">Academic Tutoring</option>
                <option value="Career Counseling">Career Counseling</option>
                <option value="Personal Development">
                  Personal Development
                </option>
                <option value="Language Teaching">Language Teaching</option>
                <option value="Game Coaching">Game Coaching</option>
                <option value="Music">Music</option>
                <option value="Other">Other</option>
              </select> */}
            </div>

            <div>
              <p className="form__label font-semibold mb-2">Session Price</p>
              <input
                type="number"
                onChange={handleInputChange}
                placeholder="100"
                name="sessionPrice"
                value={formData.sessionPrice}
                className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="form__label font-semibold mb-4">Qualification</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label mb-2">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      onChange={(e) => handleQualificationChange(e, index)}
                      className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                    />
                  </div>

                  <div>
                    <p className="form_label mb-2">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.endingDate}
                      onChange={(e) => handleQualificationChange(e, index)}
                      className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form_label mb-2">Degree</p>
                  <input
                    type="text"
                    name="degree"
                    value={item.degree}
                    onChange={(e) => handleQualificationChange(e, index)}
                    className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                  />
                </div>

                <div>
                  <p className="form_label mb-2">University</p>
                  <input
                    type="text"
                    name="university"
                    value={item.university}
                    onChange={(e) => handleQualificationChange(e, index)}
                    className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                  />
                </div>
              </div>

              <button
                onClick={(e) => deleteQualificationChange(e, index)}
                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}

          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            onClick={addQualification}
          >
            Add Qualification
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label font-semibold mb-4">Experience</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label mb-2">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      onChange={(e) => handleExperienceChange(e, index)}
                      className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                    />
                  </div>

                  <div>
                    <p className="form_label mb-2">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      onChange={(e) => handleExperienceChange(e, index)}
                      className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form_label mb-2">Position</p>
                  <input
                    type="text"
                    name="position"
                    value={item.position}
                    onChange={(e) => handleExperienceChange(e, index)}
                    className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                  />
                </div>

                <div>
                  <p className="form_label mb-2">Organization</p>
                  <input
                    type="text"
                    name="organization"
                    value={item.organization}
                    onChange={(e) => handleExperienceChange(e, index)}
                    className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                  />
                </div>
              </div>

              <button
                onClick={(e) => deleteExperienceChange(e, index)}
                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}

          <button
            onClick={addExperience}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Experience
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label font-semibold mb-4">Time Slots</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="form_label mb-2">Day</p>
                    <select
                      name="day"
                      value={item.day}
                      onChange={(e) => handleTimeChange(e, index)}
                      className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                    >
                      <option value="select" disabled>
                        Select
                      </option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                    </select>
                  </div>

                  <div>
                    <p className="form_label mb-2">Starting Time</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      onChange={(e) => handleTimeChange(e, index)}
                      className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                    />
                  </div>

                  <div>
                    <p className="form_label mb-2">Ending Time</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      onChange={(e) => handleTimeChange(e, index)}
                      className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteTimeChange(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-9 mb-[30px] cursor-pointer"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={(e) => addTimeSlot(e)}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Time
          </button>
        </div>

        <div className="mb-5">
          <p className="form_label mb-2">About</p>
          <textarea
            name="about"
            id=""
            rows="5"
            value={formData.about}
            placeholder="Write about yourself"
            onChange={handleInputChange}
            className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          ></textarea>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              {/* {console.log('Selected File:', selectedFile)} */}
              {/* {console.log('Preview URL:', previewURL)} */}
              <img
                src={formData.photo}
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
              onChange={handleFileInputChange}
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

        <div className="mt-10">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Upload Profile
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile
