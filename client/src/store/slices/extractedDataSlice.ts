import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

// const EXTRACT_QUERY = gql`
//     query Extract($url: String!, $open: JSON!) {
//         Extract(url: $url, open:$open) {
//             url
//         }
//     }
// `


interface extractedInitialState {
   domModel: any,
   speed: number,
   links: any[],
   head: any[]
}

const initialState: extractedInitialState = {
   domModel: {},
   speed: 0,
   head: [],
   links: []
}

export const extract = createAsyncThunk(
   "extractedData/createUser",
   async (url: string) => {
      const result = await axios.get("http://localhost:4000/extract",
         { params: { url } });
      return { ...result.data };
   }
)

const extractedDataSlice: Slice = createSlice({
   name: "extractedDataSlice",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(extract.fulfilled, (state, { payload }) => {
         if (typeof payload === "object") {
            const { head = {}, model = {}, links = [] } = { ...payload };
            state.domModel = {...model};
            state.head = {...head};
            state.links = [...links];
         }
      })
      builder.addCase(extract.rejected, (state, action) => {
         console.error(action.payload);

      })
   }
});

export default extractedDataSlice.reducer;