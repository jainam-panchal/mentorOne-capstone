import React, { useContext } from 'react'
import { BiMenu } from 'react-icons/bi'

import { AuthContext } from './../../Context/authContext'
import { useNavigate } from 'react-router-dom'

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-3 h-3 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[20px] shadow-panelShadow bg-white drop-shadow-md items-center h-max rounded-md">
        <button
          onClick={() => setTab('overview')}
          className={`${
            tab === 'overview'
              ? 'bg-indigo-100 text-primaryColor'
              : 'bg-transparent text-headingColor'
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>

        <button
          onClick={() => setTab('sessions')}
          className={`${
            tab === 'sessions'
              ? 'bg-indigo-100 text-primaryColor'
              : 'bg-transparent text-headingColor'
          } w-full btn mt-0 rounded-md`}
        >
          Sessions
        </button>

        <button
          onClick={() => setTab('settings')}
          className={`${
            tab === 'settings'
              ? 'bg-indigo-100 text-primaryColor'
              : 'bg-transparent text-headingColor'
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>

        <div className="mt-[80px] w-full">
          <button
            onClick={handleLogout}
            className="w-full bg-[#181A1E] my-3 p-3 text-[16px] leading-7 rounded-md text-white"
          >
            Logout
          </button>
          <button className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tabs
