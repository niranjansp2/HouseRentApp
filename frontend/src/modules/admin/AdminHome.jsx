import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import AllBookings from './AllBookings';
import AllProperty from './AllProperty';
import AllUsers from './AllUsers';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className="p-6 w-full"
    >
      {value === index && children}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const AdminHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 py-4 px-8 flex justify-between items-center z-10">
        <h2 className="text-2xl font-bold text-gray-800">Namma Veedu</h2>
        <div className="flex items-center space-x-4">
          <h5 className="text-lg font-semibold text-gray-700">Hi {user.userData?.name || 'User'}</h5>
          <Link
            onClick={handleLogOut}
            to="/"
            className="text-blue-500 hover:text-blue-700"
          >
            Log Out
          </Link>
        </div>
      </nav>

      <div className="flex flex-grow mt-16"> 
        
        <div className="w-1/4 bg-gray-100 p-4 space-y-4 border-r fixed h-screen top-16 left-0 z-10 md:w-1/3 lg:w-1/4">
          <button
            className={`py-2 px-4 rounded-lg font-medium text-left w-full ${
              value === 0 ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-gray-200'
            }`}
            onClick={() => handleChange(0)}
          >
            All Users
          </button>
          <button
            className={`py-2 px-4 rounded-lg font-medium text-left w-full ${
              value === 1 ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-gray-200'
            }`}
            onClick={() => handleChange(1)}
          >
            All Properties
          </button>
          <button
            className={`py-2 px-4 rounded-lg font-medium text-left w-full ${
              value === 2 ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-gray-200'
            }`}
            onClick={() => handleChange(2)}
          >
            All Bookings
          </button>
        </div>

      
        <div className="ml-1/4 w-full p-6 md:ml-1/3 lg:ml-1/4">
          <CustomTabPanel value={value} index={0}>
            <AllUsers />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AllProperty />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <AllBookings />
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
