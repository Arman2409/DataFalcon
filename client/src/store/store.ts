import { configureStore, Store} from "@reduxjs/toolkit";
import extractedDataSlice from "./slices/extractedDataSlice";

// import type {Reducers} from "../types/storeTypes";

const reducers
// :Reducers 
= {
    extractedData: extractedDataSlice 
}

const store:Store = configureStore({
    reducer:reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}),
})

export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>; 
export default store;