import { useState } from 'react'
import { useParams } from 'react-router-dom'
import starIcon from '../../assets/images/Star.png'
import MentorAbout from './MentorAbout'
import Feedback from './Feedback'
import SidePanel from './SidePanel'

import { BASE_URL } from './../../../config'
import useFetchData from './../../hooks/useFetchData'
import Loader from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'

const MentorDetails = () => {
  const [tab, setTab] = useState('about')

  const { id } = useParams()
  const {
    data: mentor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/mentors/${id}`)

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={mentor.photo} alt="" className="w-full" />
                </figure>

                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:px-6 text-[12px] leading-4 lg:text-[16px] font-semibold rounded">
                    {mentor.specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {mentor.name}
                  </h3>

                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" />
                      {mentor.averageRating}
                    </span>
                    <span className=" text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-textColor">
                      ({mentor?.reviews?.length || 0})
                    </span>
                  </div>

                  <p className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                    {mentor.bio}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab('about')}
                  className={`${
                    tab === 'about' &&
                    'border-b border-solid border-primaryColor'
                  } py-2 px-5 mr-5 text-[16px] leading-7 Otext-headingColor font-semibold`}
                >
                  About
                </button>

                <button
                  onClick={() => setTab('feedback')}
                  className={`${
                    tab === 'feedback' &&
                    'border-b border-solid border-primaryColor'
                  } py-2 px-5 mr-5 text-[16px] leading-7 Otext-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[50px] min-h-[300px]">
                {tab === 'about' && (
                  <MentorAbout
                    name={mentor.name}
                    about={mentor.about}
                    qualifications={mentor.qualifications}
                    experiences={mentor.experiences}
                  />
                )}
                {tab === 'feedback' && <Feedback reviews={mentor.reviews} />}
              </div>
            </div>
            <div>
              <SidePanel
                mentorId={mentor._id}
                sessionPrice={mentor.sessionPrice}
                timeSlots={mentor.timeSlots}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default MentorDetails
