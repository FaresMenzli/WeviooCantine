import React, { FC, useEffect, useState } from "react";
import {
  AdminDashboardWrapper,
  AdminLeftBar,
  Form,
  Label,
  MainDashboard,

  TopBarDashboard,
} from "./AdminDashboard.styled";
import axios from "axios";
import { User } from "../../Models/User";

import { Trash, Pen } from "react-bootstrap-icons";


import interceptor from "../../Interceptor/Interceptor";
import WeviooNavbar from "../WeviooNavbar/WeviooNavbar";
import AccordionMenu from "./AccordionMenu/AccordionMenu";
import { useBackendUrl } from "../../Contexts/BackendUrlContext";
import Table from "../TestComponent/Table";
import WeviooSpinner from "../WeviooSpinner/WeviooSpinner";
import Dashboard from "../BI_Dashboard/Dashboard";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { option } from "yargs";
import OrderList from "../StaffDashboard/OrdersList/OrdersList";
import { Links, TopBarLinks } from "../StaffDashboard/StaffDashboard.styled";


interface AdminDashboardProps {}
//let users :User[] ;

const AdminDashboard: FC<AdminDashboardProps> = () => {

  const [isNavbarShrunk, setIsNavbarShrunk] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      setIsNavbarShrunk(!isTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [view, setView] = useState("Dashboard");
  

  const [users, setusers] = useState([]);
  const { backendUrl } = useBackendUrl();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = `${backendUrl}/api/user/User`;
    interceptor.get(url).then((response) => {
      setusers(response.data);
    }).then(()=>setLoading(false))
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);


  const deleteUser = (id: number) => {
    axios.delete(`${backendUrl}/deleteUserById/${id}`);
    window.location.reload();
  };

  return (
    <AdminDashboardWrapper>
      <WeviooNavbar/>
       <TopBarLinks shrunk={isNavbarShrunk}>
      
       <Links onClick={()=>setView("userList")} className={`${view==="userList" ? "text-decoration-underline" : ""} clickable white`} >Users List</Links>
       <Links onClick={()=>setView("Dashboard")}  className={`${view==="Dashboard" ? "text-decoration-underline" : ""} clickable white`}>Dashboard</Links>
       <Links onClick={()=>setView("orderList")}  className={`${view==="orderList" ? "text-decoration-underline" : ""} clickable white`}>Orders</Links>
      </TopBarLinks>
      <div className="adminDashboard pt-5" > 
      {loading? (<WeviooSpinner></WeviooSpinner> ):(
        <>
    
      <MainDashboard>
    
       
         
      {view === "userList" ? (
          <div className="pb-5 d-flex align-items-start justify-content-center mt-5 w-100 ">
          <table className="text-center userListTable" >
            <thead>
              <tr>
              <th>Actions</th>
              <th>Role</th>
              <th>change Role</th>
              <th>name</th>
              <th>surname</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user: User) => (
              
              <tr key={user.userId}>
                <td>
                <Pen color="white" className="me-3 clickable" ></Pen>
                  <Trash className="clickable" onClick={() => deleteUser(user.userId)} color="red"> </Trash>
                </td>
                <td>{user.userRole}</td>
                <td><select name="" id=""><option value="admin">admin</option>
                <option value="collab">collab</option>
                <option value="staff">staff</option></select></td>
                <td>{user.userFirstName}</td>
                <td>{user.userLastName}</td>
              </tr>
            ))}</tbody>
            <tfoot> <tr>
              <th>Actions</th>
              <th>Role</th>
              <th>change Role</th>
              <th>name</th>
              <th>surname</th>
              </tr></tfoot>
          </table>
          </div>)

       
          
          :view === "Dashboard"  ?(<Dashboard />):(<OrderList></OrderList>)
          }
      {/*     </div> */}
         {/*  {view === "userList" ? (<div ><Table  data={users} itemsPerPage={2}></Table></div>) */}
      </MainDashboard></>)}
      </div>
    </AdminDashboardWrapper>
  );
};

export default AdminDashboard;
