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
    return (
        <Modal 
      className="cartModal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <h1 className="">Thank you {user?.userFirstName} for passing the order </h1>
      <h2 className="">your order details</h2>
      <table className=" passedOrderTable text-center">
              <thead>
                <tr>
                  <th className=" ">DishId</th>
                  <th className=" ">DishName</th>
                  <th className=" ">Dish photo</th>
                  <th className=" ">Dish category</th>
                  <th className=" ">Quantity</th>
                  <th className=" ">Price</th>
                
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
                  <td className="fw-bold  totalCell">
                    {props.cart.reduce((a, b) => a + b.quantity, 0)}
                  </td>
                  <td className="fw-bold">{props.totalPrice} TND</td>
                  <td></td>
                </tr>
              </tfoot>
            </table></Modal >  );
}
 
export default OrderPassed;