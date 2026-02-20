import React from 'react'
import Title from '../components/Title'
import { assets, shopName, contactDetails } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='pt-8 text-2xl text-center border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      
      <div className='flex flex-col gap-16 my-10 md:flex-row'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt={`${shopName} Store`} />
        
        <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-2/4'>
          <p>
            Welcome to <b>{shopName}</b>. Sourced locally from {contactDetails.location}, 
            we bring the market to your phone with fresh, authentic Kenyan staples.
          </p>
          <p>
            Our mission is to provide the residents of Kibra with a seamless 
            shopping experience for high-quality food, beverages, and household essentials.
          </p>
          <div className='pt-4'>
            <p className='font-bold text-gray-800'>Contact Info:</p>
            <p>Phone: {contactDetails.phone}</p>
            <p>Email: {contactDetails.email}</p>
          </div>
        </div>
      </div>
      
      <NewsLetterBox />
    </div>
  )
}

export default About