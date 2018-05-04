import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import appReducer from '@/reducers';


let middleware = [thunkMiddleware]
if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger]
}

const composeEnhancers = compose;


export function configureStore(preloadedState) {
    const store = createStore(
        appReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(...middleware))
    );
    configureStore.primaryStore = store;
    return store;
}

let store = null;

if (!store) {
    const token = localStorage.getItem('jwt_token');
    store = configureStore(token ? {user: {_meta: {token}, data: {}}} : {});
}

export default store;