import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext);
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        let orderItems = [];
        // ... (existing logic to gather cart items)

        let orderData = {
            address: formData,
            items: orderItems,
            amount: getCartAmount() + delivery_fee,
            phone: formData.phone // Ensure your address form has a phone field!
        }

        switch (method) {
            case 'mpesa':
                const response = await axios.post(`${backendUrl}/api/order/mpesa`, orderData, { headers: { token } });
                if (response.data.success) {
                    toast.success("Check your phone for the M-Pesa popup!");
                    navigate('/orders');
                } else {
                    toast.error(response.data.message);
                }
                break;
            
            // ... other cases
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  return (
    <div className='flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side Content */}
      <div className='flex flex-col w-full gap-4 sm:max-w-[480px]'>
        <div className='my-3 text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            placeholder='First Name' 
          />
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            placeholder='Last Name' 
          />
        </div>
        <input 
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          type="email" 
          placeholder='Email Address' 
        />
        <input 
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          type="text" 
          placeholder='Street' 
        />
        <div className='flex gap-3'>
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            placeholder='City' 
          />
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            placeholder='State' 
          />
        </div>
        <div className='flex gap-3'>
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="number" 
            placeholder='Zip Code' 
          />
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            placeholder='Country' 
          />
        </div>
        <input 
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          type="number" 
          placeholder='Mobile' 
        />
      </div>
      {/* Right Side Content */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        {/* Payment Methods Selection */}
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHODS'} />
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full KSh{method === 'stripe' ? 'bg-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full KSh{method === 'razorpay' ? 'bg-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="RazorPay" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full KSh{method === 'cod' ? 'bg-green-600' : ''}`}></p>
              <p className='mx-4 text-sm font-medium text-gray-500'>CASH ON DELIVERY</p>
            </div>
            <div onClick={() => setMethod('mpesa')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'mpesa' ? 'bg-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.mpesa_logo} alt="M-Pesa" />
            </div>
          </div>
          <div className='w-full mt-8 text-end'>
            <button onClick={onSubmitHandler} className='px-16 py-3 text-sm text-white bg-black active:bg-gray-800'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
