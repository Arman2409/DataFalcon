import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";
// import type {  UserInitialState } from "../types/storeTypes";

// const EXTRACT_QUERY = gql`
//     query Extract($url: String!, $open: JSON!) {
//         Extract(url: $url, open:$open) {
//             url
//         }
//     }
// `


interface extractedInitialState {
   domModel: any,
   speed: number
}

const initialState:extractedInitialState = {
   domModel: {},
   speed: 0
}

export const extract = createAsyncThunk(
   "extractedData/createUser",
   async (url: string) => {
       console.log(url);
       const result = await axios.get("http://localhost:4000/extract",
       {
           params: { url }
       });
       return {...result.data};
   }
)

const extractedDataSlice:Slice = createSlice({
  name:  "extractedDataSlice",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
   builder.addCase(extract.fulfilled, (state, action) => {
      if(typeof action.payload === "object") {
         const {model = {}, speed = 0} = {...action.payload}
         state.domModel = model;
         state.speed = speed;
      }
   })
   builder.addCase(extract.rejected, (state, action) => {
      console.log(action.payload);

   })
}
});

export default extractedDataSlice.reducer;