import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import p4 from '../../images/rb_134520.png';
import AllPropertiesCards from '../user/AllPropertiesCards';
import Navbar from './Navbar';

const Home = () => {
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   return (
      <>
         <Navbar />

         <section>
            <div className="bg-slate-700 text-white min-h-screen flex items-center py-20">
               <div className="container mx-auto flex flex-col md:flex-row items-center">
                  <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
                     <h1 className="text-3xl md:text-5xl p-2 text-yellow-300 tracking-loose">Find Your Dream Home</h1>
                     <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">Your Next Home Awaits</h2>
                     <p className="text-sm md:text-base text-gray-50 mb-4">
                        Explore a wide variety of rental properties and find the perfect space to call home. Sign up now to start browsing!
                     </p>
                     <Link to="/login" className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
                        Login
                     </Link>
                  </div>
                  <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 flex justify-center">
                     <img src={p4} alt="Home Example" className="max-w-full h-auto" />
                  </div>
               </div>
            </div>
         </section>

         <div className="text-center mt-12">
            <h1 className="text-3xl font-semibold mb-4">All Properties That May Interest You</h1>
            <p className="text-sm font-bold mb-6">
               Want to post your Property?{' '}
               <Link to="/register">
                  <button className="text-blue-500 hover:text-blue-700 border border-blue-500 px-3 py-1 rounded">
                     Register as Owner
                  </button>
               </Link>
            </p>
            <div className="container mx-auto">
               <AllPropertiesCards />
            </div>
         </div>
      </>
   );
};

export default Home;
