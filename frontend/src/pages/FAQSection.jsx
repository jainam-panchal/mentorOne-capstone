import { faqs } from '../assets/data/faq'
import { useState } from 'react'

const FAQSection = () => {
  const [visibleIndex, setVisibleIndex] = useState(null)

  const toggleAnswer = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index)
  }

  return (
    <section className="faq-section py-12 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              onClick={() => toggleAnswer(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <button className="text-blue-600 font-bold">
                  {visibleIndex === index ? 'Hide' : 'Show'}
                </button>
              </div>
              {visibleIndex === index && (
                <p className="mt-4 text-gray-600">{faq.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
