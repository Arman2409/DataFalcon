import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { client } from "@/apollo/ApolloClientProvider";
// import type {  UserInitialState } from "../types/storeTypes";

// interface LoginInitialState {

// }

const initialState = {

}

export const getUser = createAsyncThunk(
    "login/getUserStatus",
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


const userSlice: Slice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state = action.payload;
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state = "rejected";
        })
    }
});

export const { setStoreUser } = userSlice.actions;
export default userSlice.reducer;