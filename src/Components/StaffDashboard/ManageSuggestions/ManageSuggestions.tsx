import { FC, useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Dish } from "../../../Models/Dish";
import axios from "axios";
import { showToast } from "../../Toaster/toasterService";
import { ToastContainer } from "react-toastify";
import { Person } from "react-bootstrap-icons";
import {
  Alert,
  Button,
  ButtonProps,
  CircularProgress,
  styled,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { useBackendUrl } from "../../../Contexts/BackendUrlContext";

interface ManageSuggestionProps {}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ManageSuggestion: FC<ManageSuggestionProps> = () => {
  const [updatingList, setupdatingList] = useState(false);

  const { backendUrl } = useBackendUrl();

  const [selectedWeather, setSelectedWeather] = useState("HOT");

  const [selectedDishs, setSelectedDishs] = useState<Dish[]>([]);
  const [loader, setLoader] = useState(true);

  const { data, loading, error } = useSelector(
    (state: RootState) => state.dishes
  );
  function getStyles(name: string, dishNames: readonly string[], theme: Theme) {
    return {
      fontWeight:
        dishNames.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
      backgroundColor: dishNames.indexOf(name) === -1 ? "" : "#0000ff75",
    };
  }
  function extractDishNames(dishes: Dish[]) {
    return dishes.map((dish) => dish.dishId!.toString());
  }

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${backendUrl}/api/dishToSuggests/weather/${selectedWeather}`)
      .then((res) => setdishNames(extractDishNames(res.data)))
      .then(() => setLoader(false));
  }, [selectedWeather]);

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));
  function getDishNamesFromIds(ids: string[], dishes: Dish[]): string[] {
    return ids
      .map((id) => {
        const dish = dishes.find((dish) => dish.dishId!.toString() === id);
        return dish ? dish.dishName : undefined;
      })
      .filter((dishname) => dishname !== undefined) as string[];
  }
  const theme = useTheme();
  const [dishNames, setdishNames] = useState<string[]>([]);
  function normalizeList(oldList: string | string[]): string[] {
    return typeof oldList === "string" ? [oldList] : oldList;
  }
  const nameofDishs = getDishNamesFromIds(dishNames, data);

  const handleChange = (event: SelectChangeEvent<typeof dishNames>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    console.log(dishNames);

    normalizeList(value);

    if (dishNames.length == 5) {
      if (dishNames.includes(value[value.length - 1].toString())) {
        setdishNames(typeof value === "string" ? value.split(",") : value);
      } else {
        showToast("only 5 suggestions per weather status are allowed",  { theme: "colored" ,type:"error" ,position:"bottom-right"});
        value.slice(0, value.length - 1);
      }
    } else {
      setdishNames(typeof value === "string" ? value.split(",") : value);
      console.log(dishNames);
    }

    const nameofDishs = getDishNamesFromIds(dishNames, data);
  };
  function handleWeatherChange(event: SelectChangeEvent<string>): void {
    setSelectedWeather(event.target.value);
  }

  const updateSuggestion = () => {
    setupdatingList(true);
    console.log(selectedWeather);
    console.log(dishNames);
    axios
      .put(
        `${backendUrl}/api/dishToSuggests/updateSuggestion/${selectedWeather}`,
        dishNames
      )
      .then(() => setupdatingList(false))

      .finally(() => {
        showToast(
          `Suggested List for ${selectedWeather} weather status is updated succefully`,
          { theme: "colored" ,type:"success" ,position:"bottom-right"}
        );
      });
  };
  return (
    <div className="d-flex justify-content-center row w-100 m-auto pb-3 mt-5">
         <ToastContainer></ToastContainer>
      <label htmlFor="" className="d-flex flex-column align-items-center mt-3">
        Choose weather Status :
        {/* <div>
                <select value={selectedWeather} name="Weather" onChange={handleWeatherChange}>
                    <option value="HOT">HOT</option>
                    <option value="COLD">COLD</option>
                    <option value="NORMAL">NORMAL</option>
                </select>
            </div> */}
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-label">Weather</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedWeather}
            label="Weather"
            onChange={handleWeatherChange}
          >
            <MenuItem value="HOT">HOT</MenuItem>
            <MenuItem value="COLD">COLD</MenuItem>
            <MenuItem value="NORMAL">NORMAL</MenuItem>
          </Select>
        </FormControl>
        {selectedWeather == "HOT" && (
          /*  <span className="fw-bold bg-info rounded text-dark mt-3 mb-3">
            those dishes will be appeared as suggetions when it is more than 30°
          </span> */
          <Alert severity="info">
            {" "}
            those dishes will be appeared as suggetions when it is more than 30°
          </Alert>
        )}
        {selectedWeather == "COLD" && (
          <Alert severity="info">
            {" "}
            those dishes will be appeared as suggetions when it is less than 20°
          </Alert>
        )}
        {selectedWeather == "NORMAL" && (
          <Alert severity="info">
            {" "}
            those dishes will be appeared as suggetions when it is more than 20°
            and less than 30°
          </Alert>
        )}
      </label>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Dish </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={dishNames}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(dishNames) =>
            loader ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {getDishNamesFromIds(dishNames, data).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )
          }
          MenuProps={MenuProps}
        >
          {data.map((dish: Dish) => (
            <MenuItem
              key={dish.dishId}
              value={dish.dishId?.toString()}
              style={getStyles(dish.dishId!.toString(), dishNames, theme)}
            >
              <div className="d-flex justify-content-between w-100">
                <span>{dish.dishName}</span>
                <img
                  src={dish.dishPhoto}
                  height={32}
                  width={32}
                  className="rounded-circle"
                ></img>
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {dishNames.length != 5 && (
        <Alert className="ms-1 me-1" severity="warning" variant="filled">
          {" "}
          please choose 5 dishes to suggest
        </Alert>
      )}
      <ColorButton
        onClick={updateSuggestion}
        className="mt-3 w-75"
        disabled={dishNames.length != 5}
        variant="contained"
      >
        {updatingList ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress  color="inherit"/>
          </Box>
        ) : (
          <div>Update Suggestion list when it is {selectedWeather}</div>
        )}
      </ColorButton>

     
    </div>
  );
};

export default ManageSuggestion;
