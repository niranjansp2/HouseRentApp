import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

function AddProperty() {
   const [image, setImage] = useState(null);
   const [propertyDetails, setPropertyDetails] = useState({
      propertyType: 'residential',
      propertyAdType: 'rent',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: 0,
      additionalInfo: ''
   });

   // Handle image change
   const handleImageChange = (e) => {
      const files = e.target.files;
      setImage(files); // Keep the file list in state
   };

   // Handle form field changes
   const handleChange = (e) => {
      const { name, value } = e.target;
      setPropertyDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      
      // Ensure propertyAmt is treated as a number
      const formData = new FormData();
      formData.append('propertyType', propertyDetails.propertyType);
      formData.append('propertyAdType', propertyDetails.propertyAdType);
      formData.append('propertyAddress', propertyDetails.propertyAddress);
      formData.append('ownerContact', propertyDetails.ownerContact);
      formData.append('propertyAmt', propertyDetails.propertyAmt);
      formData.append('additionalInfo', propertyDetails.additionalInfo);

      // Append images if any
      if (image) {
         for (let i = 0; i < image.length; i++) {
            formData.append('propertyImages', image[i]);
         }
      }

      axios.post('http://localhost:8000/api/owner/postproperty', formData, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
         }
      })
      .then((res) => {
         if (res.data.success) {
            message.success(res.data.message);
         } else {
            message.error(res.data.message);
         }
      })
      .catch((error) => {
         console.error('Error adding property:', error);
      });
   };

   return (
      <div className="flex w-full h-full items-center justify-center p-12">
         <div className="mx-auto w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label htmlFor="ownerName" className="block text-base font-medium text-gray-700">Owner Name</label>
                  <input type="text" name="ownerName" id="ownerName" placeholder="Owner Name"
                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
               </div>

               <div className="mb-4">
                  <label htmlFor="proType" className="block text-base font-medium text-gray-700">Property Type</label>
                  <select
                     name="propertyType" 
                     value={propertyDetails.propertyType}
                     onChange={handleChange}
                     id="proType"
                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  >
                     <option value="residential">Residential</option>
                     <option value="commercial">Commercial</option>
                     <option value="land/plot">Land/Plot</option>
                  </select>
               </div>

               <div className="mb-4">
                  <label htmlFor="proAdType" className="block text-base font-medium text-gray-700">Property AD Type</label>
                  <select
                     name="propertyAdType"  
                     value={propertyDetails.propertyAdType}
                     onChange={handleChange}
                     id="proAdType"
                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  >
                     <option value="rent">Rent</option>
                     <option value="sale">Sale</option>
                  </select>
               </div>

               <div className="mb-4">
                  <label htmlFor="proAmt" className="block text-base font-medium text-gray-700">Property Amount</label>
                  <input type="number" name="propertyAmt"
                     value={propertyDetails.propertyAmt}
                     onChange={handleChange}
                     required id="proAmt" placeholder="Property Amount"
                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
               </div>

               <div className="mb-4">
                  <label htmlFor="ownerContact" className="block text-base font-medium text-gray-700">Owner Mobile number</label>
                  <input type="number" name="ownerContact"
                     value={propertyDetails.ownerContact}
                     onChange={handleChange}
                     required id="ownerContact" placeholder="contact number"
                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
               </div>

               <div className="mb-4">
                  <label htmlFor="fullAddress" className="block text-base font-medium text-gray-700">Property Full Address</label>
                  <input type="text" name="propertyAddress"
                     value={propertyDetails.propertyAddress}
                     onChange={handleChange} id="fullAddress" placeholder="Enter property address"
                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
               </div>

               <div className="mb-4">
                  <label htmlFor="proImg" className="block text-base font-medium text-gray-700">Property Images</label>
                  <input type="file" name="propertyImages" id="proImg" placeholder="Upload property images" multiple accept="image/*"
                     onChange={handleImageChange}
                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
               </div>

               <div className="mb-4">
                  <label htmlFor="AddiDet" className="block text-base font-medium text-gray-700">Additional Details</label>
                  <textarea name="additionalInfo"
                     value={propertyDetails.additionalInfo}
                     onChange={handleChange} id="AddiDet" placeholder="Enter additional details"
                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"></textarea>
               </div>

               <div>
                  <button type="submit"
                     className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                     Submit Property
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default AddProperty;
