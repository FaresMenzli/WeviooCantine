import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { useAuth } from "../../Contexts/AuthContext";
import styles from "./WeviooNavbar.module.css";
import { BasketFill, ChevronDown } from "react-bootstrap-icons";
import { CartItems, CartSpan } from "../Dishes/Dishes.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { Dish } from "../../Models/Dish";
import CartDropDown from "./CartDropDown/CartDropDown";

const WeviooNavbar: FC = () => {

  const [staffPage, setStaffPage] = useState(false)
  const location =useLocation()
  const { user ,logout} = useAuth();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.value);
  let init: number = 0;
  const { data, loading, error } = useSelector(
    (state: RootState) => state.dishes
  );
  useEffect(() => {
    if(location.pathname.toLowerCase().includes("staff")){
      setStaffPage(true)

    }
   
  }, [location.pathname])




  return (
    
    <div className={styles.Navbar+" "+(staffPage ? styles.staff : '')}>
      <div>
        <img className="clickable"  onClick={() => navigate("/home")} src={require("../../assets/logo_0.png")} alt="logo" />
      </div>

      <div className={styles.linkGroup}>
        <div hidden={user?.userRole!="ADMIN"} onClick={()=>navigate("/admin")} className={`${styles.link} clickable`}>Admin Dashboard</div>
        <div hidden={user?.userRole!="ADMIN" && user?.userRole!="KITCHEN_STAFF"} onClick={()=>navigate("/staff")} className={`${styles.link} clickable`}>Staff Dashboard</div>
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
            <div >{user?.userFirstName} {user?.userLastName.toUpperCase()}</div>
            <hr className="m-2 " />
            <div >{user?.userEmail}</div>
            <hr className="m-2 " />
            <div className="clickable" onClick={()=>navigate("/cart")}>MyOrders</div>
            <hr className="m-2 " />
            <div className="clickable" onClick={logout}>Logout</div>
          </div>
        </div>
        <div className={`d-flex align-items-center  ms-5 ${styles.dropdownCart}`}>
             
             <BasketFill
               color="white"
              
               className={`clickable iconSize`}
               onClick={() => navigate("/cart")}
             >
                
             </BasketFill>
          
             <CartSpan>
               <CartItems className="white">
                 {cart.reduce((a, b) => a + b.quantity, init)}{" "}
               </CartItems>
             </CartSpan>
             <div className={styles.dropdownContentCart}>
           <CartDropDown></CartDropDown>
                 </div>
           </div>
      </div>
    </div>
  );
};

export default WeviooNavbar;
