import Player from "../../models/Player";
import * as StoreService from "../../services/StoreService";
import * as ApiService from "../../services/ApiService";

export const ADD_PLAYER = "ADD_PLAYER";
export const SET_PLAYERS = "SET_PLAYERS";
export const DELETE_PLAYER = "DELETE_PLAYER";
export const SET_COUPLE_NAMES = "SET_COUPLE_NAMES";
export const SET_COUPLE_DARES = "SET_COUPLE_DARES";
export const SET_COUPLE_QUESTIONS = "SET_COUPLE_QUESTIONS";
export const UPDATE_PLAYER = "UPDATE_PLAYER";
export const SET_NORMAL_GAME_QD = "SET_NORMAL_GAME_QD";

export const addPlayer = (playerName) => {
  return (dispatch, getState) => {
    const newPlayer = new Player(Date.now(), playerName);
    StoreService.saveNames([...getState().game.players, newPlayer]);
    dispatch({
      type: ADD_PLAYER,
      newPlayer: newPlayer,
    });
  };
};

export const setPlayers = (players) => {
  const start = Date.now();
  const newPlayers = players.map((name, i) => new Player(start + i, name));
  StoreService.saveNames(newPlayers);
  return {
    type: SET_PLAYERS,
    newPlayers: newPlayers,
  };
};

export const loadPlayers = (players) => {
  return {
    type: SET_PLAYERS,
    newPlayers: players,
  };
};

export const updatePlayer = (playerId, name) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PLAYER,
      playerId,
      name,
    });
  };
};

export const deletePlayer = (playerId) => {
  return (dispatch, getState) => {
    StoreService.saveNames(
      getState().game.players.filter((x) => x.id !== playerId)
    );
    dispatch({
      type: DELETE_PLAYER,
      playerId: playerId,
    });
  };
};

export const setCoupleNames = (male, female) => {
  StoreService.saveCouple([female, male]);
  return {
    type: SET_COUPLE_NAMES,
    couple: [female, male],
  };
};

export const loadCoupleNames = (male, female) => {
  return {
    type: SET_COUPLE_NAMES,
    couple: [female, male],
  };
};

export const loadNormalGameQD = (type) => {
  return async (dispatch, getState) => {
    try {
      const questions = {
        eng: await ApiService.getQuestions("ENG", type),
        rus: await ApiService.getQuestions("RUS", type),
        spa: await ApiService.getQuestions("SPA", type),
      };
      const dares = {
        eng: await ApiService.getDares("ENG", type),
        rus: await ApiService.getDares("RUS", type),
        spa: await ApiService.getDares("SPA", type),
      };
      dispatch({
        type: SET_NORMAL_GAME_QD,
        questions,
        dares,
      });
    } catch (error) {
      throw new Error("Connection failed");
    }
  };
};
