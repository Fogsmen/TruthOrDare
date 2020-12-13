import { eng } from '../../helpers/LanguageHelper';
import { SET_LANG } from "../actions/settings";

const initialState = {
	lang: 'eng',
	getLang: eng
};

export default settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LANG:
			return {
				...state,
				lang: action.lang,
				getLang: action.getLang
			};
	
		default:
			return state;
	}
};