import Player from "../../models/Player";
import * as StoreService from "../../services/StoreService";
import * as ApiService from "../../services/ApiService";

export const SET_COUPLE_NAMES = "SET_COUPLE_NAMES";
export const UPDATE_PLAYER = "UPDATE_PLAYER";
export const SET_NORMAL_GAME_QD = "SET_NORMAL_GAME_QD";
export const SET_SOFT_GAME_QD = "SET_SOFT_GAME_QD";
export const SET_HOT_GAME_QD = "SET_HOT_GAME_QD";

export const setCoupleNames = (male, female) => {
  StoreService.saveCouple([female, male]);
  return {
    type: SET_COUPLE_NAMES,
    couple: [female, male],
  };
};

export const setMultiCoupleNames = (names) => {
  StoreService.saveCouple([names[0], names[1]]);
  return {
    type: SET_COUPLE_NAMES,
    couple: names,
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

export const loadSoftGameQD = () => {
  return async (dispatch, getState) => {
    try {
      const coupleSoft = await ApiService.getCoupleSoft();
      dispatch({
        type: SET_SOFT_GAME_QD,
        value: coupleSoft,
      });
    } catch (error) {
      throw new Error("Connection failed");
    }
  };
};

export const loadHotGameQD = () => {
  return async (dispatch, getState) => {
    try {
      const coupleHot = {
        questions: {
          eng: {
            M: await ApiService.getHotQuestions("ENG", "M"),
            F: await ApiService.getHotQuestions("ENG", "F"),
          },
          rus: {
            M: await ApiService.getHotQuestions("RUS", "M"),
            F: await ApiService.getHotQuestions("RUS", "F"),
          },
          spa: {
            M: await ApiService.getHotQuestions("SPA", "M"),
            F: await ApiService.getHotQuestions("SPA", "F"),
          },
        },
        dares: {
          eng: {
            M: await ApiService.getHotDares("ENG", "M"),
            F: await ApiService.getHotDares("ENG", "F"),
          },
          rus: {
            M: await ApiService.getHotDares("RUS", "M"),
            F: await ApiService.getHotDares("RUS", "F"),
          },
          spa: {
            M: await ApiService.getHotDares("SPA", "M"),
            F: await ApiService.getHotDares("SPA", "F"),
          },
        },
      };
      dispatch({
        type: SET_HOT,
        value: coupleHot,
      });
    } catch (error) {
      throw new Error("Connection failed");
    }
  };
};
