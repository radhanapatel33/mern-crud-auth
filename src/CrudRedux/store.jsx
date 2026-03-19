import { configureStore } from "@reduxjs/toolkit";
import CurdSlice from "./Slices/CrudSlice.jsx";
import UserSlice from "./Slices/Userslice.jsx";

const Store = configureStore({
    reducer: {
        allCrud: CurdSlice,
        userAuth: UserSlice
    }
});
export default Store;
