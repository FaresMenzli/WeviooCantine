import "./App.css";
import Login from "./Components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dishes from "./Components/Dishes/Dishes";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import StaffDashboard from "./Components/StaffDashboard/StaffDashboard";
import Cart from "./Components/Cart/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import DishDetails from "./Components/DishDetails/DishDetails";

import { AuthProvider } from "./Contexts/AuthContext";

import Home from "./Components/Home/Home";
import Notfound from "./Components/NotFound/Notfound";
import TestComponent from "./Components/TestComponent/TestComponent";
import { BackendUrlProvider } from "./Contexts/BackendUrlContext";
import { activeEnv } from "./util/constant";
import Footer from "./Components/Footer/Footer";
import ShowEnv from "./Components/showEnvironement/ShowEnv";
import Dashboard from "./Components/BI_Dashboard/Dashboard";
import Podium from "./Components/BI_Dashboard/Podium";
import { useEffect, useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
  const [userRole, setUserRole] = useState<string | null>(null);

  // Simulate fetching user role
  useEffect(() => {
    // Your logic to fetch the user's role
    // This is just a simulation
    setUserRole("COLLAB"); // Set to "admin" or "user" to see the effect
  }, []);

  return (
    <BrowserRouter>
      <BackendUrlProvider>
        <AuthProvider>
          <ShowEnv></ShowEnv>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="dishes" element={<Dishes />}></Route>
          {/*   <Route path="Staff" element={<StaffDashboard />}></Route> */}
            <Route path="Staff"   element={
                        <PrivateRoute roles={['ADMIN','KITCHEN_STAFF']}>
                            <StaffDashboard />
                        </PrivateRoute>
                    }></Route>
            <Route path="Cart" element={<Cart />}></Route>
            <Route
              path="/dishDetails/:id"
              element={<DishDetails></DishDetails>}
            />
            <Route path="home" element={<Home />}></Route>      

            <Route path="*" element={<Notfound />} />
           <Route path="Admin"   element={
                        <PrivateRoute roles={['ADMIN']}>
                            <AdminDashboard />
                        </PrivateRoute>
                    }>
            

           </Route>
          </Routes>
          <Footer></Footer>
        </AuthProvider>
      </BackendUrlProvider>
    </BrowserRouter>
  );
}
export default App;
