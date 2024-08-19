import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Dish } from "../../../Models/Dish";
import "./CartDropDown.css";
import { Button } from "@mui/material";
import {Info} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

interface CartDropDownProps {}

const CartDropDown: FC<CartDropDownProps> = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.value);
 let totalPrice =0;
 const linePrice = (a: number, b: number) => {
    
  totalPrice += a * b;
  
  return a * b;
};
  const { data, loading, error } = useSelector(
    (state: RootState) => state.dishes
  );
  useEffect(() => {
    console.log(cart.length);
  }, []);

  return (
    <>
      {cart.length != 0 ? (
        <div className="d-flex flex-column align-items-center z-3 ">
        <table className="navbarCartTable rounded-3 text-center mb-4 mt-4">
          <thead>
            <tr>
              <th className="">DishName</th>
              <th className=" ">Dish photo</th>
              <th className=" ">Quantity</th>
              <th className=" ">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dish: Dish) => (
              <tr
                hidden={cart.findIndex((x) => x.dishId == dish.dishId) == -1}
                key={dish.dishId}
              >
                <td>{dish.dishName}</td>
                <td>
                  <img
                    src={dish.dishPhoto}
                    alt="dishPhoto"
                    height={50}
                    width={50}
                  />
                </td>

                <td className="quantityBtn ">
                  <div className="d-flex justify-content-evenly">
                    <div className="align-self-center">
                      {" "}
                      {cart.findIndex((x) => x.dishId === dish.dishId) !== -1
                        ? cart.filter((item) => item.dishId === dish.dishId)[0]
                            .quantity
                        : ""}
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
                <td> </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td className="fw-bold   totalCell">Total:</td>{" "}
              <td className="fw-bold  totalCell">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </td>
                    
                    <td className="fw-bold">{totalPrice} TND</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <div className="mb-3">
        <Button 
        onClick={()=>navigate("/cart")}
         style={{
        borderRadius: 35,
        backgroundColor: "#21b6ae",
        color:"white"
    }} variant="outlined" startIcon={<Info />}>
  More details
</Button>

        </div>
        </div>
      ) : (
        <div className="d-flex align-items-center flex-column ">
          <h4>your Cart is empty</h4>
          <img
            height={250}
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default CartDropDown;
