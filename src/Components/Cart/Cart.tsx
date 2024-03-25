import { CartWrapper, TopBarCart } from "./Cart.styled";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./../../redux/store";
import { showToast } from '../Toaster/toasterService';
import 'react-toastify/dist/ReactToastify.css';
import {
  decrementQuantity,
  emptyCartAfterOrder,
  incrementQuantity,
  removeLine,
} from "../../redux/cart";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dish } from "../../Models/Dish";
import {
  XOctagonFill,
} from "react-bootstrap-icons";
import { ToastContainer } from "react-toastify";
import OrderHistory from "./OrderHistory/OrderHistory";
import interceptor from "../../Interceptor/Interceptor";
import WeviooNavbar from "../WeviooNavbar/WeviooNavbar";
import { useAuth } from "../../Contexts/AuthContext";
import {  useNavigate } from "react-router-dom";

import RedirectCounterComponent from "../RedirectCounterComponent/RedirectCounterComponent";
import { useBackendUrl } from "../../Contexts/BackendUrlContext";

interface CartProps {}

export default function Cart() {
  const [sendingOrder , setSendingOrder]=useState(false)
  const navigate = useNavigate();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderHistory, setOrderHistory] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();
  
  const { backendUrl } = useBackendUrl();;
  const [dishs, setDishs] = useState<Dish[]>([]);
  const [order, setOrder] = useState(false)
  const [redirectToLogin , setRedirectToLogin] = useState(false)
  let init = 0;
  let totalPrice  = 0;
  let ids = "";
  const { user } = useAuth();

/*  useEffect(() => {
if(redirectToLogin){
  const countdownInterval = setInterval(() => {
    setCountdown((prevCount) => prevCount - 1);
    console.log(countdown)
  }, 1000); 
  if(countdown===0){
    navigate("/login")
  }
  return () => {
    
    clearInterval(countdownInterval);
  };
 
}

 }, [countdown, redirectToLogin]) */
 
  
const placeOrder=()=>{
  
  setSendingOrder(true)
  const userId = user?.userId
  
  const orderRequestBody = {commandeLines: cart , total:totalPrice}

 
  interceptor.post(`${backendUrl}/api/orders/orderForUser/${userId}`, orderRequestBody)
  .then(response => {
    // Handle the response
    console.log('Response:', response);
    showToast('Order placed successfully!');
    dispatch(emptyCartAfterOrder())
    setSendingOrder(false)
    setShowOrderDetails(true)
    
  })
  .catch(error => {
    // Handle errors
    if (error.response) {
      if (error.response.status === 404) {
        showToast('User not found. Unable to create order.', { type: 'error' });
      }
      if (error.response.status === 403) 
      {
        setSendingOrder(false)
        setRedirectToLogin(true)
        showToast('Please log in to place an order', { type: 'error' });
    
       
    }
      else {
        console.error('Server error:', error.response.status, error.response.data);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
  });
  
}
  const linePrice = (a: number, b: number) => {
    totalPrice += a * b;
    return a * b;
  };

  useEffect(() => {
    console.log("emptyCart"+emptyCart , "showOrderDetails"+showOrderDetails)
    if (cart.length>0){
    cart.map((x) => (ids += x.dishId + ","));
    const url = `${backendUrl}/api/Dishs/dishsByIds/${ids.slice(0, -1)}`;
   
    axios
      .get(url)
      .then((res) => {
        setDishs(res.data);
      })
      .catch((error) => {
    
        if (error.response) {
        
          console.error("Response error:", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request) {
         
          console.error("No response received:", error.request);
        } else {
     
          console.error("Request error:", error.message);
        }

        // Handle specific error cases
        if (error.response && error.response.status === 404) {
          setEmptyCart(true);
          // Handle 404 Not Found (DishNotFoundException)
          console.error("Dish not found for the provided IDs");
        } else {
          // Handle other cases
          console.error("Unhandled error:", error);
        }
      });}
      else setEmptyCart(true)
  }, [cart]);

  return (
    <CartWrapper className="cartBG">
      <WeviooNavbar></WeviooNavbar>
      <TopBarCart className="white pb-5">
        <div className= 'clickable' onClick={() => setOrderHistory(false)}>
          Cart
        </div>
        <div className='clickable' onClick={() => setOrderHistory(true)}>
          Order History
        </div>
      </TopBarCart>
      <ToastContainer />

      {!emptyCart && !orderHistory? (
        
        <div className="d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-end">
            <table className="cartTable white text-center mt-5">
              <thead>
                <tr>
                  <th className="white textShadow">DishId</th>
                  <th className="white textShadow">DishName</th>
                  <th className="white textShadow">Dish photo</th>
                  <th className="white textShadow">Dish category</th>
                  <th className="white textShadow">Quantity</th>
                  <th className="white textShadow">Price</th>
                  <th className="white textShadow"> Action</th>
                </tr>
              </thead>
              <tbody>
                {dishs.map((dish: Dish) => (
                  <tr key={dish.dishId}>
                    <td>{dish.dishId}</td>
                    <td>{dish.dishName}</td>
                    <td>
                      <img
                        src={dish.dishPhoto}
                        alt="dishPhoto"
                        height={50}
                        width={50}
                      />
                    </td>
                    <td className="font-monospace">{dish.dishCategory}</td>
                    <td className="quantityBtn ">
                      <div className="d-flex justify-content-evenly">
                        <div
                          aria-disabled
                          onClick={() => {
                            dispatch(
                              decrementQuantity(
                                cart.filter((x) => x.dishId === dish.dishId)
                              )
                            );
                          }}
                          className=" clickable manageQuantityBtn "
                        >
                          -
                        </div>
                        <div className="align-self-center">
                          {" "}
                          {cart.findIndex((x) => x.dishId === dish.dishId) !== -1
                            ? cart.filter((item) => item.dishId === dish.dishId)[0]
                                .quantity
                            : ""}
                        </div>
                        <div
                          className="clickable manageQuantityBtn px-1"
                          onClick={() => {
                            dispatch(
                              incrementQuantity(
                                cart.filter((x) => x.dishId === dish.dishId)
                              )
                            );
                          }}
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td>
                      {cart.findIndex((x) => x.dishId === dish.dishId) !== -1
                        ? linePrice(
                            cart.filter((item) => item.dishId === dish.dishId)[0]
                              .quantity,
                            dish.dishPrice
                          )
                        : 1}{" "}
                      TND
                    </td>
                    <td>
                      {" "}
                      <XOctagonFill
                        onClick={() => {
                          dispatch(
                            removeLine(cart.filter((x) => x.dishId === dish.dishId))
                          );
                          console.log(cart);
                        }}
                        color="red"
                        className="clickable"
                      >
                        {" "}
                      </XOctagonFill>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="fw-bold textShadow  totalCell">Total:</td>{" "}
                  <td className="fw-bold textShadow totalCell">
                    {cart.reduce((a, b) => a + b.quantity, init)}
                  </td>
                  <td className="fw-bold">{totalPrice} TND</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
           {totalPrice<=0 || sendingOrder?(
           <>
            <button className="btn btn-success me-3 mt-2" type="button" disabled>
  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>

</> 
            ):(  
              <>
              <input
                className="btn btn-success me-3 mt-2"
               type="button"
                value="Order"
                onClick={()=>placeOrder()}
              />
              {redirectToLogin?(
                <RedirectCounterComponent></RedirectCounterComponent>  ):(
                <div> </div>
              )
              }
              </>
         ) }
          </div>
        </div>
      ) : (emptyCart && orderHistory ) || (!emptyCart && orderHistory) ?(
       <div style={{height:'85%'}} className="mx-auto d-flex justify-content-center ">
       <OrderHistory></OrderHistory></div>
      ):emptyCart && showOrderDetails?
      (<> OrderDetails</>)
      :( <div className="d-flex justify-content-center">
          
      <div className=" textShadow  mt-15 w-50 position-relative fw-bold text-center border border-secondary rounded-pill cartTable text-wrap fs-1 white  ">
        {" "}
        your Cart is empty
      </div>        
    </div>)}
    </CartWrapper>
  );
}
