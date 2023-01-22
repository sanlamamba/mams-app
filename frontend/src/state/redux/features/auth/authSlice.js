import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  nom: "",
  prenom: "",
  email: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    connectUser: (state, action) => {
      state.nom = action.payload.nom;
      state.prenom = action.payload.prenom;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    disconnectUser: (state, action) => {
      state.nom = null;
      state.prenom = null;
      state.email = null;
      state.token = null;
      state.justLoggedOut = true;
    },
    setJustLoggedOut: (state, action) => {
      state.justLoggedOut = false;
    },
  },
});

export const { connectUser, disconnectUser, setJustLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
