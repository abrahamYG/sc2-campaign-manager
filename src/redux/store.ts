import { createStore,compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { crashReporter, logger } from "./middleware";


declare global {
    interface Window {
		__REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

const enhancers = compose(
	applyMiddleware(crashReporter,logger),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(rootReducer,enhancers);
export type AppState = ReturnType<typeof rootReducer>
export default store;