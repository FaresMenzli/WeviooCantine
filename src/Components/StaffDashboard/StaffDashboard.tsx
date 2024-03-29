import React, { FC, useEffect, useState } from "react";
import {
  DishList,
  Links,
  StaffDashboardWrapper,
  TopBarStaff,
} from "./StaffDashboard.styled";
import { Dish } from "../../Models/Dish";

import DishCard from "../DishCard/DishCard";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import WeviooSpinner from "../WeviooSpinner/WeviooSpinner";

import WeviooNavbar from "../WeviooNavbar/WeviooNavbar";
import ManageDish from "./ManageDishs/ManageDishs";
import OrderList from "./OrdersList/OrdersList";
import { useBackendUrl } from "../../Contexts/BackendUrlContext";

interface StaffDashboardProps {}

const StaffDashboard: FC<StaffDashboardProps> = () => {
  const [isNavbarShrunk, setIsNavbarShrunk] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100; 
      setIsNavbarShrunk(!isTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [view, setView] = useState("manageDishs");
  //const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  const { backendUrl } = useBackendUrl();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.dishes
  );

  useEffect(() => {
    // setLoading(true);
    const url = `${backendUrl}/dishs`;
    // axios.get(url).then((res) => setData(res.data));
    // setLoading(false);
  }, []);

 /*  if (loading === "pending") {
    return (
      <div className="top-50 d-flex align-items-center justify-content-center">
        <WeviooSpinner></WeviooSpinner>
      </div>
    );
  } */


  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <StaffDashboardWrapper className="StaffBg">
      <WeviooNavbar></WeviooNavbar>
      <TopBarStaff shrunk={isNavbarShrunk}  className="white ">
        <Links
          className={`${view==="dishList" ? "text-decoration-underline" : ""} clickable`}
          onClick={() => {
           
            setView("dishList");
          }}
        >
          DishList
        </Links>
        <Links
          className={`${view==="manageDishs" ? "text-decoration-underline" : ""} clickable`}
          onClick={() => {
           
            setView("manageDishs");
          }}
        >
          manage dishs {" "}
        </Links>
        <Links
          className={`${view==="orders" ? "text-decoration-underline" : ""} clickable`}
          onClick={() => {
           
            setView("orders");
          }}
        >
          Orders{" "}
        </Links>
      </TopBarStaff>
      {view === "manageDishs" ? (
        
        
        loading !== 'idle' ? (
          
          <WeviooSpinner></WeviooSpinner>
          
         
          )
        :(
          
          <ManageDish data={data}></ManageDish>
        )


        
      ) : view === "dishList" ? (
        <DishList className="d-flex flex-wrap">
          {" "}
          {data.map((dish: Dish) => (
            <div className=" pt-5" key={dish.dishId}>
              <DishCard
                id={dish.dishId}
                category={dish.dishCategory}
                name={dish.dishName}
                image={dish.dishPhoto}
                price={dish.dishPrice}
                quantity={dish.quantityAvailable}
              ></DishCard>
            </div>
          ))}
        </DishList>
      ) : (
        <OrderList></OrderList>
      )}
    </StaffDashboardWrapper>
  );
};

export default StaffDashboard;
