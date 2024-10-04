import React from 'react'
import { useEffect, useRef, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons'

import mentorPfp from '../../assets/images/mentor_pfp.jpg'
import { AuthContext } from '../../Context/authContext.jsx'
import logo from '../../assets/images/logo.svg'

const navLinks = [
  {
    path: '/',
    display: 'Home',
  },
  {
    path: '/mentors',
    display: 'Find Your Mentor',
  },
  {
    path: '/services',
    display: 'Services',
  },
  // {
  //   path: '/contact',
  //   display: 'Contact',
  // },
]

const Header = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const { user, role, token } = useContext(AuthContext)

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (head) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

  useEffect(() => {
    handleStickyHeader()

    return () => window.removeEventListener('scroll', handleStickyHeader)
  })

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ====== logo ====== */}
          <Link to="/">
            <img src={logo} alt="MentorOne Logo" className="" />
          </Link>

          {/* ====== menu ====== */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                        : 'text-textColor text-[16-px] leading-7 font-[500] hover:text-primaryColor'
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ====== nav right ====== */}

          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === 'mentor'
                      ? '/mentors/profile/me'
                      : '/users/profile/me'
                  }`}
                >
                  <figure className="rounded-full cursor-pointer">
                    <FontAwesomeIcon
                      icon={user?.photo}
                      style={{ color: '#4E545F' }}
                    />
                  </figure>

                  <h2>{user?.name}</h2>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            {/* <h1>{user?.name}</h1> */} 

            <span className="md:hidden" onClick={toggleMenu}>
              <FontAwesomeIcon
                className="w-6 h-6"
                icon={faBars}
                style={{ color: '#4E545F' }}
              />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
