import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";
import { ElementModel } from "../../../../types/global";

// const EXTRACT_QUERY = gql`
//     query Extract($url: String!, $open: JSON!) {
//         Extract(url: $url, open:$open) {
//             url
//         }
//     }
// `


interface extractedInitialState {
   domModel: ElementModel,
   speed: number,
   links: ElementModel[],
   head: ElementModel[],
   images: ElementModel[],
   loading: boolean,
}

const initialState: extractedInitialState = {
   domModel: {id: "", name: "", type: ""},
   speed: 0,
   head: [],
   links: [],
   images: [],
   loading: false
}

export const extract = createAsyncThunk(
   "extractedData/createUser",
   async ({url, clearCache}:{url: string,  clearCache: boolean}) => {
      const result = await axios.get("http://localhost:4000/extract",
         { params: { url, clearCache } }).catch(({message}) => {
            console.error(message)
         });
      return { ...result?.data || {} };
   }
)

const extractedDataSlice: Slice = createSlice({
   name: "extractedDataSlice",
   initialState,
   reducers: {
      changeLoadingState: (state, {payload}) => {
         state.loading = payload
     }
   },
   extraReducers: (builder) => {
      builder.addCase(extract.fulfilled, (state, { payload }) => {
         if (typeof payload === "object") {
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
            state.loading = false;
         }
      })
      builder.addCase(extract.rejected, (state, {payload}) => {
         console.error(payload);
      })
   }
});
export const { changeLoadingState } = extractedDataSlice.actions;
export default extractedDataSlice.reducer;