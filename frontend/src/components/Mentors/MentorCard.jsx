import React from 'react'
import { Link } from 'react-router-dom'

import mentorPfp from '../../assets/images/mentor_pfp.jpg'
import starIcon from '../../assets/images/Star.png'
import { BsArrowRight } from 'react-icons/bs'

export const MentorCard = () => {
  const mentorDetails = {
    id: '02',
    name: 'Jane Smith',
    specialty: 'Physics',
    avgRating: 4.7,
    totalRating: 250,
    photo: mentorPfp,
    totalMentees: 1100,
    experience: 8,
  }

  return (
    // <div className="p-4 lg:p-6 shadow-lg border rounded-lg w-full max-w-sm mx-auto bg-gradient-to-b from-white via-gray-50 to-gray-100">
    <div className="p-4 lg:p-6 rounded-lg w-full max-w-sm mx-auto">
      <div className="flex justify-center">
        <img
          src={mentorDetails.photo}
          className="w-full h-auto max-w-xs rounded-lg shadow-md"
          alt="Mentor"
        />
      </div>
      <h2 className="text-[20px] lg:text-[24px] leading-[28px] lg:leading-[32px] text-headingColor font-bold mt-3 lg:mt-4 text-center">
        {mentorDetails.name}
      </h2>
      <div className="mt-2 lg:mt-3 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-3 lg:py-2 lg:px-4 text-[12px] lg:text-[14px] leading-5 lg:leading-6 font-semibold rounded-md shadow-sm">
          {mentorDetails.specialty}
        </span>

        <div className="flex items-center gap-2">
          <img
            src={starIcon}
            alt="Star Icon"
            className="w-4 h-4 lg:w-5 lg:h-5"
          />
          <span className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] font-semibold text-headingColor">
            {mentorDetails.avgRating}
          </span>
          <span className="text-[12px] lg:text-[14px] leading-5 lg:leading-6 font-normal text-textColor ml-1">
            ({mentorDetails.totalRating})
          </span>
        </div>
      </div>

      <div className="mt-5 lg:mt-6 flex items-center justify-between">
        <div>
          <h3 className="text-[14px] lg:text-[16px] leading-6 lg:leading-[24px] font-semibold text-headingColor">
            {mentorDetails.totalMentees} Students
          </h3>
          <p className="text-[12px] lg:text-[14px] leading-5 font-normal text-textColor">
            {mentorDetails.experience} Years of Experience
          </p>
        </div>

        <Link
          to={`/mentors/${mentorDetails.id}`}
          className="w-[45px] h-[45px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group  shadow-md"
        >
          <BsArrowRight className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}
