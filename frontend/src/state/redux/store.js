import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./features/auth/authSlice";
import followReducer from "./features/follow/followSlice";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
  }),
  sagaMiddleware,
];
const store = configureStore({
  reducer: {
    auth: authReducer,
    follow: followReducer,
  },
  middleware,
});
sagaMiddleware.run(rootSaga);

export default store;
