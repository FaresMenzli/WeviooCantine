import React, { FC, useEffect, useState } from "react";
import {
  AdminDashboardWrapper,
  AdminLeftBar,
  MainDashboard,
  RightBarDashboard,
  TopBarDashboard,
} from "./AdminDashboard.styled";
import axios from "axios";
import { User } from "../../Models/User";
import { url } from "inspector";
import { Trash, Pen } from "react-bootstrap-icons";
import { useAuth } from "../../Contexts/AuthContext";
import apiService from "../../Interceptor/Interceptor";
import interceptor from "../../Interceptor/Interceptor";
import WeviooNavbar from "../WeviooNavbar/WeviooNavbar";
import AccordionMenu from "./AccordionMenu/AccordionMenu";


interface AdminDashboardProps {}
//let users :User[] ;

const AdminDashboard: FC<AdminDashboardProps> = () => {
  const [users, setusers] = useState([]);
  const baseURL = `http://localhost:5000`;
  const { token } = useAuth();
  useEffect(() => {
    const url = `${baseURL}/api/user/User`;
    interceptor.get(url).then((response) => {
      setusers(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);
  const deleteUser = (id: number) => {
    console.log(id);
    console.log("deletUser");
    console.log(`${baseURL}/deleteUserById/${id}`);
    axios.delete(`${baseURL}/deleteUserById/${id}`);
    window.location.reload();
  };

  return (
    <AdminDashboardWrapper>
      <WeviooNavbar></WeviooNavbar>
      <TopBarDashboard>
       <div className="white pt-1">Users List</div>
       <div className="white pt-1">Dashboard</div>
       <div className="white pt-1">Orders</div>
      </TopBarDashboard>
      <MainDashboard>
    
        <div className="adminDashboard" >
          <AdminLeftBar>
          <AccordionMenu />
          </AdminLeftBar>
         
          <div className="pb-5 d-flex align-items-center justify-content-center mt-5">
          <table className="text-center" >
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
            <tfoot></tfoot>
          </table>
          </div>
        </div>
      </MainDashboard>
    </AdminDashboardWrapper>
  );
};

export default AdminDashboard;
