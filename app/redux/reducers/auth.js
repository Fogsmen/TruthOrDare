import { LOAD_EMAIL_PASSWORD, SET_USER } from "../actions/auth";

const initialState = {
  token: null,
  id: null,
  name: null,
  email: null,
  password: null,
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        token: action.token,
        id: action.id,
        name: action.name,
        email: action.email,
        password: action.password,
      };

    case LOAD_EMAIL_PASSWORD:
      return {
        ...state,
        email: action.email,
        password: action.password,
      };

    default:
      return state;
  }
};
