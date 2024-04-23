import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import uiReducer from "./uiSlice";

const todoStore = configureStore({
    reducer: {
        task: taskReducer,
        ui: uiReducer
    }
});


export default todoStore;