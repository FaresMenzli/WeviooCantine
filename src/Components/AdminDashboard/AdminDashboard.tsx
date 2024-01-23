import React, { FC } from "react";
import {
  AdminDashboardWrapper,
  DetailsDashboard,
  MainDashboard,
  RightBarDashboard,
  TopBarDashboard,
} from "./AdminDashboard.styled";

interface AdminDashboardProps {}

const users = [
  { id: 1, name: "Fares", surname: "El Ouissi", role: "user" },
  { id: 1, name: "Bilel", surname: "Ribery", role: "admin" },
  { id: 1, name: "Robert", surname: "Lewandowski", role: "staff" },
  { id: 1, name: "Thomas", surname: "Müller", role: "user" },
];
const AdminDashboard: FC<AdminDashboardProps> = () => (
  <AdminDashboardWrapper>
    <TopBarDashboard></TopBarDashboard>
    <MainDashboard>
      <RightBarDashboard></RightBarDashboard>
      <DetailsDashboard>
       <div><input type="button" value="Add new user" /></div>

         <thead> 
            <th>Action</th>
            <th>id</th>
    <th>name</th>
    <th>surname</th></thead>
         {users.map(user=>
         <tr>
            <td><input type="button" value="update" /><input type="button" value="delete" /></td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
         </tr>
            
            
            )}
      </DetailsDashboard>
    </MainDashboard>
  </AdminDashboardWrapper>
);

export default AdminDashboard;
