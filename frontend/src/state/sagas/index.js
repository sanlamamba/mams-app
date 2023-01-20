import { call } from "redux-saga/effects";
// import authSaga from "./authSaga";
import followSaga from "./followSaga";

function* rootSaga() {
  yield call(followSaga);
}

export default rootSaga;
