import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import AllPropertiesCards from '../AllPropertiesCards';
import AllProperty from './AllProperties';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="p-6">
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

const RenterHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      
     
      <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 left-0 z-10">
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
          <button onClick={toggleSidebar} className="block md:hidden text-gray-700">
            <MenuIcon />
          </button>
        </div>
      </nav>

     
      <div className="flex pt-[64px]"> 
        
        <div
          className={`fixed md:static top-0 left-0 h-[100vh] w-3/4 md:w-1/4 bg-gray-100 p-4 space-y-4 border-r shadow-lg transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <button
            className={`py-2 px-4 rounded-lg font-medium text-left w-full ${
              value === 0 ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-gray-200'
            }`}
            onClick={() => { handleChange(0); setSidebarOpen(false); }}
          >
            All Properties Cards
          </button>
          <button
            className={`py-2 px-4 rounded-lg font-medium text-left w-full ${
              value === 1 ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-gray-200'
            }`}
            onClick={() => { handleChange(1); setSidebarOpen(false); }}
          >
            All Properties
          </button>
        </div>

       
        <main className="w-full md:ml-[25%] p-6">
          <CustomTabPanel value={value} index={0}>
            <div className="container mx-auto p-4">
              <AllPropertiesCards loggedIn={user.userLoggedIn} />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="container mx-auto p-4">
              <AllProperty />
            </div>
          </CustomTabPanel>
        </main>
      </div>
    </div>
  );
};

export default RenterHome;
