import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Customer Service</p>
          <p className='text-gray-500'>SmartBuy Technologies Pvt Ltd <br /> No. 123, Anna Salai, Nandanam <br /> Chennai, Tamil Nadu 600035, India </p>
          <p className='text-gray-500'>Tel: +91-44-2234-5678 <br /> Email: support@smartbuy.com</p>
          <p className='font-semibold text-xl text-gray-600'>Join Our Team</p>
          <p className='text-gray-600'>Discover exciting career opportunities across technology, operations, and customer service.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>View Careers</button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact;
