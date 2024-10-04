import React from 'react'
import Service_Academic from '../assets/images/Service_Academic.jpg'
import Service_Chess from '../assets/images/Service_Chess.jpg'
import Service_Music_Coaching from '../assets/images/Service_Music_Coaching.jpg'
import Service_Counseling from '../assets/images/Service_Counseling.jpg'
import Service_Personal_Development from '../assets/images/Service_Personal_Development.jpg'
import Service_Language_Learning from '../assets/images/Service_Language_Learning.jpg'

export const services = [
  {
    name: 'Academic Tutoring',
    desc: 'Expert guidance in various subjects, including Mathematics, Science, and more. Personalized sessions to help you excel academically.',
    bgColor: 'bg-primaryColor/20', // Tailwind class for primaryColor with opacity
    textColor: 'text-primaryColor',
    image: Service_Academic,
  },
  {
    name: 'Chess Coaching',
    desc: 'Develop your strategic thinking and improve your chess skills with personalized coaching from experienced players.',
    bgColor: 'bg-irisBlueColor/20', // Tailwind class for irisBlueColor with opacity
    textColor: 'text-irisBlueColor',
    image: Service_Chess,
  },
  {
    name: 'Music Lessons',
    desc: 'Learn to play your favorite instrument or improve your vocal skills with lessons from talented music instructors.',
    bgColor: 'bg-purpleColor/20', // Tailwind class for purpleColor with opacity
    textColor: 'text-purpleColor',
    image: Service_Music_Coaching,
  },
  {
    name: 'Career Counseling',
    desc: 'Guidance and support to help you make informed career decisions and achieve your professional goals.',
    bgColor: 'bg-yellowColor/20', // Tailwind class for yellowColor with opacity
    textColor: 'text-yellowColor',
    image: Service_Counseling,
  },
  {
    name: 'Personal Development',
    desc: 'Enhance your personal skills and achieve your goals with tailored coaching and mentorship.',
    bgColor: 'bg-primaryColor/20', // Tailwind class for primaryColor with opacity
    textColor: 'text-primaryColor',
    image: Service_Personal_Development,
  },
  {
    name: 'Language Learning',
    desc: 'Master a new language with interactive lessons and practice sessions from skilled language instructors.',
    bgColor: 'bg-irisBlueColor/20', // Tailwind class for irisBlueColor with opacity
    textColor: 'text-irisBlueColor',
    image: Service_Language_Learning,
  },
]

const Services = () => {
  return (
    <section className="services">
      <div className="container mx-auto ">
        <h2 className="text-3xl font-bold mb-8 text-headingColor">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service__card p-6 rounded-lg shadow-lg ${service.bgColor} ${service.textColor} transform transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-60 object-cover rounded-md mb-4" // Increased height
              />
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-textColor">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
