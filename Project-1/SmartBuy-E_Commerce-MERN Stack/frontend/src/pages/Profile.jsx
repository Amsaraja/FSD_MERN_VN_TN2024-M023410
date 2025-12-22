import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { token, backendUrl, navigate, getCartCount, getCartAmount } = useContext(ShopContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    totalSpent: 0
  });

  const fetchUserProfile = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } });
      if (response.data.success) {
        setUserData(response.data.user);
        // Calculate order stats (mock data for now)
        setOrderStats({
          totalOrders: Math.floor(Math.random() * 20) + 1,
          totalSpent: (Math.random() * 2000 + 100).toFixed(2)
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (!token) {
    return (
      <div className='text-center py-20'>
        <p className='text-xl text-gray-600'>Please login to view your profile</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='text-center py-20'>
        <p className='text-xl text-gray-600'>Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className='text-center py-20'>
        <p className='text-xl text-gray-600'>Failed to load profile data</p>
      </div>
    );
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>
      
      <div className='flex flex-col md:flex-row gap-10 max-w-4xl'>
        {/* Profile Info */}
        <div className='flex-1'>
          <div className='bg-gray-50 p-6 rounded-lg'>
            <h3 className='text-lg font-medium mb-4'>Account Information</h3>
            
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                <p className='text-gray-900 bg-white p-2 rounded border'>{userData.name}</p>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                <p className='text-gray-900 bg-white p-2 rounded border'>{userData.email}</p>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Member Since</label>
                <p className='text-gray-900 bg-white p-2 rounded border'>{new Date(userData.date || userData.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Account Status</label>
                <p className='text-green-600 bg-white p-2 rounded border font-medium'>Active</p>
              </div>
            </div>
            
            <button onClick={() => navigate('/edit-profile')} className='mt-6 bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors'>
              Edit Profile
            </button>
          </div>
        </div>
        
        {/* Account Stats */}
        <div className='w-full md:w-80'>
          <div className='bg-gray-50 p-6 rounded-lg'>
            <h3 className='text-lg font-medium mb-4'>Account Summary</h3>
            
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Total Orders:</span>
                <span className='font-medium'>{orderStats.totalOrders}</span>
              </div>
              
              <div className='flex justify-between'>
                <span className='text-gray-600'>Total Spent:</span>
                <span className='font-medium'>${orderStats.totalSpent}</span>
              </div>
              
              <div className='flex justify-between'>
                <span className='text-gray-600'>Cart Items:</span>
                <span className='font-medium'>{getCartCount()}</span>
              </div>
              
              <div className='flex justify-between'>
                <span className='text-gray-600'>Cart Value:</span>
                <span className='font-medium'>${getCartAmount().toFixed(2)}</span>
              </div>
              
              <div className='flex justify-between'>
                <span className='text-gray-600'>Member Since:</span>
                <span className='font-medium'>{new Date(userData.date || userData.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
              
              <div className='flex justify-between'>
                <span className='text-gray-600'>Status:</span>
                <span className='font-medium text-green-600'>Active</span>
              </div>
            </div>
          </div>
          
          <div className='mt-6 bg-gray-50 p-6 rounded-lg'>
            <h3 className='text-lg font-medium mb-4'>Quick Actions</h3>
            
            <div className='space-y-2'>
              <button onClick={() => navigate('/orders')} className='w-full text-left p-2 hover:bg-gray-200 rounded text-sm transition-colors'>
                View Order History
              </button>
              <button onClick={() => navigate('/orders')} className='w-full text-left p-2 hover:bg-gray-200 rounded text-sm transition-colors'>
                Track Current Orders
              </button>
              <button onClick={() => navigate('/cart')} className='w-full text-left p-2 hover:bg-gray-200 rounded text-sm transition-colors'>
                View Shopping Cart
              </button>
              <button onClick={() => navigate('/change-password')} className='w-full text-left p-2 hover:bg-gray-200 rounded text-sm transition-colors'>
                Update Password
              </button>
              <button onClick={() => navigate('/manage-addresses')} className='w-full text-left p-2 hover:bg-gray-200 rounded text-sm transition-colors'>
                Manage Addresses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;