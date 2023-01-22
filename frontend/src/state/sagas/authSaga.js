import { call, put, takeLatest, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  connectUser,
  disconnectUser,
  setJustLoggedOut,
} from "../redux/features/auth/authSlice";
import api from "../../apiConfig/requests";
import client from "../../apiConfig/api";
function* logoutUser() {
  console.log("logout");
  try {
    const apiCall = yield call(api.getData, "/auth/logout");
    console.log(apiCall);
    if (apiCall.ok) {
      yield put(disconnectUser());
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      toast.success("Logged out successfully");
    } else {
      toast.error(apiCall.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}
function* fetchUser(action) {
  // try {
  const apiCall = yield call(client.post("/auth/login", action.payload));
  console.log(apiCall);

  if (!apiCall.ok) {
    const { data } = apiCall;
    toast.error(data.message);
  } else {
    const { data } = apiCall;
    yield put(connectUser(data.data));
    yield call(setTimeout, 500);
    toast(`Welcome ${data.data.nom}`);
    window.localStorage.setItem("user", JSON.stringify(data.data));
    window.localStorage.setItem("token", data.token);
    yield call(setTimeout, 500);
    toast.info("Redirecting...");
  }
  // } catch (error) {
  //   toast.error(error.response.data.message);
  // }
}
function* registerUser(action) {
  try {
    const apiCall = yield call(api.postData, {
      endpoint: "/auth/register",
      req: action.payload,
    });
    const { data } = apiCall;
    console.log(apiCall.ok);
    if (apiCall.ok) {
      toast.success(data.message);
      toast.info("Trying to connect...");
      yield call(fetchUser, {
        payload: {
          email: action.payload.email,
          password: action.payload.password,
        },
      });
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
function* loadData(action) {
  yield put(
    connectUser({
      nom: action.payload.nom,
      prenom: action.payload.prenom,
      email: action.payload.email,
      token: action.payload.token,
    })
  );
}
function* setJustLoggedOutFalse() {
  yield put(setJustLoggedOut());
}

export default function* authSaga() {
  yield takeLatest("LOGIN_REQUEST", fetchUser);
  yield takeLatest("LOAD_LOGIN", loadData);
  yield takeLatest("REGISTER_REQUEST", registerUser);
  yield takeLatest("LOGOUT_REQUEST", logoutUser);
  yield takeLatest("JUST_LOGGED_OUT", setJustLoggedOutFalse);
}
