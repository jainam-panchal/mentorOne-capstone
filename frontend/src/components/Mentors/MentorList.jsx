import React from 'react'
import { MentorCard } from './MentorCard.jsx'

import { BASE_URL } from './../../../config'
import useFetchData from './../../hooks/useFetchData'
import Loader from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'

const mentors = [
  {
    id: '01',
    name: 'Jane Smith',
    specialty: 'Physics',
    avgRating: 4.7,
    totalRating: 250,
    photo:
      'https://res.cloudinary.com/domwwopwt/image/upload/v1729310953/e2ff8vrgrxapdyap2fea.jpg',
    totalMentees: 1100,
    experience: 8,
  },
  {
    id: '02',
    name: 'Jane Smith',
    specialty: 'Physics',
    avgRating: 4.7,
    totalRating: 250,
    photo:
      'https://res.cloudinary.com/domwwopwt/image/upload/v1729310953/e2ff8vrgrxapdyap2fea.jpg',
    totalMentees: 1100,
    experience: 8,
  },
  {
    id: '03',
    name: 'Jane Smith',
    specialty: 'Physics',
    avgRating: 4.7,
    totalRating: 250,
    photo:
      'https://res.cloudinary.com/domwwopwt/image/upload/v1729310953/e2ff8vrgrxapdyap2fea.jpg',
    totalMentees: 1100,
    experience: 8,
  },
]

const MentorList = () => {
  

  const { data, loading, error } = useFetchData(`${BASE_URL}/mentors`)
  return (
    <>

    {loading && <Loader/>}
    {error && <Error/>}

     {!loading && !error && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
        {data.map((mentor) => (
          <MentorCard key={mentor._id} mentor={mentor} />
        ))}
      </div>}
    </>
  )
}

export default MentorList
