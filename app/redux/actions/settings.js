import * as LanguageHelper from '../../helpers/LanguageHelper';

export const SET_LANG = 'SET_LANG';

export const setLanguage = lang => {
	switch (lang) {
		case 'spa':
			return {
				type: SET_LANG,
				lang: 'spa',
				getLang: LanguageHelper.spa
			};

		case 'rus':
			return {
				type: SET_LANG,
				lang: 'rus',
				getLang: LanguageHelper.rus
			};

		default:
			return {
				type: SET_LANG,
				lang: 'eng',
				getLang: LanguageHelper.eng
			};
	}
};