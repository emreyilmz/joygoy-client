import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AuthReducers from "./reducers";

const RootReducers = combineReducers({
    AuthReducers,
});

const store = createStore(RootReducers, applyMiddleware(thunk));
export default store;
