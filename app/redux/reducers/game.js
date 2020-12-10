import { ADD_PLAYER, DELETE_PLAYER } from "../actions/game";

const initialState = {
	players: []
};

export default gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_PLAYER:
			return {
				...state,
				players: [...state.players, action.newPlayer]
			};

		case DELETE_PLAYER:
			return {
				...state,
				players: state.players.filter(x => x.id	!== action.playerId)
			};

		default:
			return state;
	}
};