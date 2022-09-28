const redux = require('redux');
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const middleWare = redux.applyMiddleware;

const CAKE_ORDERED = 'CAKE_ORDERED';
const ICE_ORDERED = 'ICE_ORDERED';
const CAKE_RESTOKED = 'CAKE_RESTOKED';

function orderCake() {
    return {
        type: CAKE_ORDERED,
        QUANTITY: 1,
    }
}

function reStockCake(quantity) {
    return {
        type: CAKE_RESTOKED,
        QUANTITY: quantity,
    }
}

function orderIce() {
    return {
        type: ICE_ORDERED,
        QUANTITY: 1,
    }
}

const cakeInitialState = {
    numOfCakes : 10,
}

const iceInitialState = {
    numOfIce : 5,
}

const cakeReducer = (state = cakeInitialState, action) => {
    switch(action.type) {

        case CAKE_ORDERED: 
        return { ...state, numOfCakes: state.numOfCakes - 1 }

        case CAKE_RESTOKED: 
        return { ...state, numOfCakes: state.numOfCakes + action.QUANTITY }

        default: return state;

    }
}

const iceReducer = (state = iceInitialState, action) => {
    switch(action.type) {

        case ICE_ORDERED: 
        return { ...state, numOfIce: state.numOfIce - 1 }

        default: return state;

    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    ice: iceReducer
});

const store = createStore(rootReducer, middleWare(logger));

const unsubscribe = store.subscribe(() => {});

store.dispatch(orderCake());
store.dispatch(reStockCake(2));
store.dispatch(orderIce());

unsubscribe();  
