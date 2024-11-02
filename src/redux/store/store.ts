import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/auth_slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
