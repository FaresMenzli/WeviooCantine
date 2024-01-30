import { useState } from 'react';
import './App.css';
import pokemon from "./Pokemon.json"
import Login from './Components/Login/Login';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import Dishes from './Components/Dishes/Dishes';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import StaffDashboard from './Components/StaffDashboard/StaffDashboard';
import Cart from './Components/Cart/Cart';
//import type { RootState } from '../src/redux/store'
function App() {
  const [firstname, setFirstname]=useState("Fares El Ouissi")
  const handleChange=(e:any)=>{setFirstname(e.target.value)}
  const reset = ()=>{setFirstname("")}




  return (
    <BrowserRouter>
<Routes>
<Route path='login' element={<Login/>}></Route>
<Route path='dishes' element={<Dishes/>}></Route>
<Route path='Admin' element={<AdminDashboard/>}></Route>
<Route path='Staff' element={<StaffDashboard/>}></Route>
<Route path='Cart' element={<Cart/>}></Route>



</Routes>

</BrowserRouter>
  );
}
export default App;
function useSelector(arg0: (state: any) => any, arg1: { count: any; }): { count: any; } {
  throw new Error('Function not implemented.');
}

