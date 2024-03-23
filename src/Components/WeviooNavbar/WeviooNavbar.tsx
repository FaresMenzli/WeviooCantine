import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { useAuth } from "../../Contexts/AuthContext";
import styles from "./WeviooNavbar.module.css";
import { BasketFill, ChevronDown } from "react-bootstrap-icons";
import { CartItems, CartSpan } from "../Dishes/Dishes.styled";

import { useLocation, useNavigate } from "react-router-dom";

const WeviooNavbar: FC = () => {
  const [staffPage, setStaffPage] = useState(false)
  const location =useLocation()
  const { user ,logout} = useAuth();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.value);
  let init: number = 0;
  useEffect(() => {
    if(location.pathname.toLowerCase().includes("staff")){
      setStaffPage(true)

    }
   
  }, [])




  return (
    
    <div className={styles.Navbar+" "+(staffPage ? styles.staff : '')}>
      <div>
        <img className="clickable"  onClick={() => navigate("/home")} src={require("../../assets/logo_0.png")} alt="logo" />
      </div>

      <div className={styles.linkGroup}>
        <div onClick={()=>navigate("/admin")} className={`${styles.link} clickable`}>Admin Dashboard</div>
        <div onClick={()=>navigate("/staff")} className={`${styles.link} clickable`}>Staff Dashboard</div>
        <div onClick={()=>navigate("/dishes")} className={`${styles.link} clickable`}>Dish List</div>
        
        <div className={styles.dropdown}>
          <img
            className={`${styles.profileImage} me-2`}
            src={require("../../assets/GenericProfileImage.png")}
            alt="img"
          />
          {user && <span className="me-2">
            {user?.userFirstName} 
          </span>}
          {!user && <span onClick={()=>navigate("/login")} className="me-2">
           Login
          </span>} 
          <ChevronDown></ChevronDown>
          <div className={styles.dropdownContent}>
            <p>{user?.userFirstName} {user?.userLastName.toUpperCase()}</p>
            <p>{user?.userEmail}</p>
            <p>MYOrders</p>
            <p onClick={logout}>Logout</p>
          </div>
        </div>
        <div className="d-flex ms-5">
             
             <BasketFill
               color="white"
               className="clickable iconSize"
               onClick={() => navigate("/cart")}
             ></BasketFill>
             <CartSpan>
               <CartItems className="white">
                 {cart.reduce((a, b) => a + b.quantity, init)}{" "}
               </CartItems>
             </CartSpan>
           </div>
      </div>
    </div>
  );
};

export default WeviooNavbar;
