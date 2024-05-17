import React, { FC, useEffect, useState } from "react";
import {
  DishCardWrapper,

  DishName,
  ImgWrapper,
  FoodImg,
  DishDescriptionSection,
  AddToCartBtn,

  DishCardButtons,
  ToDetailsButton,
} from "./DishCard.styled";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addtItemToCart } from "../../redux/cart";

import { decrementQuantityFromDishs } from "../../redux/dishs";
import "./DishCard.css"
interface DishCardProps {
  id: number | undefined;
  name: string;
  image: string;
  category: string;
  price: number;
  quantity:number
}

const DishCard: FC<DishCardProps> = (props) => {
  

  
  const handleChange =( event: any) => {
    setquan(event.target.value);
  };
  
  const [quan, setquan] = useState(1)
  const [dishsPage, setdishsPage] = useState(true);
  const navigate = useNavigate();
  const [quantitySelecter, setQuantitySelecter] = useState<number[]>([]);
  const dishs = useSelector((state:RootState)=> state.dishes.data)

  const quantity = () => {
    if (props.quantity>=2)
      for (let i = 2; i <= (props.quantity>9?9:props.quantity); i++) {
        setQuantitySelecter((quantitySelecter) => [...quantitySelecter, i]);
      }
    
  };

  useEffect(() => {
    quantity();

    window.location.href.toLowerCase().includes("dishes")
      ? setdishsPage(true)
      : setdishsPage(false);
    
  }, [props.quantity]);
  const cart = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();

  return (
    <DishCardWrapper>
      <ImgWrapper className={props.category}>
        <Link to={{ pathname: `/dishDetails/${props.id}` }}></Link>
        <FoodImg src={props.image} alt=" foodPhoto" />
      </ImgWrapper>
      <DishDescriptionSection>
        <DishName> {props.name}</DishName>
 
        <DishCardButtons>
       
        {dishsPage && (  <select className="m-auto form-select form-select-sm quantityWidth" onChange={handleChange}>
            
            <option value="1">{ props.quantity===0?0:1}</option>
            {quantitySelecter.map((x) => (
              <option key={x}  value={x}>{x}</option>
            ))}
          </select>)}
          {!dishsPage && (<div className="d-flex">
            <input className="updateQuantityInput" placeholder={"update quantity ..."} type="text"></input><input value={"↑"} className="updateQuantityBtn" type="button"></input>
          </div>)}

          {dishsPage && (
            <AddToCartBtn
              onClick={(event) => {dispatch(addtItemToCart({dishId:props.id,quantity:parseInt(quan.toString())}));dispatch(decrementQuantityFromDishs({id:props.id,quantity:parseInt(quan.toString())}));setQuantitySelecter([]) ;event.preventDefault();}}
              type="button"
              value="Add to cart"
              hidden={props.quantity===0}
            ></AddToCartBtn>
          )}

{dishsPage && (<ToDetailsButton
            type="button"
            value="details"
            onClick={() => navigate(`/dishDetails/${props.id}`)}
          ></ToDetailsButton>)}
        </DishCardButtons>
        <div className={`${props.quantity===0? 'text-danger ' :''}`}>Quantity : {props.quantity}</div>
        <div>Price : {props.price} TND </div>
      </DishDescriptionSection>
    </DishCardWrapper>
  );
};

export default DishCard;
