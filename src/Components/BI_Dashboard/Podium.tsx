import { FC, useEffect } from "react";
 import "./Podium.css";
import { AnyAction } from "redux-saga";
import { TopDishData } from "../../Models/TopDishData";
import { TopCsrData } from "../../Models/TopCsrData";

interface PodiumProps {
   data : TopDishData[] | TopCsrData[]
}
 
const Podium: FC<PodiumProps> = (props) => {

    useEffect(() => {
     console.log(props.data)
    }, [])
    
    return (
       

      <div className="podiumWrapper">
        
        { props.data && <div id="second">
            <div className="text-center fw-bold">{'dishId' in props.data[1] ? (props.data[1] as TopDishData).dishName : (props.data[1] as TopCsrData).user.userFirstName}</div>
            <div  className="text-center ">{'dishId' in props.data[1] ? (props.data[1] as TopDishData).totalQuantitySoldAllDays : (props.data[1] as TopCsrData).ordersNB}</div>
        </div>}
        { props.data &&<div id="first">
        <div className="text-center fw-bold">{'dishId' in props.data[0] ? (props.data[0] as TopDishData).dishName : (props.data[0] as TopCsrData).user.userFirstName}</div>
            <div  className="text-center ">{'dishId' in props.data[0] ? (props.data[0] as TopDishData).totalQuantitySoldAllDays : (props.data[0] as TopCsrData).ordersNB}</div>
        
        </div>}
        { props.data &&<div id="third">
        <div className="text-center fw-bold">{'dishId' in props.data[2] ? (props.data[2] as TopDishData).dishName : (props.data[2] as TopCsrData).user.userFirstName}</div>
            <div  className="text-center ">{'dishId' in props.data[2] ? (props.data[2] as TopDishData).totalQuantitySoldAllDays : (props.data[2] as TopCsrData).ordersNB}</div>
        
            </div>}
       
      </div> );
}
 
export default Podium;