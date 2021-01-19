import {
  ADD_PLAYER,
  SET_PLAYERS,
  DELETE_PLAYER,
  SET_COUPLE_NAMES,
  UPDATE_PLAYER,
  SET_NORMAL_GAME_QD,
  SET_SOFT_GAME_QD,
  SET_HOT_GAME_QD,
} from "../actions/game";

const initialState = {
  players: [],
  questions: [],
  dares: [],
  couple: [],
  coupleSoft: {
    questions: {
      eng: { M: [], F: [] },
      rus: { M: [], F: [] },
      spa: { M: [], F: [] },
    },
    dares: {
      eng: { M: [], F: [] },
      rus: { M: [], F: [] },
      spa: { M: [], F: [] },
    },
  },
  coupleHot: {
    questions: {
      eng: { M: [], F: [] },
      rus: { M: [], F: [] },
      spa: { M: [], F: [] },
    },
    dares: {
      eng: { M: [], F: [] },
      rus: { M: [], F: [] },
      spa: { M: [], F: [] },
    },
  },
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

    case SET_SOFT_GAME_QD:
      return {
        ...state,
        coupleSoft: action.value,
      };

    case SET_HOT_GAME_QD:
      return {
        ...state,
        coupleHot: action.value,
      };

    default:
      return state;
  }
};
