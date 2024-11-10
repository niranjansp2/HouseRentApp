import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllProperty = () => {
   const [allProperties, setAllProperties] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8000/api/admin/getallproperties', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
         message.error('An error occurred while fetching properties.');
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   return (
      <div className="p-4">
         <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
               <thead className="bg-gray-100">
                  <tr>
                     <th className="py-3 px-4 text-left text-gray-700">Property ID</th>
                     <th className="py-3 px-4 text-center text-gray-700">Owner ID</th>
                     <th className="py-3 px-4 text-center text-gray-700">Property Type</th>
                     <th className="py-3 px-4 text-center text-gray-700">Property Ad Type</th>
                     <th className="py-3 px-4 text-center text-gray-700">Property Address</th>
                     <th className="py-3 px-4 text-center text-gray-700">Owner Contact</th>
                     <th className="py-3 px-4 text-center text-gray-700">Property Amt</th>
                  </tr>
               </thead>
               <tbody>
                  {allProperties.map((property) => (
                     <tr key={property._id} className="border-t">
                        <td className="py-3 px-4">{property._id}</td>
                        <td className="py-3 px-4 text-center">{property.ownerId}</td>
                        <td className="py-3 px-4 text-center">{property.propertyType}</td>
                        <td className="py-3 px-4 text-center">{property.propertyAdType}</td>
                        <td className="py-3 px-4 text-center">{property.propertyAddress}</td>
                        <td className="py-3 px-4 text-center">{property.ownerContact}</td>
                        <td className="py-3 px-4 text-center">{property.propertyAmt}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default AllProperty;
