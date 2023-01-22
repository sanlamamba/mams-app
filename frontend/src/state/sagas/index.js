import { call } from "redux-saga/effects";
// import authSaga from "./authSaga";
import followSaga from "./followSaga";
import authSaga from "./authSaga";

function* rootSaga() {
  yield call(authSaga);
  yield call(followSaga);
}

export default rootSaga;
