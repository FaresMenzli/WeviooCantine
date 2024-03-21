import React, { FC, useEffect, useState } from "react";
import { DishDetailsWrapper } from "./DishDetails.styled";
import { Dish } from "../../Models/Dish";
import axios from "axios";
import { useParams } from "react-router-dom";

interface DishDetailsProps {}

const DishDetails: FC<DishDetailsProps> = (props) => {
  const [dish, setDish] = useState<Dish>();
  const baseURL = `http://localhost:5000`;
  let { id } = useParams();
  useEffect(() => {
    const url = `${baseURL}/dish/${id}`;
    axios.get(url).then((res) => {
      setDish(res.data);
     
    });
  }, []);

  return (
    <DishDetailsWrapper className="DishDetailsBG">
      <div>
         <ul>
            <li></li>
            <li></li>
         </ul>
      </div>
      <div className="container">
        <div className="card">
          <div className="container-fliud">
            <div className="wrapper row">
              <div className="preview col-md-6">
                <div className="preview-pic tab-content">
                  <div className="tab-pane active" id="pic-1">
                    <img src={dish?.dishPhoto} alt="dishPhoto"/>
                  </div>
                </div>
              </div>
              <div className="details col-md-6">
                <h3 className="product-title">{dish?.dishName}</h3>
                <h6>{dish?.dishCategory}</h6>
                <h6>{dish?.dishOrigin}</h6>

                <p className="product-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officiis labore, animi libero repellat laudantium a, dolores
                  distinctio assumenda odio fugit excepturi totam molestias eum,
                  sit cum veritatis itaque ducimus! Quae.
                </p>
                <h4 className="price">
                  {" "}
                  price: <span>{dish?.dishPrice} TND</span>
                </h4>

                <div className="action">
                  <button className="add-to-cart btn btn-default" type="button">
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DishDetailsWrapper>
  );
};

export default DishDetails;
