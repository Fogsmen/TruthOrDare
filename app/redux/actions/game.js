import Player from "../../models/Player";
import * as StoreService from '../../services/StoreService';

export const ADD_PLAYER = 'ADD_PLAYER';
export const SET_PLAYERS = 'SET_PLAYERS';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const SELECT_GAME_TYPE = 'SELECT_GAME_TYPE';
export const SET_COUPLE_NAMES = 'SET_COUPLE_NAMES';
export const SET_COUPLE_DARES = 'SET_COUPLE_DARES';
export const SET_COUPLE_QUESTIONS = 'SET_COUPLE_QUESTIONS';

export const addPlayer = playerName => {
	return (dispatch, getState) => {
		const newPlayer = new Player(Date.now(), playerName);
		StoreService.saveNames([...getState().game.players, newPlayer]);
		dispatch({
			type: ADD_PLAYER,
			newPlayer: newPlayer
		});
	};
};

export const setPlayers = players => {
	const start = Date.now();
	const newPlayers = players.map((name, i) => new Player(start + i, name));
	StoreService.saveNames(newPlayers);
	return {
		type: SET_PLAYERS,
		newPlayers: newPlayers
	};
};

export const loadPlayers = players => {
	return {
		type: SET_PLAYERS,
		newPlayers: players
	};
};

export const deletePlayer = playerId => {
	return (dispatch, getState) => {
		StoreService.saveNames(getState().game.players.filter(x => x.id !== playerId));
		dispatch({
			type: DELETE_PLAYER,
			playerId: playerId
		});
	};
};

export const selectGameType = gameType => {
	return {
		type: SELECT_GAME_TYPE,
		gameType: gameType
	}
};

export const setCoupleNames = (male, female) => {
	StoreService.saveCouple([female, male]);
	return {
		type: SET_COUPLE_NAMES,
		couple: [female, male]
	};
};

export const loadCoupleNames = (male, female) => {
	return {
		type: SET_COUPLE_NAMES,
		couple: [female, male]
	};
};