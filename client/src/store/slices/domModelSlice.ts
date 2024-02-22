import { createSlice, Slice } from "@reduxjs/toolkit";

interface DOMModelInitialState {
    openElements: string[]
}

const initialState: DOMModelInitialState = {
    openElements: []
}

const domModelSlice: Slice = createSlice({
    name: "extractedDataSlice",
    initialState,
    reducers: {
        changeOpenElements: (state, {payload}) => {
           state.openElements = [...payload]
        }
    },
});

export const { changeOpenElements } = domModelSlice.actions;
export default domModelSlice.reducer;