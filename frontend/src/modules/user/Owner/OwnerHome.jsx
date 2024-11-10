import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import AddProperty from './AddProperty';
import AllBookings from './AllBookings';
import AllProperties from './AllProperties';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="p-4">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const OwnerHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-100 p-4 shadow-lg fixed top-0 left-0 w-full  z-30 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-indigo-600">Namma Veedu</h2>
          <button onClick={toggleSidebar} className="block md:hidden text-gray-700">
            <MenuIcon />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium text-gray-700">Hi, {user.userData.name}</span>
          <Link onClick={handleLogOut} to="/" className="text-indigo-600 hover:underline">
            Log Out
          </Link>
        </div>
      </nav>

      <div className="flex flex-grow   mt-36">
        
        <div
          className={`fixed top-0 left-0 w-1/4 lg:w-1/5 bg-gray-100 p-4 space-y-4 border-r shadow-lg h-full flex flex-col z-20 md:translate-x-0 transition-transform duration-300`}
        >
          <button
            className={`py-2  mt-16 px-4 rounded-lg font-medium text-left w-full ${
              value === 0 ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-gray-200'
            }`}
            onClick={() => handleChange(0)}
          >
            Add Property
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

        
        <div className="flex-grow p-6 md:ml-1/4 lg:ml-1/5">
          <CustomTabPanel value={value} index={0}>
            <AddProperty />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AllProperties />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <AllBookings />
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
