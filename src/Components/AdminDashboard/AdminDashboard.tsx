import React, { FC, useEffect, useState } from "react";
import {
  AdminDashboardWrapper,
  AdminLeftBar,
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


interface AdminDashboardProps {}
//let users :User[] ;

const AdminDashboard: FC<AdminDashboardProps> = () => {
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
       <TopBarDashboard>
       <div className="white pt-1">Users List</div>
       <div className="white pt-1">Dashboard</div>
       <div className="white pt-1">Orders</div>
      </TopBarDashboard>
      <div className="adminDashboard" > 
      {loading? (<WeviooSpinner></WeviooSpinner> ):(
        <>
    
      <MainDashboard>
    
       
          <AdminLeftBar>
          <AccordionMenu />
          </AdminLeftBar>
         
          <div className="pb-5 d-flex align-items-start justify-content-center mt-5 w-100 ">
         {/*  <table className="text-center userListTable" >
            <thead>
              <tr>
              <th>Actions</th>
              <th>id</th>
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
                <td>{user.userId}</td>
                <td>{user.userFirstName}</td>
                <td>{user.userLastName}</td>
              </tr>
            ))}</tbody>
            <tfoot> <tr>
              <th>Actions</th>
              <th>id</th>
              <th>name</th>
              <th>surname</th>
              </tr></tfoot>
          </table> */}
          <Table  data={users} itemsPerPage={2}></Table>
          </div>
       
      </MainDashboard></>)}
      </div>
    </AdminDashboardWrapper>
  );
};

export default AdminDashboard;
