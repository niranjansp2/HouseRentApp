import { createContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminHome from "./modules/admin/AdminHome";
import ForgotPassword from "./modules/common/ForgotPassword";
import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import OwnerHome from "./modules/user/Owner/OwnerHome";
import RenterHome from "./modules/user/renter/RenterHome";

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const getData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="flex flex-col min-h-screen">
        <Router>
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              {userLoggedIn ? (
                <>
                  <Route path="/adminhome" element={<AdminHome />} />
                  <Route path="/ownerhome" element={<OwnerHome />} />
                  <Route path="/renterhome" element={<RenterHome />} />
                </>
              ) : (
                <Route path="/login" element={<Login />} />
              )}
            </Routes>
          </div>
          <footer className="bg-gray-100 text-center text-lg p-3 mt-auto">
            <div>© {date} RentEase</div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
