import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import type { ExtractInitialState, ExtractParams } from "../../types/store/slices/extractData";

const initialState: ExtractInitialState = {
   speed: 0,
   failMessage: "",
   url: "",
   status: "initial",
   titles: {},
   links: [],
   images: [],
   domElements: []
}

export const extract = createAsyncThunk(
   "extractData/createUser",
   async ({ url, clearCache, isDemo }: ExtractParams, { rejectWithValue}) => {
      const params: ExtractParams = isDemo ? {
         isDemo: true
      } : {
         clearCache,
         url
      }
      const result = await axios.get("http://localhost:4000/extract",
         { params }).catch(({ message }) => {
            console.error(message);
         });
      setTimeout(() => {
        if(!result?.data) {
          rejectWithValue({
            message: "Extraction timed out",
          })
        }
      }, 5000)
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
               speed,
               url,
               titles,
               domElements,
               links,
               images }: ExtractInitialState = { ...payload };
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
         state.failMessage = payload?.message;
      })
   }
});
export const { changeLoadingState } = extractDataSlice.actions;
export default extractDataSlice.reducer;