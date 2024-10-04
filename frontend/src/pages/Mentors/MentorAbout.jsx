import React from 'react'
import { formateDate } from './../../utils/formateDate'

const MentorAbout = () => {
  return (
    <div>
      {/* ====== ABOUT TEXT ====== */}
      <div>
        <h3 className="text-[20px] leading-[30px] Otext-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            Linda Martinez
          </span>
        </h3>

        <p className="text__para">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit fugit et
          quam harum laudantium voluptatibus. Dolorum pariatur quae sequi dolor
          ipsa consequuntur adipisci omnis facere libero ipsam dicta repellat
          possimus enim mollitia provident perspiciatis quis aliquam, voluptas
          natus inventore numquam? Eius esse perferendis exercitationem quos
          obcaecati, vero quo natus. Quidem ea id incidunt, veritatis et labore
          commodi vitae rem?
        </p>
      </div>

      {/* ====== EDUCATION ====== */}
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] Otext-headingColor font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate('12-08-2019')} - {formateDate('8-09-2022')}
              </span>
              <p className="text-[16px] leading-6">PHD in Human Psychology</p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              University of Chicago
            </p>
          </li>
        </ul>
      </div>

      {/* ====== EXPERIENCE ====== */}
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md: p-5">
          <li
            className="p-4 rounded
bg-[#fff9ea]"
          >
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {' '}
              {formateDate('1-12-2019')} {formateDate('1-12-2023')}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              {' '}
              Clinical psychologist
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              {' '}
              New Apollo Hospital, New York.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MentorAbout
