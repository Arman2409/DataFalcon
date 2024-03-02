import { configureStore, Store} from "@reduxjs/toolkit";
import extractedDataSlice from "./slices/extractedDataSlice";
import domModelSlice from "./slices/domModelSlice";
import demoSlice from "./slices/demoSlice";

// import type {Reducers} from "../types/storeTypes";

const reducers
// :Reducers 
= {
    extractedData: extractedDataSlice,
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