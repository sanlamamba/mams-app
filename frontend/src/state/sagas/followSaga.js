import { useSelector, useDispatch } from "react-redux";
import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { setFollowed } from "../redux/features/follow/followSlice";
function* grantPermission() {
  console.log("grantPermission");
  try {
    yield put(setFollowed());
    window.localStorage.setItem("followed", "true");
  } catch (error) {
    console.log(error);
  }
}
function* revokePermission() {
  console.log("revokePermission");
  try {
    yield put(setFollowed(false));
    window.localStorage.removeItem("followed");
    window.location.reload();
  } catch (e) {
    console.log(e);
  }
}
function* isPermitted() {
  console.log("isPermitted ?");
  try {
    const permissions = yield select((state) => state.follow.permissions);
    console.log(permissions);
  } catch (e) {
    console.log(e);
  }
}

export default function* followSaga() {
  yield takeLatest("GRANT_PERMISSION_REQUEST", grantPermission);
  yield takeLatest("REVOKE_PERMISSION_REQUEST", revokePermission);
  yield takeLatest("CHECK_PERMISSION_REQUEST", isPermitted);
}
