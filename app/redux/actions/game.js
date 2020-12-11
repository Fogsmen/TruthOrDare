import Player from "../../models/Player";

export const ADD_PLAYER = 'ADD_PLAYER';
export const SET_PLAYERS = 'SET_PLAYERS';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const SELECT_GAME_TYPE = 'SELECT_GAME_TYPE';

export const addPlayer = playerName => {
	const newPlayer = new Player(Date.now(), playerName);
	return {
		type: ADD_PLAYER,
		newPlayer: newPlayer
	};
};

export const setPlayers = players => {
	const start = Date.now();
	const newPlayers = players.map((name, i) => new Player(start + i, name));
	return {
		type: SET_PLAYERS,
		newPlayers: newPlayers
	};
};

export const deletePlayer = playerId => {
	return {
		type: DELETE_PLAYER,
		playerId: playerId
	};
};

export const selectGameType = gameType => {
	return {
		type: SELECT_GAME_TYPE,
		gameType: gameType
	}
};