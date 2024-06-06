import { Dish } from "./Dish";
import { WeatherDegreeAndIcon } from "./WeatherDegreeAndIcon";

export class WeviooSuggestion {
    suggestionMessage: string;
    weatherDegreeAndIcon: WeatherDegreeAndIcon;
    suggestionDishs: Dish [];
  
    constructor(
      suggestionMessage: string,
      weatherDegreeAndIcon: WeatherDegreeAndIcon,
      suggestionDishes: Dish []
    ) {
      this.suggestionMessage = suggestionMessage;
      this.weatherDegreeAndIcon = weatherDegreeAndIcon;
      this.suggestionDishs = suggestionDishes;
    }
  }