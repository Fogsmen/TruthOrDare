import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import gameReducer from './reducers/game';
import authReducer from './reducers/auth';
import settingsReducer from './reducers/settings';

const rootReducer = combineReducers({
	game: gameReducer,
	auth: authReducer,
	settings: settingsReducer
});

export default store = createStore(rootReducer, applyMiddleware(ReduxThunk));
