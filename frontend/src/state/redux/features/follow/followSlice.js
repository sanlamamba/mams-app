import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  followed: false,
};

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFollowed: (state, action) => {
      state.followed = true;
    },
    removeFollowed: (state, action) => {
      state.followed = false;
    },
  },
});

export const { setFollowed } = followSlice.actions;

export default followSlice.reducer;
