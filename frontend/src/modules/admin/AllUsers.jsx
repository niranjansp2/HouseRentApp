import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllUsers = () => {
   const [allUser, setAllUser] = useState([]);

   useEffect(() => {
      getAllUser();
   }, []);

   const getAllUser = async () => {
      try {
         const response = await axios.get('http://localhost:8000/api/admin/getallusers', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllUser(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleStatus = async (userid, status) => {
      try {
         await axios.post('http://localhost:8000/api/admin/handlestatus', { userid, status }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         }).then((res) => {
            if (res.data.success) {
               getAllUser();
            }
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="p-4">
         <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-md border-collapse">
               <thead>
                  <tr className="bg-gray-100">
                     <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User ID</th>
                     <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Name</th>
                     <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Email</th>
                     <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Type</th>
                     <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Granted (for Owners users only)</th>
                     <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {allUser.map((user) => (
                     <tr key={user._id} className="border-t">
                        <td className="px-4 py-2 text-sm text-gray-800">{user._id}</td>
                        <td className="px-4 py-2 text-center text-sm text-gray-800">{user.name}</td>
                        <td className="px-4 py-2 text-center text-sm text-gray-800">{user.email}</td>
                        <td className="px-4 py-2 text-center text-sm text-gray-800">{user.type}</td>
                        <td className="px-4 py-2 text-center text-sm text-gray-800">{user.granted}</td>
                        <td className="px-4 py-2 text-center text-sm">
                           {user.type === 'Owner' && user.granted === 'ungranted' ? (
                              <button 
                                 onClick={() => handleStatus(user._id, 'granted')} 
                                 className="px-4 py-2 bg-green-500 text-white text-xs rounded-md hover:bg-green-700 transition duration-300"
                              >
                                 Granted
                              </button>
                           ) : user.type === 'Owner' && user.granted === 'granted' ? (
                              <button 
                                 onClick={() => handleStatus(user._id, 'ungranted')} 
                                 className="px-4 py-2 border border-red-500 text-red-500 text-xs rounded-md hover:bg-red-100 transition duration-300"
                              >
                                 Ungranted
                              </button>
                           ) : null}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default AllUsers;
