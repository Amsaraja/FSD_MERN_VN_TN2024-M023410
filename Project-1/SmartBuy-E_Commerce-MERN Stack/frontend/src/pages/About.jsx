import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2 = {'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>SmartBuy was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a comprehensive marketplace where customers can easily discover, explore, and purchase everything they need from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products across 17+ categories. From cutting-edge electronics and home essentials to fashion, beauty, books, and beyond - we offer an extensive collection sourced from trusted brands and suppliers worldwide.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at SmartBuy is to create the ultimate shopping destination that combines the convenience of online shopping with the variety and quality you'd expect from the world's leading marketplace. We're dedicated to providing a seamless experience that exceeds expectations at every step.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Vast Product Selection:</b>
          <p className='text-gray-600'>Browse through 17+ categories including Electronics, Home & Kitchen, Fashion, Beauty, Books, Sports, and much more - all in one place.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Competitive Pricing:</b>
          <p className='text-gray-600'>From budget-friendly options starting at $8.99 to premium products, we offer competitive prices across all categories with regular deals and discounts.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Smart Shopping Features:</b>
          <p className='text-gray-600'>Advanced filtering, sorting options, bestseller recommendations, and personalized suggestions make finding the perfect product effortless.</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About;
