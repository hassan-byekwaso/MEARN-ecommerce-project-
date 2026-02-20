import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { shopName, contactDetails } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='pt-8 text-2xl text-center border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='flex flex-col gap-16 my-10 md:flex-row'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt={`${shopName} Store`} />
        <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-2/4'>
          <p>Welcome to {shopName}, located in {contactDetails.location}. We bring the market to your phone with fresh, authentic Kenyan staples.</p>
          <p>Contact us at {contactDetails.phone} or {contactDetails.email} for any inquiries.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
