import { FC, useEffect, useState } from "react";
import interceptor from "../../../Interceptor/Interceptor";
import { Pen, Trash } from "react-bootstrap-icons";
import WeviooSpinner from "../../WeviooSpinner/WeviooSpinner";
import dayjs from 'dayjs';

import styles from "./OrderList.module.css"
import { Filters, RightBar } from "../../Dishes/Dishes.styled";
import { User } from "../../../Models/User";
interface OrderListProps {
    
}
interface Order {
    id: number;
    orderDate: Date;
    total: number;
    user:User
  }
 
const OrderList: FC<OrderListProps> = () => {
    const today = dayjs();
const [orders, setOrders] = useState<Order[]>([])
const [selectedDate, setSelectedDate] = useState<string>(today.format('YYYY-MM-DD'));
const [searchByUser, setSearchByUser] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
   if (selectedDate)
 { setLoading(true)
     interceptor.get(`http://localhost:5000/api/orders/getOrdersByDate?date=${selectedDate}`)
.then( response =>setOrders(response.data))
.then(()=>setLoading(false))}
   
}, [selectedDate])
const handleDateChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);    
};


   


    return (  <>
  
    <RightBar className=" ms-3 d-flex">
    
    <button
      id="Filters"
      className="fw-bold "
    
    >
      "show Filters"
    </button>
    <Filters className={styles.filterContainer}>
      <div className="mt-3 ms-2 fw-bold">Filter</div>
   
      <div className="ms-3 mb-2 mt-3 fw-bold"> Selece Date</div>
    
         <input className={`${styles.dateSelector} fw-bold ms-4`} type="date" value={selectedDate} onChange={handleDateChange} />
      

      <div className="ms-3 mb-2 mt-3 fw-bold"> search by User</div>

      <input className={`${styles.dateSelector} fw-bold ms-4`} type="text" name="" id=""  onChange={(e) => setSearchByUser(e.target.value)} />
        
       
     
    </Filters>
  </RightBar>
     {loading? (<WeviooSpinner></WeviooSpinner> ):
     
     (<div>
    
    <table className="m-auto mt-5" >
            <thead>
              <tr>
              <th>Actions</th>
              <th>id</th>
              <th>orderDate</th>
              <th>User</th>
              </tr>
            </thead>
            <tbody>
          {orders.filter((order:Order)=>{

       return searchByUser.toLowerCase() === ""
         ? order
         : ( order.user.userFirstName.toLocaleLowerCase().includes(searchByUser) || order.user.userLastName.toLocaleLowerCase().includes(searchByUser))}) 
       

          
          
          
          
          .map((order: any) => (    
              <tr key={order.userId}>
                <td>
                <Pen color="white" className="me-3 clickable" ></Pen>
                  <Trash className="clickable"  color="red"> </Trash>
                </td>
                <td className="white">{order.orderId}</td>
                <td className="white">{order.orderDate}</td>
                <td className="white">{order.user.userFirstName} <b>{order.user.userLastName}</b> </td>
              </tr>
            ))}</tbody>
          </table>
          </div> )
}
    
    </>);
}
 
export default OrderList;