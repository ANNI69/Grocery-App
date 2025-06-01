import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useAppContext } from '../Context/AppContext'

const InputField = ({
  type, placeholder, handleChange, className, address, name
}) => (
  <input
    type={type || 'text'}
    placeholder={placeholder || 'Enter text'}
    onChange={handleChange}
    className={`w-full px-2 py-2.5 border border-gray-300 rounded-md focus:outline-none text-grey focus:border-primary ${className || ''}`}
    autoComplete='off'
    value={address[name] || ''}
    name={name || ''}
    required
  /> 
)

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const onsubmitHandler = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  }

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500 mb-4'>
        Add Shipping <span className='text-primary'>
          Address
        </span>
      </p>
      <div className='flex flex-col md:flex-row justify-between gap-4 mb-8'>
        <div>
          <form onSubmit={onsubmitHandler} className='space-y-3 mt-6 text-sm'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <InputField 
                type='text'
                placeholder='First Name'
                className='w-full'
                name='firstName'
                address={address}
                handleChange={handleChange}
                required
              />
              <InputField 
                type='text'
                placeholder='Last Name'
                className='w-full'
                name='lastName'
                address={address}
                handleChange={handleChange}
                required
              />
            </div>
            <InputField 
              type='text'
              placeholder='Email'
              className='w-full'
              name='email'
              address={address}
              handleChange={handleChange}
              required
            />
            <InputField 
              type='text'
              placeholder='Street Address'
              className='w-full'
              name='street'
              address={address}
              handleChange={handleChange}
              required
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <InputField 
                type='text'
                placeholder='City'
                className='w-full'
                name='city'
                address={address}
                handleChange={handleChange}
                required
              />
              <InputField 
                type='text'
                placeholder='State'
                className='w-full'
                name='state'
                address={address}
                handleChange={handleChange}
                required
              />
              </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <InputField 
                type='text'
                placeholder='Country'
                className='w-full'
                name='country'
                address={address}
                handleChange={handleChange}
                required
              />
              <InputField 
                type='text'
                placeholder='Zip Code'
                className='w-full'
                name='zipCode'
                address={address}
                handleChange={handleChange}
                required
              />
            </div>
            <InputField 
              type='text'
              placeholder='Phone Number'
              className='w-full'
              name='phoneNumber'
              address={address}
              handleChange={handleChange}
              required
            />
            <button 
              type='submit' 
              className='w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dull transition-colors'>
              Add Address
              </button>
          </form>
          </div> 
        <img src={assets.add_address_iamge} alt="dummyImage" className='md:mr-16 mb-16 md:mt-0' />
      </div>
      {/* Removed unnecessary InputField components */}
    </div>
  )
}

export default AddAddress
