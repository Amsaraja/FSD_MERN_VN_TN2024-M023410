import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const {backendUrl, token, currency} = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try{
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers: {token}})
      if(response.data.success){
        let allOrderItems = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id
            allOrderItems.push(item)
          })
        })
        setOrderData(allOrderItems.reverse())
      }
    }
    catch(error){
      console.log(error)
      toast.error('Failed to load orders')
    }
  }

  const trackOrder = async (orderId) => {
    try {
      await loadOrderData();
      toast.success('Order status refreshed!');
    } catch (error) {
      toast.error('Failed to track order');
    }
  }

  useEffect(()=>{
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1 = {'MY'} text2 = {'ORDERS'}/>
      </div>
      <div>
        {orderData.map((item, index)=>(
          <div key={index} className='py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.images[0]} alt="" />
              <div>
              <p className='sm:text-base font-medium'>{item.name}</p>
              <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                <p>{currency}{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
              <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
              <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className={`min-w-2 h-2 rounded-full ${
                  item.status === 'Order Placed' ? 'bg-yellow-500' :
                  item.status === 'Packing' ? 'bg-blue-500' :
                  item.status === 'Shipped' ? 'bg-purple-500' :
                  item.status === 'Out for delivery' ? 'bg-orange-500' :
                  item.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-500'
                }`}></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={() => trackOrder(item.orderId)} className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100'>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;
