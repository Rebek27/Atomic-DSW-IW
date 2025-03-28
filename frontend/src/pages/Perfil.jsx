import React from 'react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';

const Perfil = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Profile Section */}
      <section className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Musharof Chowdhury"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">Musharof Chowdhury</h2>
            <p className="text-gray-500">Team Manager | Arizona, United States</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a href="#" className="p-2 rounded-full hover:bg-gray-100"><FaFacebookF /></a>
          <a href="#" className="p-2 rounded-full hover:bg-gray-100"><FaXTwitter /></a>
          <a href="#" className="p-2 rounded-full hover:bg-gray-100"><FaLinkedinIn /></a>
          <a href="#" className="p-2 rounded-full hover:bg-gray-100"><FaInstagram /></a>
          <button className="ml-4 px-4 py-2 border rounded-full hover:bg-gray-100">Edit</button>
        </div>
      </section>

      {/* Personal Information Section */}
      <section className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <button className="px-4 py-2 border rounded-full hover:bg-gray-100">Edit</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">First Name</p>
            <p className="font-medium">Musharof</p>
          </div>
          <div>
            <p className="text-gray-500">Last Name</p>
            <p className="font-medium">Chowdhury</p>
          </div>
          <div>
            <p className="text-gray-500">Email address</p>
            <p className="font-medium">randomuser@pimjo.com</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">+09 363 398 46</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-500">Bio</p>
            <p className="font-medium">Team Manager</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Perfil;
