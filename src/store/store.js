import AuthReducer from "./reducers/AuthReducer";
import TrainingReducer from "./reducers/TrainingReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const reducers = combineReducers({
  AuthReducer,
  TrainingReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
