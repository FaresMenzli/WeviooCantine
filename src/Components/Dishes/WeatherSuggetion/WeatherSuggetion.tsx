import { FC, useEffect, useState } from "react";
import "./styles.css";
import { Carousel, CarouselItem } from "react-bootstrap";


import DishCard from "../../DishCard/DishCard";
import { Dish } from "../../../Models/Dish";
import { useBackendUrl } from "../../../Contexts/BackendUrlContext";
import axios from "axios";
import WeatherLoader from "../WeatherLoader/WeatherLoader";
import { WeviooSuggestion } from "../../../Models/WeviooSuggestion";

interface WeatherSuggetionProps {}

const WeatherSuggetion: FC<WeatherSuggetionProps> = () => {
  const [WeatherLoading, setWeatherLoading] = useState(true);
  const [Weather, setWeather] = useState('')
  const [WeviooSuggestion, setWeviooSuggestion] = useState<WeviooSuggestion>();
  const { backendUrl } = useBackendUrl();

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/wevioosugg`)
      .then((r) => {setWeviooSuggestion(r.data)
        if  (r.data.weatherDegreeAndIcon?.degree<10) setWeather("weatherCold")
          if  (r.data.weatherDegreeAndIcon?.degree>20) setWeather("weatherHot")
          })
      
   
      .finally(() => setWeatherLoading(false));
  }, []);

  return (
    <>
      {!WeatherLoading ? (<div hidden={WeviooSuggestion?.suggestionDishs.length===0} className={`${Weather} weatherWrapper `}>
       
        <h2 className="text-center pt-3">{WeviooSuggestion?.suggestionMessage}</h2>
        <div className="body">
               
      {/*     <label className="container"3
            One
            <input type="radio" name="position"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">
            One
            <input type="radio" name="position"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">
            One
            <input type="radio" name="position"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">
            One
            <input type="radio" name="position"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">
            One
            <input type="radio" name="position"></input>
            <span className="checkmark"></span>
          </label> */}
           
  <input type="radio" name="position"></input> 
  <input type="radio" name="position"></input>
  <input type="radio" name="position" ></input>
  <input type="radio" name="position" ></input>
  <input type="radio" name="position" ></input> 

          <span id="carousel">
            {WeviooSuggestion?.suggestionDishs.map((dish: Dish) => (
              <div className="item" key={dish?.dishId}>
                <DishCard
                  id={dish?.dishId}
                  category={dish.dishCategory}
                  name={dish.dishName}
                  image={dish.dishPhoto}
                  price={dish.dishPrice}
                  quantity={dish.quantityAvailable}
                ></DishCard>
              </div>
            ))}
          </span>
     
        </div>
        </div> ) : (
        <>
          :(
          <div className="weatherLoaderContainer">
            <WeatherLoader></WeatherLoader>{" "}
            <div className="WeatherLoaderText">
              LOOKING OUTSIDE FOR YOU... ONE SEC
            </div>
          </div>
          )
        </>
      )}
    </>
  );
};

export default WeatherSuggetion;
