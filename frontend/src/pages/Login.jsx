import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'

import { AuthContext } from '../Context/authContext.jsx'
import { BASE_URL } from '../../config.js'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { dispatch } = useContext(AuthContext)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message)
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      })

      console.log('login data', result)

      setTimeout(() => {
        setLoading(false)
      }, 500)

      toast.success(result.message)
      setTimeout(() => {
        navigate('/home')
      }, 2000)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 p-5">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello <span className="text-primaryColor">Welcome Back 🎉</span>
        </h3>

        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none placeholder:text-textColor  cursor-pointer"
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
              className="w-full px-4 py-3 border-b border-solid focus:border-[#0066ff61] focus:outline-none placeholder:text-textColor  cursor-pointer"
              required
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-4"
            >
              {loading ? <HashLoader size={35} color="#ffffff" /> : 'Login'}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primaryColor font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login
