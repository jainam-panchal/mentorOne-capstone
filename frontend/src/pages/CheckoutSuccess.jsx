import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <div className=" h-screen">
      <div className=" p-6 md:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 50 50"
          xmlSpace="preserve"
          width="50"
          height="50"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <circle style={{ fill: '#25AE88' }} cx="25" cy="25" r="25" />
          <polyline
            style={{
              fill: 'none',
              stroke: '#FFFFFF',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 10,
            }}
            points="38,15 22,33 12,25"
          />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a great day!</p>
          <div className="py-10 text-center">
            <Link
              to="/home"
              className="px-12 bg-buttonBgColor text-white font-semibold py-3"
            >
              Go Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
