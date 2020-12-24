import { LOAD_EMAIL_PASSWORD, SET_USER } from "../actions/auth";

const initialState = {
	name: null,
	email: null,
	password: null
};

export default authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				name: action.name,
				email: action.email,
				password: action.password
			};
	
		case LOAD_EMAIL_PASSWORD:
			return {
				...state,
				email: action.email,
				password: action.password
			};

		default:
			return state;
	}
};