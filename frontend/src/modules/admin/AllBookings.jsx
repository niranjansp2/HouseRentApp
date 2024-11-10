import { message, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllBookings = () => {
   const [allBookings, setAllBookings] = useState([]);
   const [loading, setLoading] = useState(true);

   const getAllBooking = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/admin/getallbookings', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllBookings(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
         message.error('An error occurred while fetching the bookings.');
      } finally {
         setLoading(false); // Stop the loading spinner once the request finishes
      }
   };

   useEffect(() => {
      getAllBooking();
   }, []);

   return (
      <div className="p-4">
         {loading ? (
            <div className="flex justify-center items-center h-full">
               <Spin size="large" />
            </div>
         ) : (
            <div className="overflow-x-auto">
               <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                  <thead>
                     <tr className="bg-gray-100">
                        <th className="py-3 px-4 text-left text-gray-700">Booking ID</th>
                        <th className="py-3 px-4 text-center text-gray-700">Owner ID</th>
                        <th className="py-3 px-4 text-center text-gray-700">Property ID</th>
                        <th className="py-3 px-4 text-center text-gray-700">Tenant ID</th>
                        <th className="py-3 px-4 text-center text-gray-700">Tenant Name</th>
                        <th className="py-3 px-4 text-center text-gray-700">Tenant Contact</th>
                        <th className="py-3 px-4 text-center text-gray-700">Booking Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     {allBookings.map((booking) => (
                        <tr key={booking._id} className="border-t">
                           <td className="py-3 px-4">{booking._id}</td>
                           <td className="py-3 px-4 text-center">{booking.ownerID}</td>
                           <td className="py-3 px-4 text-center">{booking.propertyId}</td>
                           <td className="py-3 px-4 text-center">{booking.userID}</td>
                           <td className="py-3 px-4 text-center">{booking.userName}</td>
                           <td className="py-3 px-4 text-center">{booking.phone}</td>
                           <td className="py-3 px-4 text-center">{booking.bookingStatus}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
};

export default AllBookings;
