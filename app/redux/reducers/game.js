import { SET_COUPLE_NAMES, SET_NORMAL_GAME_QD, SET_SOFT_GAME_QD, SET_HOT_GAME_QD } from "../actions/game";

const initialState = {
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
