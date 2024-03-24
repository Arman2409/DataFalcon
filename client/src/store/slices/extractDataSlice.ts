import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import type { ElementModel } from "../../types/globals";

interface extractInitialState {
   speed: number
   failMessage: string
   url: string
   domElements: ElementModel[]
   links: ElementModel[]
   titles: ElementModel[]
   images: ElementModel[]
   status: "loading" | "failed" | "loaded" | "initial"
}

const initialState: extractInitialState = {
   speed: 0,
   failMessage: "",
   url: "",
   status: "initial",
   titles: [],
   links: [],
   images: [],
   domElements: []
}

export const extract = createAsyncThunk(
   "extractData/createUser",
   async ({ url, clearCache, isDemo }: {
      clearCache?: boolean, isDemo?: boolean, url?: string,
   }) => {
      const params = isDemo ? {
         isDemo: true
      } : {
         clearCache,
         url
      }
      const result = await axios.get("http://localhost:4000/extract",
         { params }).catch(({ message }) => {
            console.error(message);
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
               message = ""
            } = { ...payload };
            if (message) {
               state.status = "failed";
               state.failMessage = message;
               return;
            }
            const {
               speed = 0,
               url = "",
               titles = {},
               domElements = [],
               links = [],
               images = [] } = { ...payload };
            state.domElements = [...domElements];
            state.titles = { ...titles };
            state.links = [...links];
            state.images = [...images];
            state.speed = speed;
            state.status = "loaded";
            state.url = url;
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