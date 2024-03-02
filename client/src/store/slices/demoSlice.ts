import { createSlice, Slice } from "@reduxjs/toolkit";

interface DemoInitialState {
    src: string
    alt: string
    type: "title" | "text" | "image"
    title: string
    description: string
    text: string
}

const initialState: DemoInitialState = {
    src: "",
    alt: "",
    type: "text",
    title: "",
    description: "",
    text: "",
}

const demoSlice: Slice = createSlice({
    name: "demoSlice",
    initialState,
    reducers: {
        changeContentDetails: (state, { payload }) => {
            const {
                src = "",
                alt = "",
                type = "",
                title = "",
                description = "",
                text = "" } = { ...payload };
            state.src = src;
            state.alt = alt;
            state.type = type;
            state.title = title;
            state.description = description;
            state.text = text;
        },
    },
});

export const { changeContentDetails } = demoSlice.actions;
export default demoSlice.reducer;