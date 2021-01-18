import * as ApiService from "../../services/ApiService";
import * as StoreService from "../../services/StoreService";

export const SET_USER = "SET_USER";
export const LOAD_EMAIL_PASSWORD = "LOAD_EMAIL_PASSWORD";

export const loadEmailPassword = (email, password) => {
  return {
    type: LOAD_EMAIL_PASSWORD,
    email,
    password,
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    let response = await ApiService.authLogin(email, password);
    let result = await response.json();
    if (!response.ok) {
      throw result;
    }
    const token = result.access_token;
    await StoreService.saveEmailPassword(email, password);
    response = await ApiService.authMe(token);
    result = await response.json();
    dispatch({
      type: SET_USER,
      id: result.id,
      email: result.email,
      name: result.name,
      token,
      password,
    });
  };
};

export const register = (email, name, password) => {
  return async (dispatch, getState) => {
    let response = await ApiService.authRegister(email, name, password);
    let result = await response.json();
    if (!response.ok) {
      throw result;
    }
    const token = result.access_token;
    await StoreService.saveEmailPassword(email, password);
    response = await ApiService.authMe(token);
    result = await response.json();
    dispatch({
      type: SET_USER,
      id: result.id,
      email: result.email,
      name: result.name,
      token,
      password,
    });
  };
};
