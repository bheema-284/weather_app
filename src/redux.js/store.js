import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { debouncing } from "./debouncing/reducer";
import { weather_reducer } from "./weather_onecall/reducer";

const composeEnhancers=
   typeof window === 'object' &&
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose;

   const middleware = [thunk];
const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
);

const rootReducer = combineReducers({
    weather : weather_reducer,
    debouncing : debouncing
});

export const store = createStore(rootReducer, enhancer);