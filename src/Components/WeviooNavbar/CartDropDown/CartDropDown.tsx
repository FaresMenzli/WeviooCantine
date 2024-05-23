import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Dish } from "../../../Models/Dish";
import "./CartDropDown.css";

interface CartDropDownProps {}

const CartDropDown: FC<CartDropDownProps> = () => {
  const cart = useSelector((state: RootState) => state.cart.value);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.dishes
  );
  useEffect(() => {
    console.log(cart.length);
  }, []);

  return (
    <>
      {cart.length != 0 ? (
        <div className="d-flex flex-column align-items-center ">
        <table className="navbarCartTable text-center mb-5 mt-5">
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
                    ? (cart.filter((item) => item.dishId === dish.dishId)[0]
                        .quantity,
                      dish.dishPrice)
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
              <td className="fw-bold">{} TND</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <div>
          <input type="button" value="More Details" />
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
