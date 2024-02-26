import { createSlice, Slice } from "@reduxjs/toolkit";

interface DemoInitialState {
    src: string
    alt:string
}

const initialState: DemoInitialState = {
    src: "",
    alt: "",
}

const demoSlice: Slice = createSlice({
    name: "demoSlice",
    initialState,
    reducers: {
        changeContentDetails: (state, { payload }) => {
            const { src = "", alt = "" } = { ...payload };
            state.src = src;
            state.alt = alt;
        },
    },
});

export const { changeContentDetails } = demoSlice.actions;
export default demoSlice.reducer;