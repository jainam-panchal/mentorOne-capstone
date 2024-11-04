import { BASE_URL, token } from '../../../config.js'
import convertTime from '../../utils/convertTime.js'
import { toast } from 'react-toastify'

const SidePanel = ({ mentorId, sessionPrice, timeSlots }) => {
  const sessionHandler = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/sessions/checkout-session/${mentorId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message + 'Please try again')
      }

      // console.log(data)

      if (data.session.url) {
        window.location.href = data.session.url
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // console.log(mentorId, sessionPrice, timeSlots)
  return (
    <div className="shadow-panelShadow shadow-md p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Per Session Cost
        </p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 font-bold text-textColor">
          {sessionPrice} $
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{' '}
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={sessionHandler} className="btn px-2 w-full rounded-md">
        Book Appointment
      </button>
    </div>
  )
}

export default SidePanel
