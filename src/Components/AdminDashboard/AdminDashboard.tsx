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
import "./../BI_Dashboard/Dashboard.css";
import "./AdminDashboard.css"

import { Trash, Pen, ArrowClockwise } from "react-bootstrap-icons";

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
import UpdateRoleModal from "./UpdateRoleModal/UpdateRoleModal";
import { showToast } from "../Toaster/toasterService";
import { ToastContainer } from "react-toastify";
import ManageUserTable from "./ManageUserTable/ManageUserTable";

interface AdminDashboardProps {}
//let users :User[] ;

const AdminDashboard: FC<AdminDashboardProps> = () => {
  const [userToUpdateRole, setUserToUpdateRole] = useState<
    User[] | undefined
  >();
  const [isUpdateRoleModalOpen, setUpdateRoleModalOpen] = useState(false);
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
  const handleCloseModal = () => {
    setUpdateRoleModalOpen(false);
  };
  const showMessage = () => {};
  const [view, setView] = useState("Dashboard");

  const [users, setusers] = useState([]);
  const { backendUrl } = useBackendUrl();
  const [loading, setLoading] = useState(true);
  const [updatingUser, setUpdatingUser] = useState(false);

  const url = `${backendUrl}/api/user/User`;

  const fetchUsers = () => {
    setUpdatingUser(true);
    interceptor
      .get(url)
      .then((response) => {
        setusers(response.data);
      })
      .then(() => {
        setLoading(false);
        setUpdatingUser(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (id: number) => {
    axios.delete(`${backendUrl}/deleteUserById/${id}`);
    window.location.reload();
  };


  return (
    <AdminDashboardWrapper className="adminDashboard">
      <ToastContainer />
      <WeviooNavbar />
      <TopBarLinks shrunk={isNavbarShrunk}>
        <Links
          onClick={() => setView("userList")}
          className={`${
            view === "userList" ? "text-decoration-underline" : ""
          } clickable white`}
        >
          Users List
        </Links>
        <Links
          onClick={() => setView("Dashboard")}
          className={`${
            view === "Dashboard" ? "text-decoration-underline" : ""
          } clickable white`}
        >
          Dashboard
        </Links>
        <Links
          onClick={() => setView("orderList")}
          className={`${
            view === "orderList" ? "text-decoration-underline" : ""
          } clickable white`}
        >
          Orders
        </Links>
      </TopBarLinks>
      
        {loading ? (
          <WeviooSpinner></WeviooSpinner>
        ) : (
          <>
           
              {view === "userList" ? (
                <div
          className=" d-flex flex-column justify-content-center align-items-center w-100 py-2 px-3"
        >
                <div className=" rounded-3 w-75 bg-light p-2 mt-5 ">

                  <ManageUserTable data={users}></ManageUserTable>
                </div>
                </div>

              ) : view === "Dashboard" ? (
                <Dashboard />
              ) : (
                <OrderList></OrderList>
              )}
              {/*     </div> */}
              {/*  {view === "userList" ? (<div ><Table  data={users} itemsPerPage={2}></Table></div>) */}
           
          </>
        )}
      
    </AdminDashboardWrapper>
  );
};

export default AdminDashboard;
