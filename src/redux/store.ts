import { configureStore, createReducer } from "@reduxjs/toolkit";
import counterReducer from "./counter"
import cartReducer from "./cart"
import dishesReducer ,{ fetchDishes } from "./dishs";
import  connectedUserReducer  from "./connectedUser";

export const store = configureStore({
    reducer:{
        counter:counterReducer,
         cart:cartReducer ,
         dishes: dishesReducer,
         connectedUser:connectedUserReducer

    }
    }
)
// Fetch dishes on app initialization
store.dispatch(fetchDishes());
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch