import { createSlice, Slice } from "@reduxjs/toolkit";
// import type {  UserInitialState } from "../types/storeTypes";

interface UserInitialState {
   name: string,
   bestScore: number
}

const initialState:UserInitialState = {
   name: "",
   bestScore: 0
}

const userSlice:Slice = createSlice({
  name:  "userSlice",
  initialState,
  reducers: {
    
  }
});

export const { setStoreUser} = userSlice.actions;
export default userSlice.reducer;