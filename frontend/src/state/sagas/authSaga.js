import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  connectUser,
  disconnectUser,
  setJustLoggedOut,
  setPlaying,
  setCurrentSong,
  setFollow,
} from "../redux/features/auth/authSlice";
import api from "../../apiConfig/requests";
import client from "../../apiConfig/api";

function* fetchUser(action) {
  // try {
  // console.log(action.payload);
  const data = {
    email: action.payload.email,
    password: action.payload.password,
  };
  const apiCall = yield call(api.postData, {
    endpoint: "/auth/login",
    req: data,
  });
  // console.log(apiCall);
  if (apiCall.ok) {
    const data = apiCall.data.data;
    const token = apiCall.data.token;
    const user = {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      token,
    };
    yield put(connectUser(user));
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("user", JSON.stringify(user));
  }
}
function* loadData(action) {
  const data = {
    nom: action.payload.nom,
    prenom: action.payload.prenom,
    email: action.payload.email,
    token: action.payload.token,
  };
  yield put(connectUser(data));
  window.localStorage.setItem("token", data.token);
  window.localStorage.setItem("user", JSON.stringify(data));
}
function* startPlaying(action) {
  yield put(setPlaying(true));
}
function* stopPlaying(action) {
  yield put(setPlaying(false));
}

function* setSong(action) {
  console.log(action.payload);
  yield put(setCurrentSong(action.payload));
}

function* incrementReadCount(action) {
  console.log(action.payload);
  try {
    const apiCall = yield client.put(`/music/${action.payload}/incrementRead`, {
      id: action.payload,
    });
  } catch (err) {
    console.log(err);
  }
  yield console.log(action);
}

function* startFollowProcess() {
  console.log("grantPermission");
  try {
    yield put(
      setFollow({
        state: true,
        justFollowed: true,
      })
    );
    window.localStorage.setItem("followed", "true");
  } catch (error) {
    console.log(error);
  }
}
function* changeJustFollowed() {
  yield put(
    setFollow({
      state: true,
      justFollowed: false,
    })
  );
}

export default function* authSaga() {
  yield takeLatest("LOGIN_REQUEST", fetchUser);
  yield takeLatest("LOAD_LOGIN_DATA", loadData);
  yield takeLatest("START_PLAYING", startPlaying);
  yield takeLatest("STOP_PLAYING", stopPlaying);
  yield takeLatest("SET_CURRENT_SONG", setSong);

  yield takeLatest("INCREMENT_READ_COUNT", incrementReadCount);

  yield takeLatest("SET_FOLLOW", startFollowProcess);
  yield takeLatest("SET_JUST_FOLLOWED", changeJustFollowed);
}
