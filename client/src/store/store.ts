import { configureStore, Store} from "@reduxjs/toolkit";
import extractDataSlice from "./slices/extractDataSlice";
import domModelSlice from "./slices/domModelSlice";
import demoSlice from "./slices/demoSlice";

// import type {Reducers} from "../types/storeTypes";

const reducers
// :Reducers 
= {
    extractData: extractDataSlice,
    domModel: domModelSlice,
    demo: demoSlice
}

const store:Store = configureStore({
    reducer:reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}),
})

export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>; 
export default store;