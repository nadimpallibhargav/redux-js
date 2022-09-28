const redux = require('redux');
const produce = require('immer').produce;

const initialState = {
    name: 'raju',
    address: {
        street: "2nd cross",
        door: "221B"
    }
}

const streetUpdate = 'streetUpdate';
const updateStreet = (street) => {
    return {
        type: streetUpdate,
        payload: street
    }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

  case streetUpdate:
    return produce(state, (draft) => {
        draft.address.street = action.payload;
    });

  default:
    return state
  }
}

const store = redux.createStore(reducer);

console.log('initial address: ', store.getState());

const unsubscribe = store.subscribe(() => {console.log('updated address: ', store.getState())});

store.dispatch(updateStreet('3rd cross'));

unsubscribe();