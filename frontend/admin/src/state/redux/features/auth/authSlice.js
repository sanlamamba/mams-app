import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  nom: "",
  prenom: "",
  email: "",
  token: "",
  loginError: false,
  playing: false,
  projet: {
    link: "",
    title: "",
    index: 0,
  },
  follow: {
    state: false,
    justFollowed: false,
  },
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
      state.playing = false;
    },
    disconnectUser: (state, action) => {
      state.nom = null;
      state.prenom = null;
      state.email = null;
      state.token = null;
      state.justLoggedOut = true;
      state.playing = false;
    },
    setJustLoggedOut: (state, action) => {
      state.justLoggedOut = false;
      state.playing = false;
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.projet.link = action.payload.link;
      state.projet.title = action.payload.title;
      state.projet.index = action.payload.index;
    },
    setFollow: (state, action) => {
      state.follow.state = action.payload.state;
      state.follow.justFollowed = action.payload.justFollowed;
    },
  },
});

export const {
  connectUser,
  disconnectUser,
  setJustLoggedOut,
  setPlaying,
  setCurrentSong,
  setFollow,
} = authSlice.actions;

export default authSlice.reducer;
