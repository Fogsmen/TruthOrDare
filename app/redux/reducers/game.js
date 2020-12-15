import { ADD_PLAYER, SET_PLAYERS, DELETE_PLAYER, SELECT_GAME_TYPE, SET_COUPLE_NAMES } from "../actions/game";

const initialState = {
	players: [],
	selectedGameType: 'mf',
	couple: []
};

export default gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_PLAYER:
			return {
				...state,
				players: [...state.players, action.newPlayer]
			};

		case SET_PLAYERS:
			return {
				...state,
				players: action.newPlayers
			};

		case DELETE_PLAYER:
			return {
				...state,
				players: state.players.filter(x => x.id	!== action.playerId)
			};

		case SELECT_GAME_TYPE: 
			return {
				...state,
				selectedGameType: action.gameType
			};

		case SET_COUPLE_NAMES:
			return {
				...state,
				couple: action.couple
			};

		default:
			return state;
	}
};