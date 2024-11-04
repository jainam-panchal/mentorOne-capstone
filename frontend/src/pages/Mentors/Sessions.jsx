import React from 'react'
import { formateDate } from '../../utils/formateDate.js'
import { useNavigate } from 'react-router-dom'

export const Sessions = ({ sessions }) => {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Payment
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Booked on
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((item) => (
            <tr key={item._id} className="bg-white border-b">
              <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                <img
                  src={item.user.photo}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {item.user.name}
                  </div>
                  <div className="text-normal text-gray-500">
                    {item.user.email}
                  </div>
                </div>
              </td>
              <td className="px-6 py-3">{item.user.gender}</td>
              <td className="px-6 py-3">
                {item.isPaid ? (
                  <div className="flex items-center">
                    <div className="h-2.5 w-3.5 rounded-full bg-green-200 mr-2"></div>
                    <span>Paid</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-2.5 w-3.5 rounded-full bg-red-300 mr-2"></div>
                    <span>Unpaid</span>
                  </div>
                )}
              </td>
              <td className="px-6 py-3">{item.sessionPrice}</td>
              <td className="px-6 py-3">{formateDate(item.createdAt)}</td>
              <td className="px-6 py-3">
                <button
                  onClick={() => navigate(`/session/${item._id}`)}
                  className="btn w-32 h-10 px-3 mt-4 rounded-md bg-blue-500 text-white flex items-center justify-center"
                >
                  Join Session
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Sessions
