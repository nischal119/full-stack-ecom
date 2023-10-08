import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    severity: "",
    message: "",
  },
  reducers: {
    openSuccessSnackBar: (state, action) => {
      (state.open = true),
        (state.severity = "success"),
        (state.message = action.payload);
    },
    openErrorSnackBar: (state, action) => {
      (state.open = true),
        (state.severity = "error"),
        (state.message = action.payload);
    },
    closeSnackBar: (state, action) => {
      state.open = false;
    },
  },
});
export const { openErrorSnackBar, openSuccessSnackBar, closeSnackBar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
