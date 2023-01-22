import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  connectUser,
  disconnectUser,
  setJustLoggedOut,
} from "../redux/features/auth/authSlice";
import api from "../../apiConfig/requests";

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

export default function* authSaga() {
  yield takeLatest("LOGIN_REQUEST", fetchUser);
  yield takeLatest("LOAD_LOGIN_DATA", loadData);
}
