import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import type { ElementModel } from "../../types/globals";

interface extractedInitialState {
   speed: number
   domModel: ElementModel
   links: ElementModel[]
   head: ElementModel[]
   images: ElementModel[]
   status: "loading" | "failed" | "loaded" | "initial"
   failMessage: string
}

const initialState: extractedInitialState = {
   domModel: { id: "", name: "", type: "" },
   speed: 0,
   head: [],
   links: [],
   images: [],
   status: "initial",
   failMessage: ""
}

export const extract = createAsyncThunk(
   "extractedData/createUser",
   async ({ url, clearCache }: { url: string, clearCache: boolean }) => {
      const result = await axios.get("http://localhost:4000/extract",
         { params: { url, clearCache } }).catch(({ message }) => {
            console.error(message)
         });
      return { ...result?.data || {} };
   }
)

const extractedDataSlice: Slice = createSlice({
   name: "extractedDataSlice",
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
            const { head = {},
               model = {},
               speed = 0,
               links = [],
               images = [] } = { ...payload };
            state.domModel = { ...model };
            state.head = { ...head };
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
export const { changeLoadingState } = extractedDataSlice.actions;
export default extractedDataSlice.reducer;