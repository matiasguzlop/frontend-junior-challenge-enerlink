import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos";

export default configureStore({
    reducer: {
        todos: todosSlice
    }
});