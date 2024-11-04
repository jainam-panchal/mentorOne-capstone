import { useEffect, useState } from 'react'

import { MentorCard } from '../../components/Mentors/MentorCard.jsx'
import { BASE_URL } from './../../../config'
import useFetchData from './../../hooks/useFetchData'
import Loader from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'

const Mentors = () => {
  const [query, setQuery] = useState('')
  const [debounceQuery , setDebounceQuery] = useState("")

  const handleSearch = () => {
    setQuery(query.trim())
    // console.log('handle search')
  }

  useEffect(() => {
    const timeout = setTimeout(()=>{
      setDebounceQuery(query)
    }, 700)

    return () => clearTimeout(timeout)

  }, [query])

  const {
    data: mentors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/mentors?query=${debounceQuery}`)

  return (
    <>
      <section className="bg-[#fff9ea] max-h-[300px]">
        <div className="container text-center">
          <h2 className="heading">Find a Mentor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Mentor By Name or Specialization"
            />
            <button
              onClick={handleSearch}
              className="btn mt-0 rounded-[0px] rounded-r-md "
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container min-h-[500px]">
          {loading && <Loader />}
          {error && <Error />}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
              {mentors.map((mentor) => (
                <MentorCard key={mentor._id} mentor={mentor} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Mentors
