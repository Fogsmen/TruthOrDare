import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import gameReducer from './reducers/game';

const rootReducer = combineReducers({
    game: gameReducer
});

export default store = createStore(rootReducer, applyMiddleware(ReduxThunk));
