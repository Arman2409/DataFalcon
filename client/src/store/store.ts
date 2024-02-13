import { configureStore, Store} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

// import type {Reducers} from "../types/storeTypes";
// import userReducer from "./userSlice";
// import messagesSlice from "./messagesSlice";
// import socketSlice from "./socketSlice";
// import windowSlice from "./windowSlice";


const reducers
// :Reducers 
= {
    user: userSlice   // messages: messagesSlice,
    // socket: socketSlice,
    // window: windowSlice,
}

const store:Store = configureStore({
    reducer:reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}),
})

export default store;
export type IRootState = ReturnType<typeof store.getState>; 