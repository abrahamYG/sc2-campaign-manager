import { createStore,compose, applyMiddleware } from "redux";
import rootReducer from "./store";
import { middleware } from "./store/middleware";


declare global {
    interface Window {
		__REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

const enhancers = compose(
	applyMiddleware(...middleware),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(rootReducer,enhancers);
export default store;