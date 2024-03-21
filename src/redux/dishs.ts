import { DishName } from "./../Components/DishCard/DishCard.styled";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Dish } from "../Models/Dish";
import axios from "axios";

export interface DishesState {
  data: Dish[];
  loading: "idle" | "pending";
  error: string | null;
}

const initialState: DishesState = {
  data: [],
  loading: "idle",
  error: null,
};
export const fetchDishes = createAsyncThunk<Dish[]>(
  "dishes/fetchDishes",
  async () => {
    const response = await axios.get<Dish[]>(
      "http://localhost:5000/api/Dishs/dishs"
    );
    return response.data;
  }
);

export const DishesSlice = createSlice({
  name: "Dishes",
  initialState,
  reducers: {
    decrementQuantityFromDishs: (state, action: PayloadAction<any>) => {
      state.data.filter(
        (x) => x.dishId === action.payload.id
      )[0].quantityAvailable -= action.payload.quantity;
    },
    sortByType: (state, action: PayloadAction<any>) => {
      switch (action.payload) {
        case "ByName":
          state.data.sort((a, b) => a.dishName.localeCompare(b.dishName));
          break;
        case "ByPrice🡵":
          state.data.sort((a, b) => a.dishPrice - b.dishPrice);
          break;
        case "ByPrice🡶":
          state.data.sort((a, b) => a.dishPrice - b.dishPrice).reverse();
          break;
        case "ByQuantity":
          state.data.sort((a, b) => a.quantityAvailable - b.quantityAvailable).reverse();
          break;
        default:
          state.data.sort((a, b) => a?.dishId! - b.dishId!);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        fetchDishes.fulfilled,
        (state, action: PayloadAction<Dish[]>) => {
          state.loading = "idle";
          state.data = action.payload;
        }
      )
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

// Action creators are generated for each case reducer function
export const { decrementQuantityFromDishs,sortByType } = DishesSlice.actions;

export default DishesSlice.reducer;
