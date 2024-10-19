import React from 'react'
import img1 from '../assets/images/how_does_it_work_1.svg'
import img2 from '../assets/images/how_does_it_work_2.svg'
import img3 from '../assets/images/how_does_it_work_3.svg'
import FAQSection from './FAQSection'

import { MentorCard } from '../components/Mentors/MentorCard.jsx'
import MentorList from '../components/Mentors/MentorList.jsx'

const Home = () => {
  return (
    <>
      {/* ============== HERO SECTION ==============  */}
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-grow gap-[90px] items-center justify-between">
            {/* ===== hero content */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  Where learning meets opportunity
                </h1>

                <p className="text__para">
                  Ready to turn those 'aha' moments into 'heck yeah' victories?
                  At MentorOne, we pair you with awesome mentors who make
                  learning feel less like a chore and more like an adventure.
                </p>

                <button className="btn">Schedule Your Session</button>
              </div>
            </div>

            {/* hero counter */}
            <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg: items-center gap-5 lg:gap-[30px] justify-center ">
              <div>
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                  5000+
                </h2>
                <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                <p className="text__para">Sessions Completed</p>
              </div>

              <div>
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                  200+
                </h2>
                <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                <p className="text__para">Expert Mentors</p>
              </div>

              <div>
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                  4.8+
                </h2>
                <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                <p className="text__para">Average Rating</p>
              </div>
            </div>

            {/* ===== hero content end */}
          </div>
        </div>
      </section>

      {/* ============== HOW DOES IT WORK SECTION ==============  */}
      <section className="w-full">
        <div className="container mx-auto px-4">
          <div className="lg:w-full mx-auto">
            <h2 className="heading text-center">How does it work?</h2>
            <p className="text__para text-center">
              Discover the simplicity and effectiveness of learning with
              MentorOne.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
              <div className="py-[30px] px-5">
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src={img1}
                    alt=""
                    className="w-[150px] h-[150px] object-contain"
                  />
                  <h2 className="text-[26px] leading-9 text-headingColor font-[600] mt-[20px]">
                    Find a mentor
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4">
                    Browse through our roster of expert tutors. View profiles,
                    read reviews, and find the perfect match for your learning
                    needs.
                  </p>
                </div>
              </div>

              <div className="py-[30px] px-5">
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src={img2}
                    alt=""
                    className="w-[150px] h-[150px] object-contain"
                  />
                  <h2 className="text-[26px] leading-9 text-headingColor font-[600] mt-[20px]">
                    Schedule a session
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4">
                    Easily schedule a session with your chosen mentor at a time
                    that suits you. Our platform makes it simple and convenient.
                  </p>
                </div>
              </div>

              <div className="py-[30px] px-5">
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src={img3}
                    alt=""
                    className="w-[150px] h-[150px] object-contain"
                  />
                  <h2 className="text-[26px] leading-9 text-headingColor font-[600] mt-[20px]">
                    Start learning
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4">
                    Begin your learning journey with personalized guidance from
                    your mentor. Achieve your goals with tailored support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center mb-3">Our Expert Mentors</h2>
            <p className="text_para text-center">
              World-class guidance for everyone. Our mentoring system offers
              unmatched, expert advice and support.
            </p>
          </div>
          <MentorList />
        </div>
      </section>

      {/* ============== About us SECTION ============== */}
      {/* <section className="about__section py-[60px] bg-gradient-to-r from-cyan-100 via-slate-100 to-green-50 bg-no-repeat bg-center bg-cover w-full h-auto">
        <div className="container mx-auto px-4">
          <div className="lg:w-3/4 mx-auto text-center">
            <h2 className="heading text-center">About Us</h2>
            <p className="text__para text-center mt-4">
              MentorOne is dedicated to providing personalized learning
              experiences through expert mentorship. Our mission is to connect
              learners with mentors who can guide them towards achieving their
              educational and professional goals.
            </p>
            <p className="text__para text-center mt-4">
              We believe in the power of one-on-one mentorship and the impact it
              can have on an individual's growth. Our platform is designed to
              make it easy for you to find, schedule, and start learning with a
              mentor who fits your needs.
            </p>
          </div>
        </div>
      </section> */}

      {/* ============== FAQ SECTION ============== */}

      {/* <MentorCard/> */}
      <FAQSection />
    </>
  )
}

export default Home
