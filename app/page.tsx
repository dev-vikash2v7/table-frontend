"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';



const Home = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    name: '',
    contact: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [confirmation, setConfirmation] = useState(null);

  const handleChange = (e :ChangeEvent<HTMLInputElement> ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkAvailability = async () => {
    try {
      const response = await axios.post('https://vercel.com/vikashs-projects-7bc97618/table-backend/9qXQDThNcaNqDqFgm5FkjP5sfrtc/api/availability', {
        date: formData.date,
        time: formData.time
      });
      console.log(response.data.slots)
      setAvailableSlots(response.data.slots);
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  const handleSubmit = async (e  : FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://vercel.com/vikashs-projects-7bc97618/table-backend/9qXQDThNcaNqDqFgm5FkjP5sfrtc/api/book', formData);
      setConfirmation(response.data);
    } catch (error) {
      console.error('Error booking table:', error);
    }
  };

  return (
<div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
    <h1 className="text-2xl font-bold text-center mb-6 text-black">Restaurant Table Booking</h1>
    {confirmation ? (
      <div className="bg-green-100 p-4 rounded-md">
        <h2 className="text-xl font-semibold text-green-700 mb-4 ">Booking Confirmed</h2>
        <p className='text-black'><strong >Date:</strong> {confirmation.date}</p>
        <p className='text-black'><strong>Time:</strong> {confirmation.time}</p>
        <p className='text-black'><strong>Guests:</strong> {confirmation.guests}</p>
        <p className='text-black'><strong>Name:</strong> {confirmation.name}</p>
        <p className='text-black'><strong>Contact:</strong> {confirmation.contact}</p>

        <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 mt-4"
            onClick={()=>window.location.reload()}
          >
            Go Back
          </button>

      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
            min="1"
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={checkAvailability}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Check Availability
          </button>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Book Now
          </button>
        </div>
      </form>
    )}
    {!confirmation && availableSlots.length > 0 && (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-black">Available Time Slots:</h3>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          {availableSlots.map((slot, index) => (
            <li key={index}>{slot}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>

  );
};

export default Home;


