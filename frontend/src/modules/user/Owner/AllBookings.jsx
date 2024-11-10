import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AllBookings() {
 
    
   const [allBookings, setAllBookings] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/owner/getallbookings', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });
         if (response.data.success) {
            setAllBookings(response.data.data);
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

   const handleStatus = async (bookingId, propertyId, status) => {
      try {
         const res = await axios.post('http://localhost:8000/api/owner/handlebookingstatus', { bookingId, propertyId, status }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         })
         if (res.data.success) {
            message.success(res.data.message);
            getAllProperty();
         } else {
            message.error('Something went wrong');
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="p-6">
         <TableContainer component={Paper} className="shadow-md rounded-lg">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow className="bg-gray-100">
                     <TableCell className="font-bold">Booking ID</TableCell>
                     <TableCell align="center" className="font-bold">Property ID</TableCell>
                     <TableCell align="center" className="font-bold">Tenant Name</TableCell>
                     <TableCell align="center" className="font-bold">Tenant Phone</TableCell>
                     <TableCell align="center" className="font-bold">Booking Status</TableCell>
                     <TableCell align="center" className="font-bold">Actions</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {allBookings.map((booking) => (
                     <TableRow
                        key={booking._id}
                        className="hover:bg-gray-50"
                     >
                        <TableCell component="th" scope="row">
                           {booking._id}
                        </TableCell>
                        <TableCell align="center">{booking.propertyId}</TableCell>
                        <TableCell align="center">{booking.userName}</TableCell>
                        <TableCell align="center">{booking.phone}</TableCell>
                        <TableCell align="center">{booking.bookingStatus}</TableCell>
                        <TableCell align="center">
                           {booking?.bookingStatus === "pending" ? (
                              <button
                                 onClick={() => handleStatus(booking._id, booking.propertyId, 'booked')}
                                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                 Approve
                              </button>
                           ) : (
                              <button
                                 onClick={() => handleStatus(booking._id, booking.propertyId, 'pending')}
                                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                 Revert
                              </button>
                           )}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   

  )
}

export default AllBookings;