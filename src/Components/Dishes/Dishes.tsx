/* eslint-disable no-restricted-globals */

import React, { FC, useEffect, useState } from "react";
import {
  CartItems,
  CartSpan,
  DishesMainPage,
  DishesWrapper,
  Filters,
  RightBar,
  SearchForDish,
  WeviooSuggestion,
} from "./Dishes.styled";
import DishCard from "../DishCard/DishCard";
import axios from "axios";
import { Dish } from "../../Models/Dish";
import { BasketFill, ChevronCompactDown, Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReactSVG } from "react-svg";
import WeviooSpinner from "../WeviooSpinner/WeviooSpinner";
import { sortByType } from "../../redux/dishs";
import Test from "../WeviooSuggestionAnimated/WeviooSuggestionAnimated";
import WeviooSuggestionAnimated from "../WeviooSuggestionAnimated/WeviooSuggestionAnimated";
import WeviooNavbar from "../WeviooNavbar/WeviooNavbar";

interface DishesProps {}
const Dishes: FC<DishesProps> = () => {
  const dispatch = useDispatch();
  const [selectedSort, setSelectedSort] = useState("");
  const handleSortChange = (Sort: React.SetStateAction<string>) => {
    setSelectedSort(Sort);
    dispatch(sortByType(Sort));
  };
  const [selectedCategories, setSelectedCategories] = useState<String[]>([]);
  const handleFilterChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };
  let height = screen.height;
  const [showFilters, setshowFilters] = useState(true);
  const [showSuggestion, setShowSuggestion] = useState(true);

  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.value);
 
  



  const [category, setCategory] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [dishs, setDishs] = useState([]);

  const [checked, setChecked] = useState<string[]>([]);
  const baseURL = `http://localhost:5000`;
  const { data, loading, error } = useSelector(
    (state: RootState) => state.dishes
  );
  const filteredDishes =
    selectedCategories.length === 0
      ? data
      : data.filter((dish: Dish) =>
          selectedCategories.includes(dish.dishCategory)
        );
  useEffect(() => {
    if (data) {
  
      let tab: string[] = [];
      data.map((dish: Dish) => {
        if (!tab.includes(dish.dishCategory)) {
          tab.push(dish.dishCategory);
        }
        tab.sort((a, b) => a.localeCompare(b));
      });

      setCategory(tab);
    }
  }, [data]);

  if (loading === "pending") {
    return (<>
      <WeviooNavbar></WeviooNavbar>
      <div className="restaurantBg d-flex align-items-center justify-content-center">
        
        <WeviooSpinner></WeviooSpinner>
      </div>
      </>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      <DishesMainPage>
        <WeviooNavbar></WeviooNavbar>
        <RightBar className=" ms-3 d-flex ">
          <button
            id="Filters"
            className="fw-bold position-fixed "
            onClick={() => setshowFilters(!showFilters)}
          >
            {!showFilters ? "show Filters" : "hide Filters"}
          </button>
          <Filters hidden={!showFilters}>
            <div className="mt-3 ms-2 fw-bold">Filter</div>
            <div className="ms-3 mb-2 fw-bold"> Category :</div>
            {category.map((c) => (
              <div className="ms-4">
                <label className={`ms-2 pe-2 rounded ${c}`}> &nbsp;</label>
                <label className="fw-bold checkboxWrapper">
                  <input
                    className="ccb ms-2 me-1 mb-2"
                    type="checkbox"
                    name={c}
                    onChange={() => handleFilterChange(c)}
                  />
                  {c}
                </label>
              </div>
            ))}
          
         
            <div className="ms-3 mb-2 mt-3 fw-bold"> Sort :</div>
            <div className="ms-4">
              <form>
                <label className="ms-4 fw-bold">
                  <input
                    className="me-1"
                    type="radio"
                    name="Sort"
                    value="notSelected"
                    checked={selectedSort === ""}
                    onChange={() => handleSortChange("")}
                  />
                  Default
                </label>
                <br />
                <label className="ms-4 fw-bold">
                  <input
                    className="me-1"
                    type="radio"
                    name="Sort"
                    value="By Name"
                    checked={selectedSort === "ByName"}
                    onChange={() => handleSortChange("ByName")}
                  />
                  By Name
                </label>
                <br />

                <label className="ms-4 fw-bold">
                  <input
                    className="me-1"
                    type="radio"
                    name="Sort"
                    value="By Price 🡵"
                    checked={selectedSort === "ByPrice🡵"}
                    onChange={() => handleSortChange("ByPrice🡵")}
                  />
                  By Price 🡵
                </label>
                <br />

                <label className="ms-4 fw-bold">
                  <input
                    className="me-1"
                    type="radio"
                    name="Sort"
                    value="By Price 🡶"
                    checked={selectedSort === "ByPrice🡶"}
                    onChange={() => handleSortChange("ByPrice🡶")}
                  />
                  By Price 🡶
                </label>
                <br />
                <label className="ms-4 fw-bold">
                  <input
                    className="me-1"
                    type="radio"
                    name="Sort"
                    value="By Quantity"
                    checked={selectedSort === "ByQuantity"}
                    onChange={() => handleSortChange("ByQuantity")}
                  />
                  By Quantity
                </label>
                <br />
              </form>
              <p>{selectedSort}</p>
            </div>
          </Filters>
        </RightBar>

        <div className="restaurantBg pt-4 pb-5">
        <div className="searchWrapper">
            <div
              className="input-group searchGroup m-auto mb-4"
             
            >
              
              <span className="input-group-text" style={{ height: "30px" }}>
                <Search></Search>
              </span>
              <SearchForDish
                type="text"
                name=""
                id=""
                placeholder="search for dish ..."
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
              />
            </div>
            </div>
            
       
          <div onClick={()=>setshowFilters(false)} style={{   margin: '0 auto',
    display: 'block'}}><WeviooSuggestionAnimated></WeviooSuggestionAnimated></div>
          
          <DishesWrapper style={{zoom:"80%"}} className="ps-5 mt-5">
            
            {filteredDishes
              .filter((dish: Dish) => {
                return search.toLowerCase() === ""
                  ? dish
                  : dish.dishName.toLocaleLowerCase().includes(search);
              })
              .map((dish: Dish) => (
                <div key={dish.dishId}>
                  <DishCard
                    id={dish.dishId}
                    category={dish.dishCategory}
                    name={dish.dishName}
                    image={dish.dishPhoto}
                    price={dish.dishPrice}
                    quantity={dish.quantityAvailable}
                  ></DishCard>
                </div>
              ))}
          </DishesWrapper>
        </div>
      </DishesMainPage>
    </>
  );
};

export default Dishes;
