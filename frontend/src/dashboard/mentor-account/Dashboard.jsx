import React, { useState } from 'react'

import starIcon from '../../assets/images/Star.png'
import Loading from '../../components/Loader/Loading.jsx'
import Error from './../../components/Error/Error'
import { BASE_URL } from '../../../config.js'
import Tabs from './Tabs.jsx'
import useGetProfile from '../../hooks/useFetchData.jsx'
import dummyImage from '../../assets/images/dummy_image.png'
import MentorAbout from '../../pages/Mentors/MentorAbout.jsx'
import Profile from './Profile.jsx'
import { Sessions } from '../../pages/Mentors/Sessions.jsx'

const Dashboard = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/mentors/profile/me`
  )


  // console.log(data)

  const [tab, setTab] = useState('overview')

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}

        {error && !loading && <Error errorMessage={error} />}

        {!loading && !error && data && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />

            <div className="lg:col-span-2">
              {data.isApproved === 'pending' && (
                <div className="flex text-xs p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <span>
                    To get approval please complete your profile. We'll review
                    manually and approve within 3 days.
                  </span>
                </div>
              )}

              <div className="mt-8 ml-5 min-h-[500px]">
                {tab === 'overview' && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] mx-h-[200px] mr-10">
                        <img
                          src={data.photo ? data.photo : dummyImage}
                          alt=""
                          className="w-full"
                        />
                      </figure>

                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {data.specialization ? data.specialization : 'Mentor'}
                        </span>

                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data.name}
                        </h3>

                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={starIcon} alt="" />
                            {data.averageRating === 0
                              ? 'Good things are coming..'
                              : data.averageRating}
                          </span>
                          <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            {data.totalRating === 0
                              ? ''
                              : `(${data.totalRating})`}
                          </span>
                        </div>

                        <p className="text__para font-[15px] lg:max-w-[390px] leading-6">
                          {data?.bio}
                        </p>
                      </div>
                    </div>
                    <MentorAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}

                {tab === 'sessions' && <Sessions sessions={data.sessions} />}
                {tab === 'settings' && <Profile mentorData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Dashboard
      