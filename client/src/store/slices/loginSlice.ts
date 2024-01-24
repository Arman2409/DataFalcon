import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import { gql, useMutation } from "@apollo/client";
import { client } from "@/apollo/ApolloClientProvider";
// import type {  UserInitialState } from "../types/storeTypes";

// interface LoginInitialState {

// }

const initialState = {

}

export const getUserStatus = createAsyncThunk(
    "login/getUserStatus",
    async ({username, password}:any) => {
        console.log(username, password);
        
        const query = gql`
        mutation GetUser ($username: String!, $password:  String!){
          login(username: $username, password: $password) {
            user {
              bestScore
              name
            }
         }
        }
      `
        const result = await client.mutate({
            mutation: query,
            variables: {
                username,
                password
            }
        })
        console.log(result);
        
        return result;
    }
)


const userSlice: Slice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(getUserStatus.fulfilled, (state, action) => {
            console.log(state);
            
            state = action.payload;
        })
        builder.addCase(getUserStatus.rejected, (state, action) => {
            console.log(state);

            state = "rejected";
        })
    }
});

export const { setStoreUser } = userSlice.actions;
export default userSlice.reducer;