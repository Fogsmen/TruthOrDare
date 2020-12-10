import { SET_USER_NAME } from "../actions/auth";

const initialState = {
	userName: ''
};

export default authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_NAME:
			return {
				...state,
				userName: action.userName
			};
	
		default:
			return state;
	}
};