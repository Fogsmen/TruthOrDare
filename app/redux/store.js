import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import gameReducer from './reducers/game';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    game: gameReducer,
    auth: authReducer
});

export default store = createStore(rootReducer, applyMiddleware(ReduxThunk));
