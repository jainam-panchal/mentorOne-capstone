import React from 'react'
import useFetchData from '../../hooks/useFetchData.jsx'

import { BASE_URL } from '../../../config.js'
import { MentorCard } from '../../components/Mentors/MentorCard.jsx'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'

const MySession = () => {
  const {
    data: sessions,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/sessions/my-sessions`)

  // console.log(sessions)

  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errorMessage={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {sessions.map((session) => (
            <MentorCard
              mentor={session.sessionData.mentor}
              key={session._id}
              isSession
              sessionId={session.sessionData._id}
              createdAt={session.sessionData.createdAt}
            />
          ))}
        </div>
      )}

      {!loading && !error && sessions.length === 0 && (
        <h2 className="mt-5  text-headingColor leading-7 text-[20px] font-semibold ">
          You don't have any scheduled mentor sessions yet
        </h2>
      )}
    </div>
  )
}

export default MySession
