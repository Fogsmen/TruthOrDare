import * as LanguageHelper from '../../helpers/LanguageHelper';

export const SET_LANG = 'SET_LANG';

export const setLanguage = lang => {
	switch (lang) {
		case 'sp':
			return {
				type: SET_LANG,
				lang: 'sp',
				getLang: LanguageHelper.sp
			};

		case 'ru':
			return {
				type: SET_LANG,
				lang: 'ru',
				getLang: LanguageHelper.ru
			};

		default:
			return {
				type: SET_LANG,
				lang: 'en',
				getLang: LanguageHelper.en
			};
	}
};