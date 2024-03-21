import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

let init = 0
export interface CartState {
  value: any[];
}

const initialState: CartState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtItemToCart: (state, action: PayloadAction<any>) => {
      console.log(state.value)
      state.value.map((e) => e.dishId).indexOf(action.payload.dishId) === -1
        ? state.value.push(action.payload)
        : (state.value[
          state.value.map((e) => e.dishId).indexOf(action.payload.dishId)
        ].quantity += action.payload.quantity);
    },
    decrementQuantity: (state, action: PayloadAction<any>) => {
      console.log(action.payload[0].dishId)
      state.value.filter(x => x.dishId === action.payload[0].dishId)[0].quantity -= 1
    },
    incrementQuantity: (state, action: PayloadAction<any>) => {
      console.log(action.payload[0].dishId)
      state.value.filter(x => x.dishId === action.payload[0].dishId)[0].quantity += 1
    },
    removeLine: (state, action: PayloadAction<any>) => {
      console.log("Fares")
      console.log(action.payload)
      state.value.splice(state.value.indexOf(action.payload.dishId), 1)

    },
    emptyCartAfterOrder:(state)=>{
      state.value=[]
    }
  },

});

// Action creators are generated for each case reducer function
export const { addtItemToCart,emptyCartAfterOrder, decrementQuantity, incrementQuantity, removeLine } = cartSlice.actions;

export default cartSlice.reducer;
