import React, { FC } from "react";
import {
  DishesMainPage,
  DishesWrapper,
  RightBar,
  SearchForDish,
} from "./Dishes.styled";
import Pokemon from "../../assets/Pokemon.json";
import DishCard from "../DishCard/DishCard";

interface DishesProps {}

const Dishes: FC<DishesProps> = () => (
  <DishesMainPage>
      <RightBar>
        <div>Filter</div>
        <div> Category :</div>
        <div>
          <input type="checkbox" name="cat1" />
          <label>cat1</label>
        </div>

        <div>
          <input type="checkbox" name="cat2" />
          <label>cat2</label>
        </div>
      </RightBar>
      <div className="restaurantBg">
        <input type="button" value="<"></input>
        <header>
          {" "}
          <SearchForDish
            type="text"
            name=""
            id=""
            placeholder="search for dish ..."
          />
          <img src="./../../assets/cart.png" height={50} alt="cart"></img>
        </header>
        <DishesWrapper>
          <DishCard
            category="salade"
            name="salade"
            image="https://hips.hearstapps.com/goodhousekeeping-uk/main/embedded/34158/yakiudon.jpg?crop=1xw:1xh;center,top&resize=980:*"
          ></DishCard>
          <DishCard
            category="main"
            name="main"
            image="https://essentialnutritionforyou.com/wp-content/uploads/2018/03/Mediterranean-Chickenpea-Salad-4-1.jpg"
          ></DishCard>
          <DishCard
            category="salade"
            name="salade"
            image="https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg?downsize=900:*&output-format=auto&output-quality=auto"
          ></DishCard>
          <DishCard
            category="dessert"
            name="dessert"
            image="https://hips.hearstapps.com/goodhousekeeping-uk/main/embedded/34158/yakiudon.jpg?crop=1xw:1xh;center,top&resize=980:*"
          ></DishCard>
          <DishCard
            category="dessert"
            name="dessert"
            image="https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg?downsize=900:*&output-format=auto&output-quality=auto"
          ></DishCard>
          <DishCard
            category="salade"
            name="salade"
            image="https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg?downsize=900:*&output-format=auto&output-quality=auto"
          ></DishCard>
          <DishCard
            category="salade"
            name="salade"
            image="https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg?downsize=900:*&output-format=auto&output-quality=auto"
          ></DishCard>
          <DishCard
            category="salade"
            name="salade"
            image="https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg?downsize=900:*&output-format=auto&output-quality=auto"
          ></DishCard>
          <DishCard
            category="salade"
            name="salade"
            image="https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg?downsize=900:*&output-format=auto&output-quality=auto"
          ></DishCard>
          <DishCard
            category="salade"
            name="salade"
            image="https://img.buzzfeed.com/buzzfeed-static/static/2022-03/5/0/asset/6201713e5c7e/sub-buzz-1009-1646440684-8.jpg?downsize=900:*&output-format=auto&output-quality=auto"
          ></DishCard>
        </DishesWrapper>
      </div>
    
  </DishesMainPage>
);

export default Dishes;
