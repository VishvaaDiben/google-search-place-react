import { applyMiddleware, legacy_createStore as createStore } from 'redux';

import placesReducer from './reducer';
import { thunk } from 'redux-thunk';

const store = createStore(placesReducer, applyMiddleware(thunk));

export default store;



