import { formateDate } from '../../utils/formateDate.js'

export const Sessions = ({ sessions }) => {
  return (
    <div>
      {/* {sessions && sessions.length > 0 ? ( */}
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
          </tr>
        </thead>
        <tbody>
          {sessions.map((item) => (
            <tr key={item._id}>
              <td
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
              >
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
                {item.isPaid && (
                  <div className="flex items-center">
                    <div className="h-2.5 w-3.5 rounded-full bg-green-200 mr-2">
                      Paid
                    </div>
                  </div>
                )}
                {!item.isPaid && (
                  <div className="flex items-center">
                    <div className="h-2.5 w-3.5 rounded-full bg-red-300 mr-2">
                      Unpaid
                    </div>
                  </div>
                )}
              </td>
              <td className="px-6 py-3">{item.sessionPrice}</td>
              <td className="px-6 py-3">{formateDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ) : (
        <ul>
          <li>No Sessions</li>
        </ul>
      )} */}
    </div>
  )
}
