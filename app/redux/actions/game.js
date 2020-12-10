import Player from "../../models/Player";

export const ADD_PLAYER = 'ADD_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';

export const addPlayer = playerName => {
	const newPlayer = new Player(Date.now(), playerName);
	return{
		type: ADD_PLAYER,
		newPlayer: newPlayer
	};
};

export const deletePlayer = playerId => {
	return {
		type: DELETE_PLAYER,
		playerId: playerId
	};
};
