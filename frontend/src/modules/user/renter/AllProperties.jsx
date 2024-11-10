import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllProperties = () => {
   const [allProperties, setAllProperties] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get(`http://localhost:8000/api/user/getallbookings`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   return (
      <div className="container mx-auto p-4">
         <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
               <thead>
                  <tr className="bg-gray-100 border-b">
                     <th className="px-6 py-3 text-left text-gray-600 font-medium">Booking ID</th>
                     <th className="px-6 py-3 text-left text-gray-600 font-medium">Property ID</th>
                     <th className="px-6 py-3 text-center text-gray-600 font-medium">Tenant Name</th>
                     <th className="px-6 py-3 text-center text-gray-600 font-medium">Phone</th>
                     <th className="px-6 py-3 text-center text-gray-600 font-medium">Booking Status</th>
                  </tr>
               </thead>
               <tbody>
                  {allProperties.map((booking) => (
                     <tr key={booking._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-700">{booking._id}</td>
                        <td className="px-6 py-4 text-gray-700">{booking.propertyId}</td>
                        <td className="px-6 py-4 text-center text-gray-700">{booking.userName}</td>
                        <td className="px-6 py-4 text-center text-gray-700">{booking.phone}</td>
                        <td className="px-6 py-4 text-center text-gray-700">{booking.bookingStatus}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default AllProperties;
