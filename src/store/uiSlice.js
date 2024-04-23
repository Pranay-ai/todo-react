import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentList: null,
    isMobile: false,
    isMenuOpen: false
};


const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        handleChange: (state, action) => {
            state.currentList = action.payload;
        },
        handleCloseMenu: (state) => {
            state.isMenuOpen = false;
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        setIsMenuOpen: (state, action) => {
            state.isMenuOpen = action.payload;
        }
    }
});


export const uiActions = uiSlice.actions;
export default uiSlice.reducer;