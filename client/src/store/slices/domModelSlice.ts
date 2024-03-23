import { createSlice, Slice } from "@reduxjs/toolkit";

export type OpenElement = {
   id: string
   count: number
}

interface DOMModelInitialState {
    openElements: OpenElement[],
    showElement: null|Element
}

const initialState: DOMModelInitialState = {
    openElements: [],
    showElement: null
}

const domModelSlice: Slice = createSlice({
    name: "extractDataSlice",
    initialState,
    reducers: {
        changeOpenElements: (state, {payload}) => {
           state.openElements = [...payload]
        },
        changeShowElement: (state, {payload}) => {
            state.showElement = {...payload}
        },
    },
});

export const { changeOpenElements, changeShowElement} = domModelSlice.actions;
export default domModelSlice.reducer;