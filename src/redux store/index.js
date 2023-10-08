import { configureStore } from "@reduxjs/toolkit";
import snackbarslice from "./slice/snackbarslice";
import productReducer from "./slice/productSlice";
const store = configureStore({
  reducer: {
    snackbar: snackbarslice,
    product: productReducer,
  },
});

export default store;
