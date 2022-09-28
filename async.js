const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const createStore = redux.createStore;
const axios = require('axios');
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const fetchRequest = () => {
    return {
        type: 'fetchRequest'        
    }
}

const fetchSuccess = (users) => {
    return {
        type: 'fetchSuccess',
        payload: users
    }
}

const fetchFailed = (error) => {
    return {
        type: 'fetchFailed',
        payload: error
    }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'fetchRequest':
        return { ...state, loading: true }

    case 'fetchSuccess':
        return { ...state, loading: false, users: action.payload, error: '' }

    case 'fetchFailed':
        return { ...state, loading: false, users: [], error: action.payload }

    default:
        return state

  }
}

const fetchData = () => {
    return function(dispatch) {
        dispatch(fetchRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            const users = response.data.map((user) => user.name);
            dispatch(fetchSuccess(users));
        })
        .catch((error) => {
            dispatch(fetchFailed(error.message));
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {console.log(store.getState())})

store.dispatch(fetchData())