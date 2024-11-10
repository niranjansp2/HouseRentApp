import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import p4 from '../../images/Logo.png';
import Navbar from './Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return message.error("Please fill all fields");
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/user/login', data);
      if (response.data.success) {
        message.success(response.data.message);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        const user = JSON.parse(localStorage.getItem("user"));

        switch (user.type) {
          case "Admin":
            navigate("/adminhome");
            break;
          case "Renter":
            navigate("/renterhome");
            break;
          case "Owner":
            if (user.granted === 'ungranted') {
              message.error('Your account is not yet confirmed by the admin');
            } else {
              navigate("/ownerhome");
            }
            break;
          default:
            navigate("/login");
            break;
        }
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        message.error("User doesn't exist");
      } else {
        message.error("An error occurred. Please try again.");
      }
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={p4} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

           
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                <div className="text-sm">
                  <Link className="font-semibold text-indigo-600 hover:text-indigo-500" to={'/forgotpassword'} variant="body2">
                    {"Click here to reset your password"}
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md ${loading ? 'bg-gray-500' : 'bg-indigo-600'} px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account? 
            <Link className="font-semibold text-indigo-600 hover:text-indigo-500" to={'/register'}>Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
