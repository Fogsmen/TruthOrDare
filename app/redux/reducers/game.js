import {
  ADD_PLAYER,
  SET_PLAYERS,
  DELETE_PLAYER,
  SET_COUPLE_NAMES,
  UPDATE_PLAYER,
  SET_NORMAL_GAME_QD,
} from "../actions/game";

const initialState = {
  players: [],
  questions: [],
  dares: [],
  couple: [],
  coupleDares: [[], []],
  coupleQuestions: [[], []],
};

export default gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.newPlayer],
      };

    case SET_PLAYERS:
      return {
        ...state,
        players: action.newPlayers,
      };

    case UPDATE_PLAYER:
      let players = [...state.players];
      const i = players.findIndex((x) => x.id === action.playerId);
      if (i > -1) {
        players[i].name = action.name;
      }
      return {
        ...state,
        players,
      };

    case DELETE_PLAYER:
      return {
        ...state,
        players: state.players.filter((x) => x.id !== action.playerId),
      };

    case SET_COUPLE_NAMES:
      return {
        ...state,
        couple: action.couple,
      };

    case SET_NORMAL_GAME_QD:
      return {
        ...state,
        questions: action.questions,
        dares: action.dares,
      };

    default:
      return state;
  }
};
