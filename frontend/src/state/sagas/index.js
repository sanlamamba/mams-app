import { call } from "redux-saga/effects";
// import authSaga from "./authSaga";
import followSaga from "./followSaga";
import authSaga from "./authSaga";

function* rootSaga() {
  // call auth and follow saga
  yield call(authSaga);
}

export default rootSaga;
