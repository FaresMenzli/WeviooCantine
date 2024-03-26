import "./App.css";
import Login from "./Components/Login/Login";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dishes from "./Components/Dishes/Dishes";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import StaffDashboard from "./Components/StaffDashboard/StaffDashboard";
import Cart from "./Components/Cart/Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import DishDetails from "./Components/DishDetails/DishDetails";
import { Dish } from "./Models/Dish";
import GridExample from "./Components/AgGrid/AgGrid";
import { AuthProvider } from "./Contexts/AuthContext";
import  WeviooNavbar  from "./Components/WeviooNavbar/WeviooNavbar";
import Home from "./Components/Home/Home";
import Notfound from "./Components/NotFound/Notfound";
import TestComponent from "./Components/TestComponent/TestComponent";
import { BackendUrlProvider } from "./Contexts/BackendUrlContext";
import { activeEnv } from "./util/constant";
import Footer from "./Components/Footer/Footer";


function App() {

  const getEnv =() => {
    return activeEnv();
  }

  return (
    <BrowserRouter>
    <div className="mode">{getEnv()}</div>
            <BackendUrlProvider>

     <AuthProvider>
      <Routes>
        
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="dishes" element={<Dishes />}></Route>
        <Route path="Admin" element={<AdminDashboard />}></Route>
        <Route path="Staff" element={<StaffDashboard />}></Route>
        <Route path="Cart" element={<Cart />}></Route>
        <Route path="/dishDetails/:id" element={<DishDetails ></DishDetails>} />
        <Route path="home" element={<Home />}></Route>
        <Route path="test" element={<TestComponent />}></Route>
        <Route path="*" element={<Notfound/>} />
      </Routes>
      <Footer></Footer>
      </AuthProvider>
      </BackendUrlProvider>
    
    </BrowserRouter>
  );
}
export default App;
