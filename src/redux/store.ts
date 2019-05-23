import { createStore,compose } from "redux";
import rootReducer from "./reducers";


declare global {
    interface Window {
		__REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

const enhancers = compose(
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
const store = createStore(rootReducer,enhancers);
export type AppState = ReturnType<typeof rootReducer>
export default store;