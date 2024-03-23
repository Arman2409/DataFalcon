import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import type { ElementModel } from "../../types/globals";

interface extractInitialState {
   speed: number
   domElements: ElementModel[]
   links: ElementModel[]
   titles: ElementModel[]
   images: ElementModel[]
   status: "loading" | "failed" | "loaded" | "initial"
   failMessage: string
}

const initialState: extractInitialState = {
   domElements: [],
   speed: 0,
   titles: [],
   links: [],
   images: [],
   status: "initial",
   failMessage: ""
}

export const extract = createAsyncThunk(
   "extractData/createUser",
   async ({ url, clearCache }: {
      url: string, clearCache: boolean
   }) => {
      const result = await axios.get("http://localhost:4000/extract",
         { params: { url, clearCache } }).catch(({ message }) => {
            console.error(message)
         });
      return { ...result?.data || {} };
   }
)

const extractDataSlice: Slice = createSlice({
   name: "extractDataSlice",
   initialState,
   reducers: {
      changeLoadingState: (state, { payload }) => {
         state.status = payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(extract.fulfilled, (state, { payload }) => {
         if (typeof payload === "object") {
            const {
               message = "",
               code = 400
            } = { ...payload };
            if (message) {
               state.status = "failed";
               state.failMessage = message;
               // code ... 
               return;
            }
            const { titles = {},
               domElements = [],
               speed = 0,
               links = [],
               images = [] } = { ...payload };
            state.domElements = [...domElements];
            state.titles = { ...titles };
            state.links = [...links];
            state.images = [...images];
            state.speed = speed;
            state.status = "loaded";
         }
      })
      builder.addCase(extract.rejected, (state, { payload }: any) => {
         state.status = "failed";
         state.failMessage = "failed"
      })
   }
});
export const { changeLoadingState } = extractDataSlice.actions;
export default extractDataSlice.reducer;