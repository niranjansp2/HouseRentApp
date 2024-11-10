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

const AllProperties = () => {
   const [image, setImage] = useState(null);
   const [editingPropertyId, setEditingPropertyId] = useState(null);
   const [editingPropertyData, setEditingPropertyData] = useState({
      propertyType: '',
      propertyAdType: '',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: 0,
      additionalInfo: ''
   });
   const [allProperties, setAllProperties] = useState([]);
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);

   const handleShow = (propertyId) => {
      const propertyToEdit = allProperties.find(property => property._id === propertyId);
      if (propertyToEdit) {
         setEditingPropertyId(propertyId);
         setEditingPropertyData(propertyToEdit);
         setShow(true);
      }
   };

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8000/api/owner/getallproperties', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });
         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error('Something went wrong');
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
   };
   
   const handleChange = (e) => {
      const { name, value } = e.target;
      setEditingPropertyData({ ...editingPropertyData, [name]: value });
   };

   const saveChanges = async (propertyId, status) => {
      try {
         const formData = new FormData();
         formData.append('propertyType', editingPropertyData.propertyType);
         formData.append('propertyAdType', editingPropertyData.propertyAdType);
         formData.append('propertyAddress', editingPropertyData.propertyAddress);
         formData.append('ownerContact', editingPropertyData.ownerContact);
         formData.append('propertyAmt', editingPropertyData.propertyAmt);
         formData.append('additionalInfo', editingPropertyData.additionalInfo);
         formData.append('propertyImage', image);
         formData.append('isAvailable', status);
         const res = await axios.patch(`http://localhost:8000/api/owner/updateproperty/${propertyId}`, formData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });
         if (res.data.success) {
            message.success(res.data.message);
            handleClose();
            getAllProperty();
         }
      } catch (error) {
         console.log(error);
         message.error('Failed to save changes');
      }
   };

   const handleDelete = async (propertyId) => {
      if (window.confirm("Are you sure you want to delete?")) {
         try {
            const response = await axios.delete(`http://localhost:8000/api/owner/deleteproperty/${propertyId}`, {
               headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });
            if (response.data.success) {
               message.success(response.data.message);
               getAllProperty();
            } else {
               message.error(response.data.message);
            }
         } catch (error) {
            console.log(error);
         }
      }
   };

   return (
      <div className=" px-3">
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell className="font-bold">Property ID</TableCell>
                     <TableCell align="center" className="font-bold">Property Type</TableCell>
                     <TableCell align="center" className="font-bold">Property Ad Type</TableCell>
                     <TableCell align="center" className="font-bold">Property Address</TableCell>
                     <TableCell align="center" className="font-bold">Owner Contact</TableCell>
                     <TableCell align="center" className="font-bold">Property Amt</TableCell>
                     <TableCell align="center" className="font-bold">Property Availability</TableCell>
                     <TableCell align="center" className="font-bold">Action</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {allProperties.map((property) => (
                     <TableRow key={property._id}>
                        <TableCell component="th" scope="row">{property._id}</TableCell>
                        <TableCell align="center">{property.propertyType}</TableCell>
                        <TableCell align="center">{property.propertyAdType}</TableCell>
                        <TableCell align="center">{property.propertyAddress}</TableCell>
                        <TableCell align="center">{property.ownerContact}</TableCell>
                        <TableCell align="center">{property.propertyAmt}</TableCell>
                        <TableCell align="center">{property.isAvailable ? 'Available' : 'Not Available'}</TableCell>
                        <TableCell align="center">
                           <button
                              onClick={() => handleShow(property._id)}
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                           >
                              Edit
                           </button>
                           <button
                              onClick={() => handleDelete(property._id)}
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                           >
                              Delete
                           </button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>

         {/* Modal */}
         {show && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                  <h2 className="text-xl font-semibold mb-4">Edit Property</h2>
                  <form>
                     <div className="mb-4">
                        <label className="block text-gray-700">Property Type</label>
                        <select
                           name="propertyType"
                           value={editingPropertyData.propertyType}
                           onChange={handleChange}
                           className="w-full mt-2 border border-gray-300 rounded p-2"
                        >
                           <option value="" disabled>Choose...</option>
                           <option value="residential">Residential</option>
                           <option value="commercial">Commercial</option>
                           <option value="land/plot">Land/Plot</option>
                        </select>
                     </div>
                     <div className="mb-4">
                        <label className="block text-gray-700">Property Ad Type</label>
                        <select
                           name="propertyAdType"
                           value={editingPropertyData.propertyAdType}
                           onChange={handleChange}
                           className="w-full mt-2 border border-gray-300 rounded p-2"
                        >
                           <option value="" disabled>Choose...</option>
                           <option value="rent">Rent</option>
                           <option value="sale">Sale</option>
                        </select>
                     </div>
                     <div className="mb-4">
                        <label className="block text-gray-700">Property Address</label>
                        <input
                           type="text"
                           name="propertyAddress"
                           value={editingPropertyData.propertyAddress}
                           onChange={handleChange}
                           className="w-full border border-gray-300 rounded p-2"
                        />
                     </div>
                     <div className="mb-4">
                        <label className="block text-gray-700">Property Image</label>
                        <input
                           type="file"
                           name="image"
                           onChange={handleImageChange}
                           className="w-full mt-2"
                        />
                     </div>
                     <div className="mb-4">
                        <label className="block text-gray-700">Owner Contact No.</label>
                        <input
                           type="text"
                           name="ownerContact"
                           value={editingPropertyData.ownerContact}
                           onChange={handleChange}
                           className="w-full border border-gray-300 rounded p-2"
                        />
                     </div>
                     <div className="mb-4">
                        <label className="block text-gray-700">Property Amt.</label>
                        <input
                           type="number"
                           name="propertyAmt"
                           value={editingPropertyData.propertyAmt}
                           onChange={handleChange}
                           className="w-full border border-gray-300 rounded p-2"
                        />
                     </div>
                     <div className="mb-4">
                        <label className="block text-gray-700">Additional Info</label>
                        <textarea
                           name="additionalInfo"
                           value={editingPropertyData.additionalInfo}
                           onChange={handleChange}
                           className="w-full border border-gray-300 rounded p-2"
                        />
                     </div>
                     <div className="flex justify-end">
                        <button
                           onClick={() => saveChanges(editingPropertyId, true)}
                           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                        >
                           Save
                        </button>
                        <button
                           onClick={handleClose}
                           className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                           Cancel
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

export default AllProperties;
