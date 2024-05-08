import { FC, useEffect, useState } from "react";
import { Dish } from "../../../Models/Dish";
import Modal  from "react-modal";
import "./OrderPasssed.css"
import { useAuth } from "../../../Contexts/AuthContext";

interface OrderPassedProps {
    dishs:Dish[]
    cart:any []
    totalPrice?:number

}
 
const OrderPassed: FC<OrderPassedProps> = (props) => {
  const [isOpen, setisOpen] = useState(true)
  const closeModal = () => {
    setisOpen(false);
  };
  const { user } = useAuth();


    console.log(props.dishs)
    console.log(props.cart)

    return (
        <Modal 
      className="cartModal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <h1 className="white">Thank you {user?.userFirstName} for passing the order </h1>
      <h2 className="white">your order details</h2>
      <table className=" white text-center mt-5">
              <thead>
                <tr>
                  <th className="white textShadow">DishId</th>
                  <th className="white textShadow">DishName</th>
                  <th className="white textShadow">Dish photo</th>
                  <th className="white textShadow">Dish category</th>
                  <th className="white textShadow">Quantity</th>
                  <th className="white textShadow">Price</th>
                
                </tr>
              </thead>
              <tbody>
                {props.dishs.map((dish: Dish) => (
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
                
                        <div className="align-self-center">
                          {" "}
                          {props.cart.findIndex((x) => x.dishId === dish.dishId) !== -1
                            ?props. cart.filter((item) => item.dishId === dish.dishId)[0]
                                .quantity
                            : ""}
                        </div>
             
                      </div>
                    </td>
                    <td>
                      {props.cart.findIndex((x) => x.dishId === dish.dishId) !== -1
                        ? (
                            props.cart.filter((item) => item.dishId === dish.dishId)[0]
                              .quantity,
                            dish.dishPrice
                          )
                        : 1}{" "}
                      TND
                    </td>
                    <td>
                      {" "}
                     
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
                    {props.cart.reduce((a, b) => a + b.quantity, 0)}
                  </td>
                  <td className="fw-bold">{props.totalPrice} TND</td>
                  <td></td>
                </tr>
              </tfoot>
            </table></Modal >  );
}
 
export default OrderPassed;