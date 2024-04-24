import { FC, useEffect } from "react";
 import "./Podium.css";
import { AnyAction } from "redux-saga";
interface PodiumProps {
    data:any
}
 
const Podium: FC<PodiumProps> = (props) => {

    useEffect(() => {
     console.log(props.data)
    }, [])
    
    return (
       

      <div className="podiumWrapper">
        <div id="second">
            <div className="text-center fw-bold">{props.data[1]?.dishName}</div>
            <div  className="text-center ">{props.data[1]?.totalQuantitySoldAllDays}</div>
        </div>
        <div id="first">
            <div className="text-center fw-bold">{props.data[0]?.dishName}</div>
            <div className="text-center ">{props.data[0]?.totalQuantitySoldAllDays}</div>

        </div>
        <div id="third">
            <div className="text-center fw-bold">{props.data[2]?.dishName}</div>
            <div className="text-center ">{props.data[2]?.totalQuantitySoldAllDays}</div>
            </div>
        
      </div> );
}
 
export default Podium;