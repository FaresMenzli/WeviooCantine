import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ConnectedUserState {
  value: any 
}

const initialState: ConnectedUserState = {
    value: null,
}

export const ConnectedUserSlice = createSlice({
  name: 'connectedUser',
  initialState,
  reducers: {
    setConnectedUser: (state, action: PayloadAction<any>) => {
        state.value = action.payload;
    }}
})

// Action creators are generated for each case reducer function
export const { setConnectedUser } = ConnectedUserSlice.actions

export default ConnectedUserSlice.reducer