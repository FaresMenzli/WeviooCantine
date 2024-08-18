import { FC, useEffect, useState } from "react";
import interceptor from "../../../Interceptor/Interceptor";
import { BoxArrowRight, Pen, Trash } from "react-bootstrap-icons";
import WeviooSpinner from "../../WeviooSpinner/WeviooSpinner";
import dayjs from 'dayjs';
import CloseIcon from "@mui/icons-material/Close";


import styles from "./OrderList.module.css"
import { Filters, RightBar } from "../../Dishes/Dishes.styled";
import { User } from "../../../Models/User";

import { Dish } from "../../../Models/Dish";
import { useBackendUrl } from "../../../Contexts/BackendUrlContext";
import { Table , TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableContainer,Paper,
  DialogActions,
  Button,
  DialogTitle,
  Dialog,
  DialogContent} from "@mui/material";
import { AdminLeftBar } from "../../AdminDashboard/AdminDashboard.styled";

interface OrderListProps {
    
}
interface CommandeLine{
  commandeLineId:number;
  dish :Dish;
  quantityOrdered:5;

}
interface Order {
    orderId: number;
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

const convertDate = (date:string|Date) => {

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
  
   
  <AdminLeftBar className="mt-5 pt-5">
  
   
      <div className="mt-3 ms-2 fw-bold">Filter</div>
   
      <div className="ms-3 mb-2 mt-3 fw-bold"> Selece Date</div>
    
         <input className={`${styles.dateSelector} fw-bold ms-4`} type="date" value={selectedDate} onChange={handleDateChange} />
      

      <div className="ms-3 mb-2 mt-3 fw-bold"> search by User</div>

      <input className={`${styles.dateSelector} fw-bold ms-4`} type="text" name="" id=""  onChange={(e) => setSearchByUser(e.target.value)} />
        
       
     
    
  </AdminLeftBar>
     {loading? (<WeviooSpinner></WeviooSpinner> ):
     
     (<div>
    { orders.length>0 ? (       <TableContainer sx={{  margin: "auto", marginTop:8,maxHeight: 440 ,width:"50%"}} component={Paper}>
         <Table sx={{ margin: "auto",  textAlign: "center" , }}>
      <TableHead>
        <TableRow>
          <TableCell className="white textShadow">id</TableCell>
          <TableCell className="white textShadow">orderDate</TableCell>
          <TableCell className="white textShadow">Total</TableCell>
          <TableCell className="white textShadow">User</TableCell>
          <TableCell className="white textShadow">Order Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders
          .filter((order) => {
            return searchByUser.toLowerCase() === ""
              ? order
              : order.user.userFirstName.toLowerCase().includes(searchByUser) ||
                  order.user.userLastName.toLowerCase().includes(searchByUser);
          })
          .map((order) => (
            <TableRow key={order.orderId}>
             
              <TableCell className="white">{order.orderId}</TableCell>
              <TableCell className="white">{convertDate(order.orderDate)}</TableCell>
              <TableCell className="white">{order.total} DNT</TableCell>
              <TableCell className="white">
                {order.user.userFirstName} <b>{order.user.userLastName}</b>
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleOrderDetailsClick(order.commandeLines)}
                >
                  <BoxArrowRight />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    </TableContainer>) :(<div className={`${styles.noOrders}`} >
      <div className="bg-light p-3 rounded-3"><b>No orders in this date</b> </div>
     
      
      </div>)}
 
          </div> 
          )
          
          
}

{modalOpen && (
        <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Order Details
          <IconButton
            aria-label="close"
            onClick={() => setModalOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CommandeLine Id</TableCell>
                <TableCell>Dish name</TableCell>
                <TableCell>Dish photo</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commandeLines.map((cl) => (
                <TableRow key={cl.commandeLineId}>
                  <TableCell>{cl.commandeLineId}</TableCell>
                  <TableCell>{cl.dish.dishName}</TableCell>
                  <TableCell>
                    <img height={60} src={cl.dish.dishPhoto} alt={cl.dish.dishName} />
                  </TableCell>
                  <TableCell>{cl.quantityOrdered}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      )}  
    </>);
}
 
export default OrderList;