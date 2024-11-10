import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Carousel, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AllPropertiesCards = ({ loggedIn }) => {
   const [index, setIndex] = useState(0);
   const [show, setShow] = useState(false);
   const [allProperties, setAllProperties] = useState([]);
   const [filterPropertyType, setPropertyType] = useState('');
   const [filterPropertyAdType, setPropertyAdType] = useState('');
   const [filterPropertyAddress, setPropertyAddress] = useState('');
   const [propertyOpen, setPropertyOpen] = useState(null);
   const [userDetails, setUserDetails] = useState({
      fullName: '',
      phone: 0,
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserDetails({ ...userDetails, [name]: value });
   };

   const handleClose = () => setShow(false);

   const handleShow = (propertyId) => {
      setPropertyOpen(propertyId);
      setShow(true);
   };

   const getAllProperties = async () => {
      try {
         const res = await axios.get('http://localhost:8000/api/user/getAllProperties');
         setAllProperties(res.data.data);
      } catch (error) {
         console.log(error);
         message.error('Failed to fetch properties');
      }
   };

   const handleBooking = async (status, propertyId, ownerId) => {
      try {
         const res = await axios.post(
            `http://localhost:8000/api/user/bookinghandle/${propertyId}`,
            { userDetails, status, ownerId },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            }
         );
         if (res.data.success) {
            message.success(res.data.message);
            handleClose();
         } else {
            message.error(res.data.message);
         }
      } catch (error) {
         console.log(error);
         message.error('Failed to book property');
      }
   };

   useEffect(() => {
      getAllProperties();
   }, []);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   const filteredProperties = allProperties
      .filter(
         (property) =>
            filterPropertyAddress === '' || property.propertyAddress.includes(filterPropertyAddress)
      )
      .filter(
         (property) =>
            filterPropertyAdType === '' ||
            property.propertyAdType.toLowerCase().includes(filterPropertyAdType.toLowerCase())
      )
      .filter(
         (property) =>
            filterPropertyType === '' ||
            property.propertyType.toLowerCase().includes(filterPropertyType.toLowerCase())
      );

   return (
      <>
         <div className="navbar bg-slate-400 text-white flex flex-wrap md:flex-nowrap justify-between items-center p-4">
  
  
            <div className="text-center w-full md:w-auto mb-4 md:mb-0">
                <h1 className="text-xl font-semibold">Property Finder</h1>
            </div>

            
            <div className="filter-container flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                
                <input
                type="text"
                placeholder="Address"
                value={filterPropertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                className="border p-2 rounded w-full md:w-auto"
                />
                
                <select
                value={filterPropertyAdType}
                onChange={(e) => setPropertyAdType(e.target.value)}
                className="border text-slate-950 p-2 rounded w-full md:w-auto"
                >
                <option value="">All Ad Types</option>
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
                </select>
                
                <select
                value={filterPropertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="border p-2 rounded text-slate-950 w-full md:w-auto"
                >
                <option value="">All Types</option>
                <option value="commercial">Commercial</option>
                <option value="land/plot">Land/Plot</option>
                <option value="residential">Residential</option>
                </select>
            </div>
            </div>


         <div className="flex flex-wrap justify-start mt-5">
            {filteredProperties && filteredProperties.length > 0 ? (
               filteredProperties.map((property) => (
                <Card
                key={property._id}
                className={`bg-white rounded-lg overflow-hidden shadow-lg ring-4 ${property.propertyAdType === 'sale' ? 'ring-red-500' : 'ring-green-500'} ring-opacity-40 max-w-sm m-4`}
              >
                <div className="relative">
                  
                  {property.propertyImage && property.propertyImage.length > 0 && (
                    <img
                      src={`http://localhost:8000${property.propertyImage[0].path}`}
                      alt="Property"
                      className="w-full h-48 object-cover"
                    />
                  )}
                  
                  <div className={`absolute top-0 right-0 text-white px-2 py-1 m-2 rounded-md text-sm font-medium 
                ${property.propertyAdType === 'sale' ? 'bg-red-500' : 'bg-green-500'}`}
                >
                {property.propertyAdType}
                </div>

                </div>
              
                <div className="p-4">
                 
                  <h3 className="text-lg font-medium mb-2">{property.propertyAddress}</h3>
              
                 
                  <p className="text-gray-600 text-sm mb-4">
                    <span className="font-semibold">Property Type:</span> {property.propertyType} <br />
                   
                  </p>
              
                  {/* Conditional Info Display */}
                  {!loggedIn ? (
                    <>
                      <p className="text-sm text-orange-500 mt-2">For more details, click on get info</p>
                      <Link to={'/login'}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
                          Get Info
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Owner Contact:{property.ownerContact}</p>  <br />
                      <p className="font-semibold">Availability:{property.isAvailable}</p>  <br />
                      <p className="font-semibold">Property Amount:Rs. {property.propertyAmt}</p>  <br />
                      
                      {property.isAvailable === 'Available' && (
                        <button
                          onClick={() => handleShow(property._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mt-4"
                        >
                          Get Info
                        </button>
                      )}
                    </>
                  )}
                </div>
              
                
                <Modal show={show && propertyOpen === property._id} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Property Info</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                   
                    {property.propertyImage && property.propertyImage.length > 0 && (
                      <Carousel activeIndex={index} onSelect={handleSelect}>
                        {property.propertyImage.map((image, idx) => (
                          <Carousel.Item key={idx}>
                            <img
                              src={`http://localhost:8000${image.path}`}
                              alt={`Image ${idx + 1}`}
                              className="d-block w-100"
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    )}
              
                   
                    <div className="my-4">
                      <p className="font-semibold">Owner Contact:</p> {property.ownerContact} <br />
                      <p className="font-semibold">Availability:</p> {property.isAvailable} <br />
                      <p className="font-semibold">Property Amount:</p> Rs.{property.propertyAmt} <br />
                      <p className="font-semibold">Location:</p> {property.propertyAddress} <br />
                      <p className="font-semibold">Property Type:</p> {property.propertyType} <br />
                      <p className="font-semibold">Ad Type:</p> {property.propertyAdType} <br />
                      <p className="font-semibold">Additional Info:</p> {property.additionalInfo}
                    </div>
              
                   
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleBooking('pending', property._id, property.ownerId);
                      }}
                    >
                      <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                          <Form.Label>Full Name</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type="text"
                              placeholder="Full Name"
                              required
                              name="fullName"
                              value={userDetails.fullName}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </Form.Group>
              
                        <Form.Group as={Col} md="6">
                          <Form.Label>Phone Number</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type="number"
                              placeholder="Phone Number"
                              required
                              name="phone"
                              value={userDetails.phone}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </Form.Group>
                      </Row>
                      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mt-3">
                        Book Property
                      </button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </Card>
              
               ))
            ) : (
               <p>No Properties available at the moment.</p>
            )}
         </div>
      </>
   );
};

export default AllPropertiesCards;
