import { FC, useEffect, useState } from "react";
import interceptor from "../../../Interceptor/Interceptor";
import { BoxArrowRight, Pen, Trash } from "react-bootstrap-icons";
import WeviooSpinner from "../../WeviooSpinner/WeviooSpinner";
import dayjs from 'dayjs';

import styles from "./OrderList.module.css"
import { Filters, RightBar } from "../../Dishes/Dishes.styled";
import { User } from "../../../Models/User";
import { Modal } from "react-bootstrap";
import { Dish } from "../../../Models/Dish";
import { useBackendUrl } from "../../../Contexts/BackendUrlContext";
interface OrderListProps {
    
}
interface CommandeLine{
  commandeLineId:number;
  dish :Dish;
  quantityOrdered:5;

}
interface Order {
    id: number;
    orderDate: Date;
    total: number;
    user:User
    commandeLines:CommandeLine[]
    
  }
 
const OrderList: FC<OrderListProps> = () => {
  const { backendUrl } = useBackendUrl();
  const [modalOpen, setModalOpen] = useState(false);
    const today = dayjs();
const [orders, setOrders] = useState<Order[]>([])
const [selectedDate, setSelectedDate] = useState<string>(today.format('YYYY-MM-DD'));
const [searchByUser, setSearchByUser] = useState("");
const [commandeLines,setCommandeLines]= useState<CommandeLine[]>([])
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const handleOrderDetailsClick = (commandeLines:CommandeLine[]) => {
 setCommandeLines(commandeLines)
  setModalOpen(true);
  console.log(modalOpen)
};

useEffect(() => {
   if (selectedDate)
 { setLoading(true)
     interceptor.get(`${backendUrl}/api/orders/getOrdersByDate?date=${selectedDate}`)
.then( response =>setOrders(response.data))
.then(()=>setLoading(false))}
   
}, [selectedDate])
const handleDateChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);    
};

const convertDate = (date:string) => {

  const originalDate = new Date(date);
   return originalDate.toLocaleString('en-GB', {
    day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
     
    hour12: false,
    timeZone: 'UTC'
  });
}
   


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
    
    <table className="text-center m-auto mt-5" >
            <thead>
              <tr>
              <th className="white textShadow">Actions</th>
              <th className="white textShadow">id</th>
              <th className="white textShadow">orderDate</th>
              <th className="white textShadow">Total</th>
              <th className="white textShadow">User</th>
              <th className="white textShadow">Order Details</th>

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
                <td className="white">{convertDate(order.orderDate)}</td>
                <td className="white">{order.total}</td>
                <td className="white">{order.user.userFirstName} <b>{order.user.userLastName}</b> </td>
                <td className="clickable" onClick={()=>handleOrderDetailsClick(order.commandeLines)}> <BoxArrowRight color="white"></BoxArrowRight></td>

              </tr>
            ))}</tbody>
          </table>
       
          </div> 
          )
          
          
}

{modalOpen && (
        <div className={styles.modal }>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <table className="text-center m-auto mt-5" >
            <thead>
              <tr>
              <th > CommandeLine Id</th>
              <th >Dish name</th>
              <th >Dish photo</th>
              <th >quantity</th>
              

              </tr>
            </thead>
            <tbody>
{commandeLines.map((cl :CommandeLine) =>

            <tr>
              <td>{cl.commandeLineId}</td>
              <td>{cl.dish.dishName}</td>
              <td><img height={60} src={cl.dish.dishPhoto} alt="" /></td>
            <td>{cl.quantityOrdered}</td>
            </tr>)
}
</tbody>
</table>
          </div>
        </div>
      )}  
    </>);
}
 
export default OrderList;