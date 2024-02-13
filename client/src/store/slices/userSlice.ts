import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { client } from "@/apollo/ApolloClientProvider";
// import type {  UserInitialState } from "../types/storeTypes";

interface UserInitialState {
   name: string,
   bestScore: number
}

const initialState:UserInitialState = {
   name: "",
   bestScore: 0
}

export const getUser = createAsyncThunk(
   "user/getUser",
   async ({ username, password }: any) => {
       const query = gql`
       {
           GetUser(username:"${username}", password: "${password}"){
             name
             bestScore
           }
         }
     `
       const result = await client.mutate({
           mutation: query,
       })
       return result;
   }
)

export const createUser = createAsyncThunk(
   "user/createUser",
   async ({ username, password }: any) => {
       const query = gql`
       {
           CreateUser(username:"${username}", password: "${password}"){
            name
            bestScore
           }
         }
     `
       const result = await client.mutate({
           mutation: query,
       })
       return result;
   }
)

const userSlice:Slice = createSlice({
  name:  "userSlice",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
   builder.addCase(getUser.fulfilled, (state, action) => {
      if(typeof action.payload === "object") {
         console.log(action.payload);
         
         state = action.payload as any;
      }
   })
   builder.addCase(createUser.fulfilled, (state, action) => {
      if(typeof action.payload === "object") {
         state = action.payload as any;
      }
   })
}
});

export const { setStoreUser} = userSlice.actions;
export default userSlice.reducer;